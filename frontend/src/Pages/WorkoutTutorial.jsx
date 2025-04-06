import React from 'react';
import { FaDumbbell, FaPlay, FaChartLine, FaBook, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const WorkoutTutorial = () => {
  const navigate = useNavigate();

  const workoutCategories = [
    {
      icon: <FaDumbbell size={24} />,
      title: "Strength Training",
      desc: "Learn proper form and techniques for weight lifting",
      color: "from-blue-500 to-blue-600",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=500&auto=format&fit=crop"
    },
    {
      icon: <FaPlay size={24} />,
      title: "Cardio Workouts",
      desc: "Master various cardio exercises and routines",
      color: "from-purple-500 to-purple-600",
      image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=500&auto=format&fit=crop"
    },
    {
      icon: <FaChartLine size={24} />,
      title: "Progress Tracking",
      desc: "Understand how to track and measure your progress",
      color: "from-green-500 to-green-600",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500&auto=format&fit=crop"
    },
    {
      icon: <FaBook size={24} />,
      title: "Workout Plans",
      desc: "Get access to structured workout programs",
      color: "from-red-500 to-red-600",
      image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=500&auto=format&fit=crop"
    }
  ];

  const featuredTutorials = [
    {
      title: "Perfect Push-up Form",
      desc: "Master the fundamental push-up technique for chest and core strength",
      image: "https://builtwithscience.com/wp-content/uploads/2021/05/perfect-push-up-form.jpeg"
    },
    {
      title: "Squat Mastery",
      desc: "Learn proper squat form for lower body development",
      image: "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=500&auto=format&fit=crop"
    },
    {
      title: "HIIT Cardio Guide",
      desc: "High-intensity interval training for maximum fat burn",
      image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=500&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 to-purple-900 p-6 md:p-10 mb-12 shadow-xl animate-fadeIn">
        <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 flex flex-col">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Master Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Workouts</span>
            </h1>
            <p className="text-lg md:text-xl mb-6 text-gray-200">
              Learn proper techniques, form, and workout routines from expert trainers. 
              Transform your fitness journey with our comprehensive tutorials.
            </p>
            <button 
              onClick={() => navigate("/tutorial")}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8 py-4 rounded-xl text-white font-medium shadow-lg transition-all duration-300 w-full md:w-auto"
            >
              <span>Start Learning</span>
              <FaArrowRight />
            </button>
          </div>
          <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
            <div className="relative bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-2 rounded-2xl shadow-2xl backdrop-blur-sm animate-float">
              <img 
                src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=500&auto=format&fit=crop" 
                alt="Workout Tutorial" 
                className="w-full h-[300px] rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="mb-12 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Explore Workout <span className="text-blue-400">Categories</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {workoutCategories.map((category, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1 transition-all duration-300 animate-fadeIn"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <img 
                src={category.image}
                alt={category.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80`}></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="text-white text-3xl mb-4">{category.icon}</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-gray-100 text-sm">{category.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Tutorials Section */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl animate-fadeIn" style={{ animationDelay: "0.4s" }}>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Featured <span className="text-blue-400">Tutorials</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTutorials.map((tutorial, index) => (
            <div key={index} className="bg-gray-800/50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={tutorial.image}
                  alt={tutorial.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{tutorial.title}</h3>
                <p className="text-gray-300 mb-4 text-sm">{tutorial.desc}</p>
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
                  <FaPlay size={14} />
                  <span>Watch Tutorial</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutTutorial;