import React from "react";

const SleepScheduleButton = () => {
  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-full w-full max-w-lg mx-auto mt-3">
      <span className="text-gray-700 text-xl font-medium">Daily Sleep Schedule</span>
      <button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-2 rounded-full ">
        Check
      </button>
    </div>
  );
};

export default SleepScheduleButton;
