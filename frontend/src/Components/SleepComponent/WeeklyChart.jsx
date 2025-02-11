// import React from 'react'

// const WeeklyChart = () => {
//   return (
//     <div>WeeklyChart</div>
//   )
// }

// export default WeeklyChart


import { div } from "motion/react-client";
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const SleepChart = ({ data }) => {
  // Check if data is available
  const hasData = data && data.length > 0;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { hours, change } = payload[0].payload;
      const changeColor = change && change.includes("+") ? "text-green-500" : "text-red-500";
      return (
        <div className="p-3  rounded-lg">
          <p className="text-sm font-semibold text-blue-700">Sleep Time: {hours} hours</p>
          {change && <p className={`text-sm font-semibold ${changeColor}`}>Change: {change}</p>}
        </div>
      );
    }
    return null;
  };

  return (
    
    <div className="flex flex-col items-center p-8 glass   ">
      {/* <h2 className="text-2xl text-center font-extrabold mb-6">Weekly Sleep Chart</h2> */}
      {hasData ? (
        <ResponsiveContainer width="100%" height={200} className="mr-10">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3B82F6" />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 14, fill: "#60A5FA" }}
              label={{ value: "Days", position: "insideBottomRight", offset: -5, fontSize: 16, fill: "#60A5FA" }}
            />
            <YAxis
              tick={{ fontSize: 14, fill: "#60A5FA" }}
              label={{ value: "Hours", angle: -90, position: "insideLeft", fontSize: 16, fill: "#60A5FA" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="hours" stroke="#3B82F6" strokeWidth={3} dot={{ r: 6, fill: "#60A5FA" }} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-center font-semibold text-white mt-5">
          {/* <p className="text-2xl font-medium">Your weekly chart is not available.</p> */}
          <p className="">Please set an alarm or bedtime to track your  SleepChart.</p>
        </div>
      )}
      </div>
      
  );
};

// Sample data with percentage changes and weekly dates
const sampleData = [
  { day: "Sun", date: "Jan 28", hours: 6, change: "-" },
  { day: "Mon", date: "Jan 29", hours: 7, change: "+16.7%" },
  { day: "Tue", date: "Jan 30", hours: 5.5, change: "-21.4%" },
  { day: "Wed", date: "Jan 31", hours: 6, change: "+9.1%" },
  { day: "Thu", date: "Feb 1", hours: 8, change: "+33.3%" },
  { day: "Fri", date: "Feb 2", hours: 7, change: "-12.5%" },
  { day: "Sat", date: "Feb 3", hours: 6.5, change: "-7.1%" },
];

const WeeklyChart = () => {
  return (
    <div className="  mt-4 p-6 rounded-lg  cursor-pointer">
      <SleepChart data={sampleData} />
    </div>
  );
};

export default WeeklyChart;


