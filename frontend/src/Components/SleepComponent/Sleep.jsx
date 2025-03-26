import { useState, useEffect, useRef } from "react";
import { toast } from 'react-toastify';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const getUserId = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    return payload.userId || payload._id;
  } catch (e) {
    console.error("Error decoding token:", e);
    return null;
  }
};

const Sleep = () => {
  const userId = getUserId();
  const [bedTime, setBedTime] = useState(localStorage.getItem(`bedTime_${userId}`) || "");
  const [alarmTime, setAlarmTime] = useState(localStorage.getItem(`alarmTime_${userId}`) || "");
  const [alarmTriggered, setAlarmTriggered] = useState(false);
  const [showAlarmModal, setShowAlarmModal] = useState(false);
  const [lastAlarmCheck, setLastAlarmCheck] = useState(null);
  const [vibrateOnAlarm, setVibrateOnAlarm] = useState(false);
  const [hoursOfSleep, setHoursOfSleep] = useState();
  const [isAlarmSet, setIsAlarmSet] = useState(localStorage.getItem(`isAlarmSet_${userId}`) === "true");
  const [sleepData, setSleepData] = useState([]);
  const navigate = useNavigate();

  const audioRef = useRef();
  const alarmTimeoutRef = useRef();
  const alarmIntervalRef = useRef();

  useEffect(() => {
    const userId = getUserId();
    if (!userId) {
      navigate("/login");
      return;
    }
    fetchSleepData();

    const savedSleepData = localStorage.getItem(`sleepData_${userId}`);
    if (savedSleepData) {
      setSleepData(JSON.parse(savedSleepData));
    }
  }, []);

  useEffect(() => {
    if (bedTime && alarmTime) {
      const [bedHours, bedMinutes] = bedTime.split(":").map(Number);
      const [alarmHours, alarmMinutes] = alarmTime.split(":").map(Number);

      let hours = alarmHours - bedHours;
      let minutes = alarmMinutes - bedMinutes;

      if (hours < 0) {
        hours += 24;
      }

      if (minutes < 0) {
        hours -= 1;
        minutes += 60;
      }

      const totalHours = hours + minutes / 60;
      setHoursOfSleep(`${Math.floor(totalHours)} hours ${minutes} min`);
    } else {
      setHoursOfSleep("Set times to calculate");
    }
  }, [bedTime, alarmTime]);

  useEffect(() => {
    if (isAlarmSet) {
      alarmIntervalRef.current = setInterval(checkAlarm, 1000);
    }
    return () => clearInterval(alarmIntervalRef.current);
  }, [isAlarmSet, alarmTime]);

  useEffect(() => {
    if (isAlarmSet && alarmTime && userId) {
      localStorage.setItem(`alarmState_${userId}`, JSON.stringify({
        alarmTime,
        bedTime,
        isSet: true
      }));
    }
  }, [isAlarmSet, alarmTime, bedTime, userId]);

  const checkAlarm = () => {
    if (!alarmTime || !isAlarmSet) return;

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const [alarmHour, alarmMinute] = alarmTime.split(":").map(Number);

    const currentTimeIdentifier = `${now.getDate()}-${currentHour}-${currentMinute}`;

    if (currentHour === alarmHour && currentMinute === alarmMinute &&
      currentTimeIdentifier !== lastAlarmCheck) {
      triggerAlarm();
      setLastAlarmCheck(currentTimeIdentifier);
      setAlarmTriggered(true);
      setVibrateOnAlarm(true);
    }
  };

  const triggerAlarm = () => {
    setAlarmTriggered(true);
    setShowAlarmModal(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
    if (navigator.vibrate) {
      navigator.vibrate([1000, 500, 1000, 500]);
    }
    alarmTimeoutRef.current = setTimeout(stopAlarm, 5 * 60 * 1000);
  };

  const stopAlarm = () => {
    setBedTime("");
    setAlarmTime("");
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (navigator.vibrate) {
      navigator.vibrate(0);
    }

    if (alarmTimeoutRef.current) {
      clearTimeout(alarmTimeoutRef.current);
      alarmTimeoutRef.current = null;
    }
    if (alarmIntervalRef.current) {
      clearInterval(alarmIntervalRef.current);
      alarmIntervalRef.current = null;
    }

    setAlarmTriggered(false);
    setShowAlarmModal(false);
    setVibrateOnAlarm(false);
    setIsAlarmSet(false);

    if (userId) {
      localStorage.removeItem(`alarmState_${userId}`);
      localStorage.removeItem(`bedTime_${userId}`);
      localStorage.removeItem(`alarmTime_${userId}`);
      localStorage.removeItem(`isAlarmSet_${userId}`);
    }
  };

  const handleSave = () => {
    if (!bedTime || !alarmTime) {
      toast.error("Please set both bedtime and wake-up time!");
      return;
    }
    
    if (!userId) {
      toast.error("Please log in to set an alarm");
      navigate("/login");
      return;
    }

    localStorage.setItem(`bedTime_${userId}`, bedTime);
    localStorage.setItem(`alarmTime_${userId}`, alarmTime);
    localStorage.setItem(`isAlarmSet_${userId}`, "true");
    setIsAlarmSet(true);
    toast.success("Alarm set successfully!");
  };

  const fetchSleepData = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = getUserId();
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const response = await axios.get(
        "http://localhost:4000/sleep/user-sleep",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { userId }
        }
      );
      setSleepData(response.data);
      
      localStorage.setItem(`sleepData_${userId}`, JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching sleep data:", error);
      if (error.message === "User not authenticated") {
        navigate("/login");
      }
    }
  };

  const addSleepEntry = async (entry) => {
    try {
      const token = localStorage.getItem("token");
      const userId = getUserId();
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const response = await axios.post(
        "http://localhost:4000/sleep/add",
        { ...entry, userId },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setSleepData(prevData => [...prevData, response.data]);
      toast.success("Sleep entry added successfully!");
      
      const updatedData = [...sleepData, response.data];
      localStorage.setItem(`sleepData_${userId}`, JSON.stringify(updatedData));
    } catch (error) {
      console.error("Error adding sleep entry:", error);
      toast.error("Failed to add sleep entry");
      if (error.message === "User not authenticated") {
        navigate("/login");
      }
    }
  };

  const deleteSleepEntry = async (entryId) => {
    try {
      const token = localStorage.getItem("token");
      const userId = getUserId();
      if (!userId) {
        throw new Error("User not authenticated");
      }

      await axios.delete(
        `http://localhost:4000/sleep/${entryId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { userId }
        }
      );

      const updatedData = sleepData.filter(entry => entry._id !== entryId);
      setSleepData(updatedData);
      
      localStorage.setItem(`sleepData_${userId}`, JSON.stringify(updatedData));
      toast.success("Sleep entry deleted successfully!");
    } catch (error) {
      console.error("Error deleting sleep entry:", error);
      toast.error("Failed to delete sleep entry");
    }
  };

  useEffect(() => {
    return () => {
      if (userId) {
        localStorage.removeItem(`alarmState_${userId}`);
        localStorage.removeItem(`bedTime_${userId}`);
        localStorage.removeItem(`alarmTime_${userId}`);
        localStorage.removeItem(`isAlarmSet_${userId}`);
      }
    };
  }, [userId]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token' && !e.newValue) {
        setSleepData([]);
        setBedTime("");
        setAlarmTime("");
        setIsAlarmSet(false);
        if (userId) {
          localStorage.removeItem(`alarmState_${userId}`);
          localStorage.removeItem(`bedTime_${userId}`);
          localStorage.removeItem(`alarmTime_${userId}`);
          localStorage.removeItem(`isAlarmSet_${userId}`);
        }
        navigate("/login");
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [userId]);

  return {
    bedTime,
    setBedTime,
    alarmTime,
    setAlarmTime,
    alarmTriggered,
    setAlarmTriggered,
    showAlarmModal,
    setShowAlarmModal,
    lastAlarmCheck,
    setLastAlarmCheck,
    hoursOfSleep,
    isAlarmSet,
    setIsAlarmSet,
    vibrateOnAlarm,
    setVibrateOnAlarm,
    audioRef,
    stopAlarm,
    handleSave,
    sleepData,
    setSleepData,
    fetchSleepData,
    addSleepEntry,
    deleteSleepEntry,
  };
};

export default Sleep;
