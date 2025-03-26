import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  FaDumbbell, 
  FaRunning, 
  FaHeart, 
  FaCalendar, 
  FaClock, 
  FaArrowRight,
  FaCheckCircle,
  FaExclamationCircle,
  FaPlay
} from 'react-icons/fa';
import { BiBody } from 'react-icons/bi';
import { GiMuscleUp, GiWeightLiftingUp } from 'react-icons/gi';

// Replace with your actual RapidAPI key
const RAPID_API_KEY = '86d65703acmsh5d6bf9aed0cd27ap130e1fjsnc90c8e3c550d';

const API_BASE_URL = 'http://localhost:4000';

// Sample workout data
const sampleWorkouts = [
  {
    name: 'Beginner Weight Loss Program',
    description: 'A perfect starting point for your fitness journey',
    difficulty: 'beginner',
    goal: 'weightLoss',
    daysPerWeek: 3,
    workouts: [
      {
        day: 1,
        exercises: [
          {
            name: 'Walking',
            sets: 1,
            reps: '30 minutes',
            restTime: '0',
            instructions: 'Maintain a brisk pace',
            equipment: 'none',
            target: 'cardio'
          },
          {
            name: 'Bodyweight Squats',
            sets: 3,
            reps: '10',
            restTime: '60 seconds',
            instructions: 'Keep your back straight and go as low as comfortable',
            equipment: 'bodyweight',
            target: 'legs'
          }
        ]
      }
    ]
  },
  {
    name: 'Intermediate Strength Training',
    description: 'Build muscle and increase strength',
    difficulty: 'intermediate',
    goal: 'muscleGain',
    daysPerWeek: 4,
    workouts: [
      {
        day: 1,
        exercises: [
          {
            name: 'Bench Press',
            sets: 4,
            reps: '8-10',
            restTime: '90 seconds',
            instructions: 'Keep proper form throughout the movement',
            equipment: 'barbell',
            target: 'chest'
          },
          {
            name: 'Deadlifts',
            sets: 3,
            reps: '8',
            restTime: '120 seconds',
            instructions: 'Maintain a straight back and engage your core',
            equipment: 'barbell',
            target: 'back'
          }
        ]
      }
    ]
  },
  {
    name: 'Advanced HIIT Program',
    description: 'High-intensity interval training for maximum results',
    difficulty: 'advanced',
    goal: 'endurance',
    daysPerWeek: 5,
    workouts: [
      {
        day: 1,
        exercises: [
          {
            name: 'Burpees',
            sets: 5,
            reps: '20',
            restTime: '30 seconds',
            instructions: 'Perform as quickly as possible while maintaining form',
            equipment: 'bodyweight',
            target: 'full body'
          },
          {
            name: 'Mountain Climbers',
            sets: 5,
            reps: '30 seconds',
            restTime: '30 seconds',
            instructions: 'Keep a steady pace and engage your core',
            equipment: 'bodyweight',
            target: 'core'
          }
        ]
      }
    ]
  }
];

