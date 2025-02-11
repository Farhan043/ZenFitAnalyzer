import { useState, useEffect, useRef } from "react";
import { toast } from 'react-toastify';

const useAlarm = () => {
  const [bedTime, setBedTime] = useState(localStorage.getItem("bedTime") || "");
  const [alarmTime, setAlarmTime] = useState(localStorage.getItem("alarmTime") || "");
  const [alarmTriggered, setAlarmTriggered] = useState(false);
  const [showAlarmModal, setShowAlarmModal] = useState(false);
  const [lastAlarmCheck, setLastAlarmCheck] = useState(null);
  const [vibrateOnAlarm, setVibrateOnAlarm] = useState(false);
  const [hoursOfSleep, setHoursOfSleep] = useState();
  const [isAlarmSet, setIsAlarmSet] = useState(localStorage.getItem("isAlarmSet") === "true");

  const audioRef = useRef();
  const alarmTimeoutRef = useRef();
  const alarmIntervalRef = useRef();

  useEffect(() => {
    const savedAlarmState = localStorage.getItem('alarmState');
    if (savedAlarmState) {
      const { alarmTime: savedAlarmTime, bedTime: savedBedTime, isSet } = JSON.parse(savedAlarmState);
      if (isSet) {
        setBedTime(savedBedTime);
        setAlarmTime(savedAlarmTime);
        setIsAlarmSet(true);
      }
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
    if (isAlarmSet && alarmTime) {
      localStorage.setItem('alarmState', JSON.stringify({
        alarmTime,
        bedTime,
        isSet: true
      }));
    }
  });

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
    alarmTimeoutRef.current = setTimeout(stopAlarm, 5 * 60 * 1000); // Stop alarm after 5 minutes
  };

  const stopAlarm = () => {
    setBedTime("");
    setAlarmTime("");
    localStorage.removeItem("alarmTime");
    localStorage.removeItem("bedTime");
    localStorage.removeItem("isAlarmSet");
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

    setAlarmTriggered(false);
    setShowAlarmModal(false);
    setVibrateOnAlarm(false);
    setIsAlarmSet(false);
    localStorage.removeItem('alarmState');
  };

  const handleSave = () => {
    if (!bedTime || !alarmTime) {
      toast.error("Please set both bedtime and wake-up time!");
      return;
    }
    localStorage.setItem("bedTime", bedTime);
    localStorage.setItem("alarmTime", alarmTime);
    localStorage.setItem("isAlarmSet", "true");
    setIsAlarmSet(true);
    toast.success("Alarm set successfully!");
  };

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
  };
};

export default useAlarm;