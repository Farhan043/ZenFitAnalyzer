import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { 
  ChevronLeft,
  Timer,
  Calendar,
  ChevronRight,
  Heart,
  Play,
  Pause,
  X,
  Save,
  Dumbbell
} from 'lucide-react';
import { workoutData } from '../../assets/workoutData';

// Constants
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dailyStats = [
  { calories: 150, duration: 20, workouts: 1 },
  { calories: 300, duration: 45, workouts: 2 },
  { calories: 200, duration: 30, workouts: 1 },
  { calories: 450, duration: 60, workouts: 3 },
  { calories: 250, duration: 35, workouts: 2 },
  { calories: 500, duration: 75, workouts: 3 },
  { calories: 350, duration: 50, workouts: 2 }
];

// Create audio context for beep sound
const createBeepSound = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
  gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
  
  return { oscillator, gainNode, audioContext };
};

function Workout() {
  const [activeView, setActiveView] = useState('main');
  const [activeDay] = useState(new Date().getDay());
  const [selectedLevel, setSelectedLevel] = useState('Beginner');
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [customReps, setCustomReps] = useState('');
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [isExercising, setIsExercising] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [todayStats, setTodayStats] = useState({ calories: 0, duration: 0, workouts: 0, steps: 0, distance: 0 });

  // Load workout history and stats from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('workoutHistory');
    const savedStats = localStorage.getItem('todayStats');
    if (savedHistory) {
      setWorkoutHistory(JSON.parse(savedHistory));
    }
    if (savedStats) {
      setTodayStats(JSON.parse(savedStats));
    }
  }, []);

  // Save workout history and stats to localStorage
  useEffect(() => {
    localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));
    localStorage.setItem('todayStats', JSON.stringify(todayStats));
  }, [workoutHistory, todayStats]);

  // Timer effect with beep sound
  useEffect(() => {
    let interval;
    if (isExercising && !isPaused && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            // Play beep sound when timer ends
            const { oscillator, gainNode, audioContext } = createBeepSound();
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
            
            setTimeout(() => {
              gainNode.disconnect();
              oscillator.disconnect();
              audioContext.close();
            }, 200);

            handleNextExercise();
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isExercising, isPaused, timer]);

  const handleStartWorkout = () => {
    if (!selectedBodyPart || !selectedWorkout) return;
    
    const exercises = selectedWorkout.exercises[selectedBodyPart];
    if (!exercises || exercises.length === 0) return;
    
    setIsExercising(true);
    setCurrentExerciseIndex(0);
    setTimer(exercises[0].time);
  };

  const handleNextExercise = () => {
    if (!selectedBodyPart || !selectedWorkout) return;

    const exercises = selectedWorkout.exercises[selectedBodyPart];
    let nextIndex = currentExerciseIndex + 1;

    if (nextIndex >= exercises.length) {
      // Workout completed
      setIsExercising(false);
      const today = format(new Date(), 'yyyy-MM-dd');
      
      // Calculate calories and duration
      const caloriesPerExercise = 10;
      const totalCalories = exercises.length * caloriesPerExercise;
      const totalDuration = exercises.reduce((acc, ex) => acc + ex.time, 0) / 60;

      // Update workout history
      const newHistory = [...workoutHistory, {
        date: today,
        workout: selectedWorkout.type,
        bodyPart: selectedBodyPart,
        level: selectedLevel,
        exercises: exercises.length,
        calories: totalCalories,
        duration: totalDuration
      }];
      
      // Update today's stats
      setTodayStats(prev => ({
        ...prev,
        calories: prev.calories + totalCalories,
        duration: prev.duration + totalDuration,
        workouts: prev.workouts + 1
      }));

      setWorkoutHistory(newHistory);
      setActiveView('main');
    } else {
      setCurrentExerciseIndex(nextIndex);
      setTimer(exercises[nextIndex].time);
    }
  };

  const getCurrentExercise = () => {
    if (!selectedBodyPart || !selectedWorkout) return null;
    const exercises = selectedWorkout.exercises[selectedBodyPart];
    return exercises[currentExerciseIndex];
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    setSelectedWorkout(null);
    setSelectedBodyPart(null);
  };

  const handleWorkoutClick = (workout) => {
    setSelectedWorkout(workout);
    setSelectedBodyPart(null);
    setActiveView('bodyParts');
  };

  const handleBodyPartClick = (bodyPart) => {
    setSelectedBodyPart(bodyPart);
    setActiveView('workout');
  };

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
    setCustomReps(exercise.reps?.toString() || '');
    setActiveView('exercise');
  };

  const handleSaveReps = () => {
    if (selectedExercise && selectedWorkout && selectedBodyPart) {
      const updatedWorkout = { ...selectedWorkout };
      updatedWorkout.exercises[selectedBodyPart] = updatedWorkout.exercises[selectedBodyPart].map(ex =>
        ex.name === selectedExercise.name
          ? { ...ex, reps: parseInt(customReps) || ex.reps }
          : ex
      );
      setSelectedWorkout(updatedWorkout);
      setActiveView('workout');
    }
  };

  if (activeView === 'bodyParts' && selectedWorkout) {
    return (
      <div className="min-h-screen bg-blue-100  text-gray-700">
        <div className="max-w-7xl mx-auto p-6 ">
          <div className="bg-white rounded-2xl p-6 ">
            <div className="flex items-center justify-between mb-6 ">
              <button 
                onClick={() => setActiveView('main')}
                className="p-2 rounded-lg bg-blue-100 "
              >
                <ChevronLeft className="w-6 h-6 " />
              </button>
              <h2 className="text-xl font-bold ">{selectedWorkout.type}</h2>
              <div className="w-10 "></div>
            </div>
            
            <div className="grid gap-4 ">
              {selectedWorkout.bodyParts.map((bodyPart, index) => (
                <button
                  key={index}
                  onClick={() => handleBodyPartClick(bodyPart)}
                  className="bg-gray-50  p-6 rounded-xl hover:bg-gray-100 transition-colors "
                >
                  <div className="flex items-center justify-between ">
                    <div className="flex items-center gap-4">
                      <Dumbbell className="w-6 h-6 text-blue-500" />
                      <span className="font-semibold ">{bodyPart}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'exercise' && selectedExercise) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="relative h-64">
            <img 
              src={selectedExercise.image}
              alt={selectedExercise.name}
              className="w-full h-full object-cover rounded-t-3xl"
            />
            <button 
              onClick={() => setActiveView('workout')}
              className="absolute top-4 right-4 p-2 rounded-full  bg-white/30 backdrop-blur-sm"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
          
          <div className="p-6 ">
            <h2 className="text-2xl font-bold mb-4  text-gray-700">{selectedExercise.name}</h2>
            <p className="text-gray-600 mb-6">Time: {selectedExercise.time} seconds</p>
            
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3  text-gray-500">Custom Repetitions</h3>
              <input
                type="text"
                value={customReps}
                onChange={(e) => setCustomReps(e.target.value)}
                placeholder="Enter repetitions (e.g., 12)"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>

            <button 
              onClick={handleSaveReps}
              className="w-full bg-blue-500 text-white py-4 rounded-xl flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Repetitions
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'workout' && selectedWorkout && selectedBodyPart) {
    const exercises = selectedWorkout.exercises[selectedBodyPart];
    
    return (
      <div className="min-h-screen bg-blue-100">
        <div className="max-w-7xl mx-auto bg-white">
          {/* Workout Header */}
          <div className="relative h-80 sm:h-96">
            <img 
              src={exercises[0].image}
              alt={selectedBodyPart}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 right-0 p-6">
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => setActiveView('bodyParts')}
                  className="p-2 rounded-lg bg-white/30 backdrop-blur-sm"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button className="p-2 rounded-lg bg-white/30 backdrop-blur-sm">
                  <Heart className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </div>

          {isExercising && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4">
                <h2 className="text-2xl font-bold mb-4">Current Exercise</h2>
                <div className="text-center mb-8">
                  <p className="text-6xl font-bold mb-4">{formatTime(timer)}</p>
                  <p className="text-xl">{getCurrentExercise()?.name}</p>
                  <p className="text-gray-600">{getCurrentExercise()?.reps} reps</p>
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="bg-blue-500 text-white p-4 rounded-full"
                  >
                    {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
                  </button>
                  <button
                    onClick={handleNextExercise}
                    className="bg-gray-200 p-4 rounded-full"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2 ">{selectedBodyPart} Workout</h1>
            <p className="text-gray-600 mb-4">
              {exercises.length} Exercises | {selectedLevel} Level
            </p>

            {/* Exercises */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg  text-gray-600">Exercises</h2>
                <span className="text-gray-500">{exercises.length} Total</span>
              </div>
              <div className="grid gap-3 ">
                {exercises.map((exercise, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors "
                    onClick={() => handleExerciseClick(exercise)}
                  >
                    <div className="flex items-center gap-3  text-gray-700">
                      <img src={exercise.image} alt={exercise.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <p className="font-medium ">{exercise.name}</p>
                        <p className="text-sm text-gray-500">{exercise.reps} reps | {exercise.time} sec</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={handleStartWorkout}
              className="w-full bg-blue-500 text-white py-4 rounded-xl mt-6"
            >
              {isExercising ? 'Continue Workout' : 'Start Workout'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button className="p-2 rounded-lg bg-white/30">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Workout Tracker</h1>
          <div className="w-10"></div>
        </div>

        {/* Health Overview - Replacing the Stats Chart */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-6 text-white">
          <h2 className="text-2xl font-bold mb-6">Health overview</h2>
          
          <div className="flex justify-between items-start mb-6">
            <div className="w-1/2">
              {/* Steps Section */}
              <div className="mb-6">
                <p className="text-xl font-semibold mb-2">Steps</p>
                <div className="flex items-center gap-3">
                  <span className="text-green-400 text-3xl">👣</span>
                  <span className="text-4xl font-bold text-green-400">{todayStats.steps || 0}</span>
                  <span className="text-xl text-gray-400">/5000 steps</span>
                </div>
              </div>
              
              {/* Distance Section */}
              <div className="mb-6">
                <p className="text-xl font-semibold mb-2">Distance</p>
                <div className="flex items-center gap-3">
                  <span className="text-yellow-400 text-3xl">📍</span>
                  <span className="text-4xl font-bold text-yellow-400">{(todayStats.distance || 0).toFixed(1)}</span>
                  <span className="text-xl text-gray-400">/5.00 km</span>
                </div>
              </div>
              
              {/* Calories Section */}
              <div>
                <p className="text-xl font-semibold mb-2">Calories</p>
                <div className="flex items-center gap-3">
                  <span className="text-red-400 text-3xl">🔥</span>
                  <span className="text-4xl font-bold text-red-400">{todayStats.calories || 0}</span>
                  <span className="text-xl text-gray-400">/200 kcal</span>
                </div>
              </div>
            </div>
            
            {/* Circular Progress Chart */}
            <div className="w-1/2 flex justify-center items-center">
              <div className="relative w-40 h-40">
                {/* Outer Circle - Steps */}
                <div className="absolute inset-0 rounded-full border-8 border-green-800 opacity-30"></div>
                <div 
                  className="absolute inset-0 rounded-full border-8 border-green-400"
                  style={{ 
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin((todayStats.steps / 5000) * Math.PI * 2)}% ${50 - 50 * Math.cos((todayStats.steps / 5000) * Math.PI * 2)}%, ${(todayStats.steps / 5000) >= 0.5 ? '100% 50%, 50% 100%, 0% 50%, 50% 0%' : '50% 0%'})` 
                  }}
                ></div>
                
                {/* Middle Circle - Distance */}
                <div className="absolute inset-4 rounded-full border-8 border-yellow-800 opacity-30"></div>
                <div 
                  className="absolute inset-4 rounded-full border-8 border-yellow-400"
                  style={{ 
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 40 * Math.sin((todayStats.distance / 5) * Math.PI * 2)}% ${50 - 40 * Math.cos((todayStats.distance / 5) * Math.PI * 2)}%, ${(todayStats.distance / 5) >= 0.5 ? '100% 50%, 50% 100%, 0% 50%, 50% 0%' : '50% 0%'})` 
                  }}
                ></div>
                
                {/* Inner Circle - Calories */}
                <div className="absolute inset-8 rounded-full border-8 border-red-800 opacity-30"></div>
                <div 
                  className="absolute inset-8 rounded-full border-8 border-red-400"
                  style={{ 
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 30 * Math.sin((todayStats.calories / 200) * Math.PI * 2)}% ${50 - 30 * Math.cos((todayStats.calories / 200) * Math.PI * 2)}%, ${(todayStats.calories / 200) >= 0.5 ? '100% 50%, 50% 100%, 0% 50%, 50% 0%' : '50% 0%'})` 
                  }}
                ></div>
                
                {/* Progress Indicators */}
                <div 
                  className="absolute w-4 h-4 bg-green-400 rounded-full"
                  style={{ 
                    top: `${50 - 50 * Math.cos((todayStats.steps / 5000) * Math.PI * 2)}%`, 
                    left: `${50 + 50 * Math.sin((todayStats.steps / 5000) * Math.PI * 2)}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                ></div>
                
                <div 
                  className="absolute w-4 h-4 bg-yellow-400 rounded-full"
                  style={{ 
                    top: `${50 - 40 * Math.cos((todayStats.distance / 5) * Math.PI * 2)}%`, 
                    left: `${50 + 40 * Math.sin((todayStats.distance / 5) * Math.PI * 2)}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                ></div>
                
                <div 
                  className="absolute w-4 h-4 bg-red-400 rounded-full"
                  style={{ 
                    top: `${50 - 30 * Math.cos((todayStats.calories / 200) * Math.PI * 2)}%`, 
                    left: `${50 + 30 * Math.sin((todayStats.calories / 200) * Math.PI * 2)}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Schedule */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg  text-gray-700">Daily Workout Schedule</h2>
            <button 
              onClick={() => setActiveView('schedule')}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg"
            >
              Check
            </button>
          </div>
        </div>

        {/* Difficulty Selection */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <h2 className="font-bold text-lg mb-4  text-gray-700">Select Difficulty</h2>
          <div className="flex gap-4">
            {workoutData.map((level) => (
              <button
                key={level.level}
                onClick={() => handleLevelChange(level.level)}
                className={`flex-1 py-2 px-4 rounded-lg ${
                  selectedLevel === level.level
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {level.level}
              </button>
            ))}
          </div>
        </div>

        {/* Workouts */}
        <div>
          <h2 className="font-bold text-lg mb-4  text-gray-700">Available Workouts</h2>
          <div className="grid gap-4  text-gray-700">
            {workoutData
              .find(level => level.level === selectedLevel)
              ?.workouts.map((workout, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl p-4 cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => handleWorkoutClick(workout)}
                >
                  <div className="flex gap-4">
                    <img 
                      src={Object.values(workout.exercises)[0][0].image}
                      alt={workout.type}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold mb-2">{workout.type}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {workout.bodyParts.length} Body Parts
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedLevel} Level
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workout;