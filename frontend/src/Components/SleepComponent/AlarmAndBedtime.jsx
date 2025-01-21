import React, { useState, useEffect, useRef } from "react";
import axios from "axios";


const AlarmAndBedtime = () => {
  const [bedtime, setBedtime] = useState("");
  const [alarmTime, setAlarmTime] = useState("");
  const [repeatDays, setRepeatDays] = useState([]);
  const [vibrateOnAlarm, setVibrateOnAlarm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alarmTriggered, setAlarmTriggered] = useState(false); // To avoid repeated alarms

  const audioRef = useRef(); // Reference for alarm sound

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  useEffect(() => {
    // Fetch current alarm and bedtime settings
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/alarm`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { bedtime, alarmTime, repeatDays, vibrateOnAlarm } = response.data;
        setBedtime(bedtime || "");
        setAlarmTime(alarmTime || "");
        setRepeatDays(repeatDays || []);
        setVibrateOnAlarm(vibrateOnAlarm || false);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching settings:", error);
        setLoading(false);
      }
    };

    fetchSettings();

    // Check alarm every second
    const interval = setInterval(() => {
      checkAlarm();
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const checkAlarm = () => {
    if (!alarmTime || alarmTriggered) return;

    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    if (currentTime === alarmTime) {
      setAlarmTriggered(true); // Set alarm as triggered to avoid repeat
      playAlarmSound();
    }
  };

  const playAlarmSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    if (vibrateOnAlarm && navigator.vibrate) {
      navigator.vibrate([500, 200, 500]); // Vibrate pattern
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = { bedtime, alarmTime, repeatDays, vibrateOnAlarm };
      await axios.post(`${import.meta.env.VITE_BASE_URL}/users/alarm`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Alarm and bedtime settings saved successfully!");
      setAlarmTriggered(false); // Reset alarm trigger
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings.");
    }
  };

  const toggleDay = (day) => {
    setRepeatDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4 text-center">Set Alarm & Bedtime</h2>

      {/* Alarm Sound */}
      {/* <audio ref={audioRef} src="/alarm-sound.mp3" preload="auto"></audio> */}
      <audio ref={audioRef} src="/alarm-sound.mp3" preload="auto"></audio>


      {/* Bedtime */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Bedtime</label>
        <input
          type="time"
          value={bedtime}
          onChange={(e) => setBedtime(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Alarm Time */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Alarm Time</label>
        <input
          type="time"
          value={alarmTime}
          onChange={(e) => setAlarmTime(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Repeat Days */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Repeat Days</label>
        <div className="flex flex-wrap gap-2">
          {daysOfWeek.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => toggleDay(day)}
              className={`px-4 py-2 rounded-md ${repeatDays.includes(day)
                ? "bg-purple-500 text-white"
                : "bg-gray-200 text-gray-700"
                }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Vibrate on Alarm */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-gray-700 font-medium">Vibrate on Alarm</span>
        <button
          onClick={() => setVibrateOnAlarm(!vibrateOnAlarm)}
          className={`w-10 h-6 rounded-full flex items-center ${vibrateOnAlarm ? "bg-purple-500" : "bg-gray-200"
            }`}
        >
          <span
            className={`w-4 h-4 bg-white rounded-full transform transition-transform ${vibrateOnAlarm ? "translate-x-4" : "translate-x-1"
              }`}
          ></span>
        </button>
      </div>

      {/* Save Button */}
      <div className="text-center">
        <button
          onClick={handleSave}
          className="w-full py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md font-medium"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AlarmAndBedtime;
