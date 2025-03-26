import { Home, Trophy, Users, User, CalendarDays, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ProfileImage from '../Common/ProfileImage';
import { UserDataContext } from '../../Context/UserContext';
import React from 'react';

export default function SocialFeed() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = React.useContext(UserDataContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-400 flex flex-col items-center text-center">
     {/* Navbar */}
     <nav className="w-full max-w-7xl flex justify-between items-center py-4 px-6">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-lg">
          <Trophy className="w-6 h-6" />{" "}
          <span className="text-xl">FitSocial</span>
        </div>
        <div className="hidden md:flex gap-8  text-gray-700 text-base">
          <NavItem to="/social" icon={<Home size={18} />} text="Home" />
          <NavItem
            to="/challenges"
            icon={<Trophy size={18} />}
            text="Challenges"
            active={true}
          />
          <NavItem to="/socialfeed" icon={<Users size={18} />} text="Social" />
          <NavItem to="/profile" icon={<User size={18} />} text="Profile" />
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </nav>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-white shadow-md w-full py-4">
          <NavItem to="/social" icon={<Home size={18} />} text="Home" />
          <NavItem to="/challenges" icon={<Trophy size={18} />} text="Challenges" active={true} />
          <NavItem to="/socialfeed" icon={<Users size={18} />} text="Social" />
          <NavItem to="/profile" icon={<User size={18} />} text="Profile" />
        </div>
      )}

      {/* Hero Section */}
      <div className="flex flex-col items-center mt-16 px-4">
        <h1 className="text-5xl font-extrabold text-gray-900 text-center">
          Fitness is Better <br />
          <span className="text-blue-600">Together</span>
        </h1>
        <p className="text-gray-600 text-xl mt-4 max-w-xl text-center">
          Create challenges, invite friends, and achieve your fitness goals as a
          community. Track progress, share achievements, and stay motivated
          together.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/challenges")}
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium shadow hover:bg-blue-700"
          >
            Start a Challenge
          </button>
          <button 
            onClick={() => navigate("/socialfeed")}
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-medium shadow border hover:bg-gray-200"
          >
            View Social Feed
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-20 px-6 w-full max-w-6xl">
        <h2 className="text-5xl font-bold text-gray-900 text-center mb-12">
          Everything You Need to Succeed
        </h2>
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Trophy className="w-10 h-10 text-white" />}
            title="Create Challenges"
            description="Design custom fitness challenges with your friends and stay motivated together."
            bgColor="bg-blue-600"
          />
          <FeatureCard
            icon={<Users className="w-10 h-10 text-white" />}
            title="Group Workouts"
            description="Join real-time group workouts and stay accountable with friends."
            bgColor="bg-green-500"
          />
          <FeatureCard
            icon={<User className="w-10 h-10 text-white" />}
            title="Track Progress"
            description="Track and celebrate your fitness milestones and achievements."
            bgColor="bg-red-500"
          />
          <FeatureCard
            icon={<CalendarDays className="w-10 h-10 text-white" />}
            title="Schedule Activities"
            description="Organize your fitness routine effectively with our built-in scheduler."
            bgColor="bg-purple-600"
          />
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="mt-16 w-full bg-gradient-to-b from-blue-400 to-white py-16 flex flex-col items-center text-center px-4 mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Ready to Transform Your Fitness Journey?
        </h2>
        <p className="text-gray-600 mt-4 max-w-xl">
          Join our community today and experience the power of social fitness.
        </p>
        <button
          onClick={() => navigate("/challenges")}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-full font-medium shadow hover:bg-blue-700"
        >
          Get Started Now
        </button>
        <Link to="/home" className="text-blue-700 mt-12  flex items-start justify-start"><i className="ri-arrow-left-line"></i>back home</Link>

      </div>

    </div>
  );
}

function NavItem({ icon, text, to, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-300 
        ${active 
          ? "bg-blue-50 text-blue-600 font-semibold" 
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`}
    >
      {icon}
      {text}
    </Link>
  );
}

function FeatureCard({ icon, title, description, bgColor }) {
  return (
    <div className="bg-gradient-to-b from-white to-blue-400 p-8 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform duration-300">
      <div className={`w-16 h-16 flex items-center justify-center rounded-full ${bgColor} mx-auto mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
