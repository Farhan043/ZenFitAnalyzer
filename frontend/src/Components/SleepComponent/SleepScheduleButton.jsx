import React from "react";

const SleepScheduleButton = () => {
  return (
    <div className="flex items-center justify-between glass p-4 rounded-full w-96 max-w-lg mx-auto ">
      <span className="text-gray-200 text-xl font-medium">Daily Sleep Schedule</span>
      <button className="glass text-white px-6 py-2 rounded-full ">
        Check
      </button>
    </div>
  );
};

export default SleepScheduleButton;
