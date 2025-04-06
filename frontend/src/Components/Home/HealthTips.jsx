import React, { useState, useEffect } from 'react';

const tips = [
  {
    id: 1,
    title: "Morning Stretching",
    content: "Start your day with 5 minutes of stretching to improve flexibility and reduce muscle tension.",
    category: "Wellness",
    bgColor: "bg-blue-500",
    icon: "ri-run-line"
  },
  {
    id: 2,
    title: "Hydration Reminder",
    content: "Drink at least 8 glasses of water daily to maintain proper hydration and boost metabolism.",
    category: "Nutrition",
    bgColor: "bg-green-500",
    icon: "ri-water-flash-line"
  },
  {
    id: 3,
    title: "Posture Check",
    content: "Set reminders to check your posture throughout the day, especially when working at a desk.",
    category: "Wellness",
    bgColor: "bg-purple-500",
    icon: "ri-mental-health-line"
  },
  {
    id: 4,
    title: "Protein Intake",
    content: "Consume 0.8-1g of protein per kg of body weight to support muscle recovery and growth.",
    category: "Nutrition",
    bgColor: "bg-orange-500",
    icon: "ri-restaurant-line"
  },
  {
    id: 5,
    title: "Mindful Breaks",
    content: "Take 5-minute mindfulness breaks during work to reduce stress and improve focus.",
    category: "Mental Health",
    bgColor: "bg-teal-500",
    icon: "ri-mental-health-line"
  },
  {
    id: 6,
    title: "Sleep Hygiene",
    content: "Aim for 7-9 hours of quality sleep and maintain a consistent sleep schedule for better recovery.",
    category: "Wellness",
    bgColor: "bg-indigo-500",
    icon: "ri-zzz-line"
  },
  {
    id: 7,
    title: "Balanced Diet",
    content: "Include a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats in your meals.",
    category: "Nutrition",
    bgColor: "bg-red-500",
    icon: "ri-plant-line"
  },
  {
    id: 8,
    title: "Active Transportation",
    content: "Consider walking or cycling for short trips to incorporate more movement into your day.",
    category: "Fitness",
    bgColor: "bg-yellow-500",
    icon: "ri-bike-line"
  },
  {
    id: 9,
    title: "Digital Detox",
    content: "Limit screen time before bed and take regular breaks from digital devices to reduce eye strain.",
    category: "Mental Health",
    bgColor: "bg-pink-500",
    icon: "ri-smartphone-line"
  },
  {
    id: 10,
    title: "Strength Training",
    content: "Include resistance exercises 2-3 times per week to build muscle and boost metabolism.",
    category: "Fitness",
    bgColor: "bg-blue-600",
    icon: "ri-dumbbell-line"
  }
];

const HealthTips = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setFade(true);
        setTimeout(() => {
          setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
          setFade(false);
        }, 500);
      }, 8000);
    }

    return () => clearInterval(interval);
  }, [autoplay]);

  const currentTip = tips[currentTipIndex];
  
  const nextTip = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
      setFade(false);
    }, 500);
  };
  
  const prevTip = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex - 1 + tips.length) % tips.length);
      setFade(false);
    }, 500);
  };

  return (
    <div className="w-full rounded-xl overflow-hidden shadow-lg">
      <div className="p-5 bg-gray-900 border border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16V13M12 10H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Daily Health Tips
          </h2>
          <button 
            onClick={() => setAutoplay(!autoplay)} 
            className={`p-2 rounded-full ${autoplay ? 'bg-blue-500' : 'bg-gray-700'} text-white`}
          >
            <i className={`ri-${autoplay ? 'pause' : 'play'}-mini-fill`}></i>
          </button>
        </div>
        
        <div className="relative">
          <button 
            onClick={prevTip}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 bg-opacity-50 hover:bg-opacity-70 rounded-r-full p-2"
            aria-label="Previous tip"
          >
            <i className="ri-arrow-left-s-line text-white"></i>
          </button>
          
          <div className={`transition-opacity duration-500 mx-8 ${fade ? 'opacity-0' : 'opacity-100'}`}>
            <div className={`p-4 rounded-lg ${currentTip.bgColor} bg-opacity-10 border border-${currentTip.bgColor.split('-')[1]}-400 border-opacity-30`}>
              <div className="flex items-start mb-3">
                <div className={`p-3 rounded-full ${currentTip.bgColor} text-white mr-3 hidden sm:flex`}>
                  <i className={`${currentTip.icon} text-xl`}></i>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <h3 className="font-bold text-white text-lg flex items-center">
                      <i className={`${currentTip.icon} mr-2 sm:hidden text-xl ${currentTip.bgColor} bg-opacity-80 p-1 rounded`}></i>
                      {currentTip.title}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${currentTip.bgColor} text-white`}>
                      {currentTip.category}
                    </span>
                  </div>
                  <p className="text-gray-300">{currentTip.content}</p>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={nextTip}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 bg-opacity-50 hover:bg-opacity-70 rounded-l-full p-2"
            aria-label="Next tip"
          >
            <i className="ri-arrow-right-s-line text-white"></i>
          </button>
        </div>
        
        <div className="flex justify-center mt-6">
          <div className="flex flex-wrap justify-center gap-2 max-w-full overflow-hidden">
            {tips.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentTipIndex ? `${currentTip.bgColor} w-4` : 'bg-gray-600'
                }`}
                onClick={() => {
                  setFade(true);
                  setTimeout(() => {
                    setCurrentTipIndex(index);
                    setFade(false);
                  }, 500);
                }}
                aria-label={`Tip ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTips; 