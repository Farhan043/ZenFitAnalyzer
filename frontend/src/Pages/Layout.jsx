import { FaDumbbell, FaHeartbeat, FaRunning, FaUtensils, FaBed, FaTint, FaMusic, FaWeight } from "react-icons/fa";

export default function Layout() {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-400 mt-5 min-h-screen flex flex-col items-center p-6">
      {/* Header Section */}
      <div className="text-center max-w-2xl mb-10">
        <h2 className="text-4xl font-bold text-gray-800">Track & Improve Your Fitness with ZenFitAnalyzer</h2>
        <p className="text-gray-600 mt-4 text-lg">
          Stay on top of your health with real-time tracking for meals, workouts, sleep, hydration, and body progress-all in one platform.
        </p>
      </div>
      
      {/* Features Section */}
      <div className="bg-gradient-to-t from-blue-100 to-blue-400 p-8 rounded-2xl shadow-lg w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard icon={<FaUtensils className="text-orange-500 text-4xl" />} title="Meal Tracking" description="Log daily meals & monitor calories." />
        <FeatureCard icon={<FaDumbbell className="text-blue-500 text-4xl" />} title="Workout Plans" description="Customized fitness routines for better results." />
        <FeatureCard icon={<FaBed className="text-purple-500 text-4xl" />} title="Sleep Tracker" description="Monitor your sleep patterns & quality." />
        <FeatureCard icon={<FaTint className="text-blue-400 text-4xl" />} title="Water Intake" description="Stay hydrated with smart reminders." />
        <FeatureCard icon={<FaMusic className="text-green-500 text-4xl" />} title="Music Integration" description="Power your workouts with your favorite tunes." />
        <FeatureCard icon={<FaWeight className="text-red-500 text-4xl" />} title="Body Progress" description="Track BMI and physical progress over time." />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-blue-100 to-blue-400 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
      {icon}
      <h3 className="mt-3 text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm text-center mt-2">{description}</p>
    </div>
  );
}