const Workout = () => {
  const [workoutPlans, setWorkoutPlans] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [userPreferences, setUserPreferences] = useState({
    fitnessLevel: 'beginner',
    goal: 'weightLoss',
    daysPerWeek: 3,
    bodyPart: 'all'
  });

  // Define valid body parts according to API requirements
  const validBodyParts = [
    'back',
    'cardio',
    'chest',
    'lower arms',
    'lower legs',
    'neck',
    'shoulders',
    'upper arms',
    'upper legs',
    'waist'
  ];

  const fetchExercisesByBodyPart = async (bodyPart) => {
    try {
      // Validate body part
      if (!validBodyParts.includes(bodyPart)) {
        console.warn(`Invalid body part: ${bodyPart}`);
        return [];
      }

      const options = {
        method: 'GET',
        url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
        headers: {
          'X-RapidAPI-Key': RAPID_API_KEY,
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
          'Accept': 'application/json'
        }
      };

      console.log(`Fetching exercises for ${bodyPart}...`);
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(`Error fetching exercises for ${bodyPart}:`, error);
      return [];
    }
  };

  const generateWorkoutPlan = async () => {
    try {
      setLoading(true);
      
      // Use correct body parts
      const selectedBodyParts = [
        'back',
        'chest',
        'shoulders',
        'upper legs',
        'upper arms',
        'waist'
      ];

      let allExercises = [];

      // Fetch exercises for each body part
      for (const bodyPart of selectedBodyParts) {
        const exercises = await fetchExercisesByBodyPart(bodyPart);
        if (exercises.length > 0) {
          allExercises = [...allExercises, ...exercises];
        }
      }

      // If no exercises fetched, use default exercises
      if (allExercises.length === 0) {
        console.log('Using default exercises as fallback');
        allExercises = defaultExercises[userPreferences.goal] || defaultExercises.weightLoss;
      }

      // Define exercise counts based on fitness level
      const exercisesPerWorkout = {
        beginner: 4,
        intermediate: 6,
        advanced: 8
      };

      // Define sets and reps based on goal
      const workoutConfig = {
        weightLoss: { sets: 3, reps: '15-20', rest: '30 seconds' },
        muscleGain: { sets: 4, reps: '8-12', rest: '90 seconds' },
        endurance: { sets: 3, reps: '12-15', rest: '45 seconds' },
        strength: { sets: 5, reps: '4-6', rest: '120 seconds' }
      };

      const config = workoutConfig[userPreferences.goal];
      const exerciseCount = exercisesPerWorkout[userPreferences.fitnessLevel];

      // Create workout plan
      const workoutPlan = {
        name: `${userPreferences.fitnessLevel.charAt(0).toUpperCase() + userPreferences.fitnessLevel.slice(1)} ${userPreferences.goal} Plan`,
        description: `Custom ${userPreferences.daysPerWeek}-day workout plan for ${userPreferences.goal}`,
        difficulty: userPreferences.fitnessLevel,
        goal: userPreferences.goal,
        daysPerWeek: userPreferences.daysPerWeek,
        workouts: []
      };

      // Generate workouts for each day
      for (let day = 1; day <= userPreferences.daysPerWeek; day++) {
        const shuffledExercises = [...allExercises]
          .sort(() => Math.random() - 0.5)
          .slice(0, exerciseCount)
          .map(exercise => ({
            name: exercise.name,
            sets: config.sets,
            reps: config.reps,
            restTime: config.rest,
            equipment: exercise.equipment,
            target: exercise.target,
            bodyPart: exercise.bodyPart,
            gifUrl: exercise.gifUrl,
            instructions: exercise.instructions || `Perform ${exercise.name} with proper form`
          }));

        workoutPlan.workouts.push({
          day,
          exercises: shuffledExercises
        });
      }

      setWorkoutPlans(workoutPlan);
      setError(null);
    } catch (error) {
      console.error('Error generating workout plan:', error);
      setError('Failed to generate workout plan');
    } finally {
      setLoading(false);
    }
  };

  // Add a new state to track if a plan has been generated
  const [isPlanGenerated, setIsPlanGenerated] = useState(false);

  // Modify the handlePreferencesChange to not trigger plan generation
  const handlePreferencesChange = (field, value) => {
    setUserPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Add a new function to handle plan generation
  const handleGeneratePlan = () => {
    setIsPlanGenerated(true);
    generateWorkoutPlan();
  };

  const getGoalIcon = (goal) => {
    switch (goal) {
      case 'weightLoss':
        return <FaRunning className="text-2xl" />;
      case 'muscleGain':
        return <GiMuscleUp className="text-2xl" />;
      case 'endurance':
        return <FaHeart className="text-2xl" />;
      case 'strength':
        return <GiWeightLiftingUp className="text-2xl" />;
      default:
        return <FaDumbbell className="text-2xl" />;
    }
  };

  // Add this modal component for exercise details
  const ExerciseModal = ({ exercise, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative bg-gray-800 rounded-xl max-w-4xl w-full p-6 my-8">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl transition-colors"
        >
          ×
        </button>

        <div className="max-h-[90vh] overflow-y-auto pr-2 custom-scrollbar">
          {/* Exercise Title */}
          <h3 className="text-3xl font-bold mb-6 text-gradient">{exercise.name}</h3>

          {/* Exercise GIF and Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* GIF Section */}
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              {exercise.gifUrl ? (
                <img 
                  src={exercise.gifUrl} 
                  alt={exercise.name}
                  className="w-full h-auto object-contain rounded-lg"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.parentElement.innerHTML = `
                      <div class="flex items-center justify-center h-64 bg-gray-900">
                        <FaDumbbell className="text-6xl text-gray-600" />
                      </div>
                    `;
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-64">
                  <FaDumbbell className="text-6xl text-gray-600" />
                </div>
              )}
            </div>

            {/* Exercise Details */}
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-emerald-400 text-sm font-medium mb-1">Sets</p>
                  <p className="text-2xl font-bold">{exercise.sets}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-emerald-400 text-sm font-medium mb-1">Reps</p>
                  <p className="text-2xl font-bold">{exercise.reps}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-emerald-400 text-sm font-medium mb-1">Rest</p>
                  <p className="text-2xl font-bold">{exercise.restTime}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-emerald-400 text-sm font-medium mb-1">Target</p>
                  <p className="text-2xl font-bold">{exercise.target}</p>
                </div>
              </div>

              {/* Equipment and Body Part */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center mb-4">
                  <FaDumbbell className="text-emerald-400 mr-2" />
                  <p className="text-gray-300">
                    <span className="font-medium">Equipment:</span> {exercise.equipment}
                  </p>
                </div>
                <div className="flex items-center">
                  <BiBody className="text-emerald-400 mr-2" />
                  <p className="text-gray-300">
                    <span className="font-medium">Body Part:</span> {exercise.bodyPart}
                  </p>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-emerald-400 font-medium mb-2">Instructions</h4>
                <p className="text-gray-300">{exercise.instructions}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Update the exercise card in your existing JSX
  const ExerciseCard = ({ exercise }) => (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
    >
      {/* Exercise Image */}
      <div className="relative aspect-w-16 aspect-h-9 bg-gray-900">
        {exercise.gifUrl ? (
          <img 
            src={exercise.gifUrl} 
            alt={exercise.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.parentElement.innerHTML = `
                <div class="flex items-center justify-center h-full">
                  <FaDumbbell className="text-4xl text-gray-600" />
                </div>
              `;
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <FaDumbbell className="text-4xl text-gray-600" />
          </div>
        )}
        <button
          onClick={() => setSelectedExercise(exercise)}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300"
        >
          <FaPlay className="text-white text-4xl" />
        </button>
      </div>

      {/* Exercise Details */}
      <div className="p-6">
        <h4 className="text-xl font-semibold mb-4 text-gradient">{exercise.name}</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center text-gray-300">
              <GiMuscleUp className="mr-2 text-emerald-400" />
              {exercise.sets} sets × {exercise.reps}
            </span>
            <span className="text-emerald-400">{exercise.target}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center text-gray-300">
              <FaClock className="mr-2 text-emerald-400" />
              Rest: {exercise.restTime}
            </span>
            <span className="text-emerald-400">{exercise.equipment}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Add equipment selection to your preferences section
  const equipmentOptions = [
    'bodyweight',
    'dumbbell',
    'barbell',
    'cable',
    'machine',
    'bands'
  ];

  // Add these styles to your global CSS or Tailwind config
  const styles = `
    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: #10B981 #1F2937;
    }

    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }

    .custom-scrollbar::-webkit-scrollbar-track {
      background: #1F2937;
      border-radius: 3px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: #10B981;
      border-radius: 3px;
    }

    .text-gradient {
      background: linear-gradient(to right, #10B981, #3B82F6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
              Personalized Workout Plans
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transform your fitness journey with AI-powered workout plans tailored to your goals
            </p>
          </motion.div>
        </div>
      </div>

      {/* Preference Selection */}
      <div className="container mx-auto px-4 mb-12">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700">
          <h2 className="text-2xl font-semibold mb-8 flex items-center">
            <BiBody className="mr-2 text-3xl text-emerald-400" />
            Customize Your Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="block text-gray-300 mb-2 flex items-center">
                <GiMuscleUp className="mr-2" />
                Fitness Level
              </label>
              <select 
                className="w-full bg-gray-700 rounded-lg p-3 border border-gray-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 transition-all"
                value={userPreferences.fitnessLevel}
                onChange={(e) => handlePreferencesChange('fitnessLevel', e.target.value)}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-gray-300 mb-2 flex items-center">
                <FaHeart className="mr-2" />
                Goal
              </label>
              <select 
                className="w-full bg-gray-700 rounded-lg p-3 border border-gray-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 transition-all"
                value={userPreferences.goal}
                onChange={(e) => handlePreferencesChange('goal', e.target.value)}
              >
                <option value="weightLoss">Weight Loss</option>
                <option value="muscleGain">Muscle Gain</option>
                <option value="endurance">Endurance</option>
                <option value="strength">Strength</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-gray-300 mb-2 flex items-center">
                <FaCalendar className="mr-2" />
                Days per Week
              </label>
              <select 
                className="w-full bg-gray-700 rounded-lg p-3 border border-gray-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 transition-all"
                value={userPreferences.daysPerWeek}
                onChange={(e) => handlePreferencesChange('daysPerWeek', parseInt(e.target.value))}
              >
                {[2,3,4,5,6].map(num => (
                  <option key={num} value={num}>{num} days</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-gray-300 mb-2 flex items-center">
                <FaDumbbell className="mr-2" />
                Equipment
              </label>
              <select 
                className="w-full bg-gray-700 rounded-lg p-3 border border-gray-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 transition-all"
                value={userPreferences.equipment}
                onChange={(e) => handlePreferencesChange('equipment', e.target.value)}
              >
                {equipmentOptions.map(option => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Add Generate Plan Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleGeneratePlan}
              className="bg-emerald-500 hover:bg-emerald-600 px-8 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 text-lg font-semibold"
            >
              <FaDumbbell className="text-xl" />
              Generate Workout Plan
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-gray-300">Generating your personalized workout plan...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <FaExclamationCircle className="text-4xl text-red-400 mx-auto mb-4" />
            <p className="text-red-400">{error}</p>
            <button 
              onClick={handleGeneratePlan}
              className="mt-4 bg-emerald-500 hover:bg-emerald-600 px-6 py-2 rounded-lg transition-colors duration-200 flex items-center mx-auto"
            >
              <FaArrowRight className="mr-2" />
              Try Again
            </button>
          </div>
        )}

        {/* Initial State - Before Plan Generation */}
        {!isPlanGenerated && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-300 text-lg">
              Customize your preferences and click "Generate Workout Plan" to create your personalized fitness program.
            </p>
          </div>
        )}

        {/* Workout Plans Display */}
        {!loading && !error && workoutPlans && isPlanGenerated && (
          <div className="space-y-12">
            {workoutPlans.workouts.map((workout, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <FaCalendar className="mr-2 text-emerald-400" />
                  Day {workout.day}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {workout.exercises.map((exercise, exIndex) => (
                    <ExerciseCard key={exIndex} exercise={exercise} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Exercise Modal */}
      {selectedExercise && (
        <ExerciseModal 
          exercise={selectedExercise} 
          onClose={() => setSelectedExercise(null)} 
        />
      )}

      <style>{styles}</style>
    </div>
  );
};

// Default exercises object for fallback
const defaultExercises = {
  weightLoss: [
    {
      name: "Jumping Jacks",
      gifUrl: "https://v2.exercisedb.io/image/Rkd0hbPl0Aa-rp",
      equipment: "body weight",
      target: "cardiovascular system",
      bodyPart: "cardio",
      instructions: "Jump while raising arms and spreading legs"
    },
    // ... more default exercises ...
  ],
  // ... other categories ...
};

export default Workout;