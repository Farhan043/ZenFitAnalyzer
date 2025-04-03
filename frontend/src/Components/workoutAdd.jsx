import React, { useState, useEffect } from 'react';
import { format, subDays, startOfWeek, addDays } from 'date-fns';
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
  Dumbbell,
  History,
  CheckCircle2,
  Calendar as CalendarIcon
} from 'lucide-react';
import { workoutData } from '../../src/assets/workoutData';
import { motion } from 'framer-motion';
import axios from 'axios';

// Constants
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const muscleGroups = ['Chest', 'Shoulders', 'Back', 'Legs', 'Biceps', 'Triceps'];
const progressData = {
  progress: [85, 70, 75, 80, 65, 60],
  goal: [100, 100, 100, 100, 100, 100]
};

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

const WorkoutLineChart = ({ data, size = 600, height = 300 }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const metrics = [
    { key: 'calories', color: 'rgba(147, 51, 234, 1)', label: 'Calories' },
    { key: 'bodyParts', color: 'rgba(59, 130, 246, 1)', label: 'Body Parts' },
    { key: 'duration', color: 'rgba(239, 68, 68, 1)', label: 'Duration (min)' }
  ];

  const maxValue = Math.max(...Object.values(data).flatMap(day => 
    metrics.map(metric => day[metric.key] || 0)
  )) || 2000; // Set minimum max value to 2000 for better visualization

  const padding = 40;
  const chartWidth = size - (padding * 2);
  const chartHeight = height - (padding * 2);
  const stepX = chartWidth / (days.length - 1);
  const stepY = chartHeight / maxValue;

  const createPath = (metric) => {
    return days.map((day, i) => {
      const value = data[day]?.[metric.key] || 0;
      const x = padding + (i * stepX);
      const y = height - padding - (value * stepY);
      return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
    }).join(' ');
  };

  const [hoveredPoint, setHoveredPoint] = useState(null);

        return (
    <div className="relative">
      <h2 className="text-xl font-bold mb-4">Workout Progress</h2>
      <div className="absolute right-0 top-0">
        <button className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm">
          Weekly
        </button>
      </div>
      <svg width={size} height={height} className="mt-4">
        {/* Grid lines */}
        {Array.from({ length: 5 }).map((_, i) => {
          const y = padding + (i * (chartHeight / 4));
          const value = Math.round(maxValue - (i * (maxValue / 4)));
          return (
            <g key={i}>
          <line
                x1={padding}
                y1={y}
                x2={size - padding}
                y2={y}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
              <text
                x={padding - 10}
                y={y}
                textAnchor="end"
                alignmentBaseline="middle"
                className="text-xs fill-gray-400"
              >
                {value}
              </text>
            </g>
        );
      })}

        {/* Days */}
        {days.map((day, i) => (
          <text
            key={day}
            x={padding + (i * stepX)}
            y={height - padding + 20}
            textAnchor="middle"
            className="text-xs fill-gray-400"
          >
            {day}
          </text>
        ))}

        {/* Data lines */}
        {metrics.map(metric => (
      <path
            key={metric.key}
            d={createPath(metric)}
            fill="none"
            stroke={metric.color}
        strokeWidth="2"
          />
        ))}

        {/* Data points with hover */}
        {metrics.map(metric => 
          days.map((day, i) => {
            const value = data[day]?.[metric.key] || 0;
            if (value > 0) {
              const x = padding + (i * stepX);
              const y = height - padding - (value * stepY);
        return (
                <g key={`${metric.key}-${day}`}>
                  <circle
                    cx={x}
                    cy={y}
                    r="4"
                    fill={metric.color}
                    stroke="rgb(30, 41, 59)"
                    strokeWidth="2"
                    onMouseEnter={() => setHoveredPoint({ x, y, value, metric, day })}
                    onMouseLeave={() => setHoveredPoint(null)}
                    className="cursor-pointer"
                  />
                </g>
              );
            }
            return null;
          })
        )}

        {/* Hover tooltip */}
        {hoveredPoint && (
          <g transform={`translate(${hoveredPoint.x + 10}, ${hoveredPoint.y - 10})`}>
            <rect
              x="0"
              y="-30"
              width="120"
              height="40"
              rx="5"
              fill="rgb(30, 41, 59)"
              className="opacity-90"
            />
          <text
              x="10"
              y="-15"
              className="text-xs fill-gray-200"
            >
              {hoveredPoint.day}
          </text>
            <text
              x="10"
              y="-2"
              className="text-xs fill-white"
            >
              {hoveredPoint.metric.label}: {hoveredPoint.value}
            </text>
          </g>
        )}
    </svg>

      {/* Legend */}
      <div className="flex gap-6 justify-center mt-4">
        {metrics.map(metric => (
          <div key={metric.key} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: metric.color }} />
            <span className="text-sm text-gray-400">{metric.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ScheduleView = ({ workoutHistory, onClose }) => {
  const pastWeek = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i);
    const workouts = workoutHistory.filter(w => w.date === format(date, 'yyyy-MM-dd'));
    return {
      date,
      workouts
    };
  }).reverse();

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-3xl p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Past Week Workouts</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          {pastWeek.map(({ date, workouts }) => (
            <div key={format(date, 'yyyy-MM-dd')} className="p-4 rounded-xl bg-gray-700/50">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm text-gray-400">{format(date, 'EEEE')}</p>
                  <p className="font-semibold">{format(date, 'MMM dd, yyyy')}</p>
                </div>
                {workouts.length > 0 && (
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{workouts.length} workout{workouts.length > 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
              
              {workouts.map((workout, idx) => (
                <div key={idx} className="mt-2 p-3 bg-gray-700 rounded-lg">
                  <p className="font-medium">{workout.workout} - {workout.bodyPart}</p>
                  <div className="flex gap-4 mt-1 text-sm text-gray-400">
                    <span>{workout.exercises} exercises</span>
                    <span>{workout.duration} min</span>
                    <span>{workout.calories} kcal</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const WorkoutScheduleCard = ({ onClose }) => {
  const [schedule, setSchedule] = useState({
    Sun: [],
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: []
  });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-3xl p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Workout Schedule</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          {days.map(day => (
            <div key={day} className="p-4 rounded-xl bg-gray-700/50">
              <h3 className="font-semibold mb-2">{day}</h3>
              <div className="space-y-2">
                {schedule[day].map((workout, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-700 rounded-lg">
                    <span>{workout.name}</span>
                    <button onClick={() => {
                      setSchedule(prev => ({
                        ...prev,
                        [day]: prev[day].filter((_, i) => i !== idx)
                      }));
                    }} className="text-red-400 hover:text-red-300">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => {
                    // Add workout selection logic here
                  }}
                  className="w-full p-2 text-center bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Add Workout
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CurrentExerciseCard = ({ exercise, onClose, onComplete }) => {
  const [timer, setTimer] = useState(exercise.duration);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval;
    if (!isPaused && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused, timer]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-3xl p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Current Exercise</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">{exercise.name}</h3>
          <div className="text-4xl font-mono mb-6">
            {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-3 bg-blue-600 rounded-full hover:bg-blue-700"
            >
              {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
            </button>
            <button
              onClick={onComplete}
              className="p-3 bg-green-600 rounded-full hover:bg-green-700"
            >
              <CheckCircle2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryMetrics = ({ weeklyData, workoutHistory = [] }) => {
  // Ensure workoutHistory is an array
  const workouts = Array.isArray(workoutHistory) ? workoutHistory : [];
  
  // Calculate metrics for the current week
  const startOfWeek = new Date();
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  // Calculate metrics for the previous week
  const startOfLastWeek = new Date(startOfWeek);
  startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);

  const currentWeekWorkouts = workouts.filter(workout => {
    const workoutDate = new Date(workout.date);
    return workoutDate >= startOfWeek;
  });

  const lastWeekWorkouts = workouts.filter(workout => {
    const workoutDate = new Date(workout.date);
    return workoutDate >= startOfLastWeek && workoutDate < startOfWeek;
  });

  const totalCalories = currentWeekWorkouts.reduce((sum, workout) => sum + (workout.calories || 0), 0);
  const totalWorkouts = currentWeekWorkouts.length;
  const totalDuration = currentWeekWorkouts.reduce((sum, workout) => sum + (workout.duration || 0), 0);
  const avgDuration = totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0;

  // Calculate progress
  const lastWeekCalories = lastWeekWorkouts.reduce((sum, workout) => sum + (workout.calories || 0), 0);
  const progress = lastWeekCalories > 0 
    ? Math.round(((totalCalories - lastWeekCalories) / lastWeekCalories) * 100)
    : 0;

  return (
    <div className="bg-gray-800 rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-6">Summary Metrics</h2>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-700/50 rounded-xl p-4"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Total Calories Burned</span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-2xl font-bold text-purple-400"
            >
              {totalCalories}
            </motion.span>
          </div>
          <div className="h-1 bg-gray-600 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-purple-400"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-700/50 rounded-xl p-4"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Average Workout Duration</span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="text-2xl font-bold text-blue-400"
            >
              {avgDuration} min
            </motion.span>
          </div>
          <div className="h-1 bg-gray-600 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: 0.7 }}
              className="h-full bg-blue-400"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-700/50 rounded-xl p-4"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Total Workouts Completed</span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="text-2xl font-bold text-green-400"
            >
              {totalWorkouts}
            </motion.span>
          </div>
          <div className="h-1 bg-gray-600 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: 0.9 }}
              className="h-full bg-green-400"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gray-700/50 rounded-xl p-4"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Progress vs Last Week</span>
            <div className="flex items-center gap-2">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="text-2xl font-bold text-orange-400"
              >
                {progress > 0 ? '+' : ''}{progress}%
              </motion.span>
              <motion.div
                initial={{ rotate: -90 }}
                animate={{ rotate: 0 }}
                transition={{ delay: 1, type: "spring" }}
                className="text-orange-400"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.div>
            </div>
          </div>
          <div className="h-1 bg-gray-600 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.abs(progress)}%` }}
              transition={{ duration: 1, delay: 1.1 }}
              className={`h-full ${progress >= 0 ? 'bg-orange-400' : 'bg-red-400'}`}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const DailyWorkoutSchedule = ({ onClose }) => {
  const [schedule, setSchedule] = useState({
    Sun: [],
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: []
  });

  const [selectedDay, setSelectedDay] = useState(null);
  const [workoutList] = useState([
    { id: 1, name: 'Full Body Workout', duration: 45, intensity: 'Medium' },
    { id: 2, name: 'Upper Body Focus', duration: 30, intensity: 'High' },
    { id: 3, name: 'Lower Body Power', duration: 40, intensity: 'High' },
    { id: 4, name: 'Core Strength', duration: 25, intensity: 'Medium' },
    { id: 5, name: 'Cardio Blast', duration: 35, intensity: 'High' },
    { id: 6, name: 'Recovery & Stretch', duration: 30, intensity: 'Low' }
  ]);

  const addWorkout = (day, workout) => {
    setSchedule(prev => ({
      ...prev,
      [day]: [...prev[day], workout]
    }));
  };

  const removeWorkout = (day, workoutId) => {
    setSchedule(prev => ({
      ...prev,
      [day]: prev[day].filter(w => w.id !== workoutId)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex">
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ type: "spring", damping: 30 }}
        className="ml-auto w-full max-w-2xl h-full bg-gray-900 overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Weekly Workout Schedule</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              Done
            </button>
          </div>

          <div className="grid gap-6">
            {days.map(day => (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: days.indexOf(day) * 0.1 }}
                className="bg-gray-800 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{day}</h3>
                  <button
                    onClick={() => setSelectedDay(selectedDay === day ? null : day)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm"
                  >
                    Add Workout
                  </button>
                </div>

                {schedule[day].length > 0 ? (
                  <div className="space-y-3">
                    {schedule[day].map(workout => (
                      <motion.div
                        key={workout.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between bg-gray-700 p-3 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{workout.name}</p>
                          <p className="text-sm text-gray-400">
                            {workout.duration} min • {workout.intensity}
                          </p>
                        </div>
                        <button
                          onClick={() => removeWorkout(day, workout.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No workouts scheduled</p>
                )}

                {selectedDay === day && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-4 space-y-2"
                  >
                    {workoutList.map(workout => (
                      <button
                        key={workout.id}
                        onClick={() => {
                          addWorkout(day, workout);
                          setSelectedDay(null);
                        }}
                        className="w-full text-left bg-gray-700 hover:bg-gray-600 p-3 rounded-lg transition-colors"
                      >
                        <p className="font-medium">{workout.name}</p>
                        <p className="text-sm text-gray-400">
                          {workout.duration} min • {workout.intensity}
                        </p>
                      </button>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
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
  const [showHistory, setShowHistory] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [workoutComplete, setWorkoutComplete] = useState(false);
  const [hoverStats, setHoverStats] = useState(null);
  const [todayStats, setTodayStats] = useState({ 
    calories: 0, 
    duration: 0, 
    workouts: 0, 
    steps: 2500, 
    distance: 3.2 
  });
  const [showScheduleCard, setShowScheduleCard] = useState(false);
  const [showExerciseCard, setShowExerciseCard] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [weeklyData, setWeeklyData] = useState(() => {
    const startDay = startOfWeek(new Date());
    return days.reduce((acc, day, index) => {
      const date = addDays(startDay, index);
      acc[day] = {
        calories: 0,
        bodyParts: 0,
        duration: 0
      };
      return acc;
    }, {});
  });

  // Load workout history and stats from API
  useEffect(() => {
    const fetchWorkoutData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/workout/history', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Ensure we're setting an array
        const workouts = Array.isArray(response.data) ? response.data : 
                        Array.isArray(response.data.workouts) ? response.data.workouts : [];
        
        setWorkoutHistory(workouts);
        
        // Calculate today's stats from workout history
        const today = format(new Date(), 'yyyy-MM-dd');
        const todayWorkouts = workouts.filter(w => w.date === today);
        
        const newTodayStats = {
          calories: todayWorkouts.reduce((sum, w) => sum + (w.calories || 0), 0),
          duration: todayWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0),
          workouts: todayWorkouts.length,
          steps: 2500, // Default value
          distance: 3.2 // Default value
        };
        
        setTodayStats(newTodayStats);
      } catch (error) {
        console.error('Error fetching workout data:', error);
        // Set default empty array if fetch fails
        setWorkoutHistory([]);
      }
    };
    fetchWorkoutData();
  }, []);

  // Save workout history and stats to API
  useEffect(() => {
    const saveWorkoutData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (workoutHistory.length > 0) {
          const lastWorkout = workoutHistory[workoutHistory.length - 1];
          await axios.post('/api/workout/save', lastWorkout, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          await axios.post('/api/workout/stats', { stats: todayStats }, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }
      } catch (error) {
        console.error('Error saving workout data:', error);
      }
    };
    if (workoutHistory.length > 0) {
      saveWorkoutData();
    }
  }, [workoutHistory, todayStats]);

  // Timer effect with beep sound
  useEffect(() => {
    let interval;
    if (isExercising && !isPaused && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            const { oscillator, gainNode, audioContext } = createBeepSound();
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
            
            setTimeout(() => {
              gainNode.disconnect();
              oscillator.disconnect();
              audioContext.close();
            }, 200);

            setIsPaused(true); // Pause after exercise completion
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isExercising, isPaused, timer]);

  // Update weekly data when workout history changes
  useEffect(() => {
    const startDay = startOfWeek(new Date());
    const newWeeklyData = { ...weeklyData };

    workoutHistory.forEach(workout => {
      const workoutDate = new Date(workout.date);
      if (workoutDate >= startDay) {
        const dayIndex = workoutDate.getDay();
        const day = days[dayIndex];
        newWeeklyData[day] = {
          calories: (newWeeklyData[day]?.calories || 0) + workout.calories,
          bodyParts: (newWeeklyData[day]?.bodyParts || 0) + 1,
          duration: (newWeeklyData[day]?.duration || 0) + workout.duration
        };
      }
    });

    setWeeklyData(newWeeklyData);
  }, [workoutHistory]);

  const handleStartWorkout = () => {
    if (!selectedBodyPart || !selectedWorkout) return;
    
    const exercises = selectedWorkout.exercises[selectedBodyPart];
    if (!exercises || exercises.length === 0) return;
    
    setIsExercising(true);
    setCurrentExerciseIndex(0);
    setTimer(exercises[0].time);
    setWorkoutComplete(false);
    setIsPaused(false);
  };

  const handleNextExercise = () => {
    if (!selectedBodyPart || !selectedWorkout) return;

    const exercises = selectedWorkout.exercises[selectedBodyPart];
    let nextIndex = currentExerciseIndex + 1;

    if (nextIndex >= exercises.length) {
      setIsExercising(false);
      setWorkoutComplete(true);
      const today = format(new Date(), 'yyyy-MM-dd');
      
      const totalDuration = calculateWorkoutDuration(exercises);
      const totalCalories = calculateCalories(exercises);

      const newHistory = [...workoutHistory, {
        date: today,
        workout: selectedWorkout.type,
        bodyPart: selectedBodyPart,
        level: selectedLevel,
        exercises: exercises.length,
        calories: Math.round(totalCalories),
        duration: Math.round(totalDuration)
      }];
      
      setTodayStats(prev => ({
        ...prev,
        calories: prev.calories + Math.round(totalCalories),
        duration: prev.duration + Math.round(totalDuration),
        workouts: prev.workouts + 1
      }));

      setWorkoutHistory(newHistory);
    } else {
      setCurrentExerciseIndex(nextIndex);
      setTimer(exercises[nextIndex].time);
      setIsPaused(false);
    }
  };

  const getCurrentExercise = () => {
    if (!selectedBodyPart || !selectedWorkout) return null;
    const exercises = selectedWorkout.exercises[selectedBodyPart];
    return exercises[currentExerciseIndex];
  };

  const formatTime = (seconds) => {
    if (typeof seconds === 'string') {
      seconds = parseInt(seconds);
    }
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

  // Update the timer calculation
  const calculateWorkoutDuration = (exercises) => {
    return exercises.reduce((total, exercise) => {
      const duration = typeof exercise.time === 'string' ? parseInt(exercise.time) : exercise.time;
      return total + duration;
    }, 0) / 60; // Convert to minutes
  };

  // Update calories calculation with more accurate values
  const calculateCalories = (exercises) => {
    const caloriesPerMinute = {
      'Beginner': {
        'Chest': 4,
        'Shoulders': 3,
        'Back': 5,
        'Legs': 6,
        'Biceps': 3,
        'Triceps': 3
      },
      'Intermediate': {
        'Chest': 6,
        'Shoulders': 4,
        'Back': 7,
        'Legs': 9,
        'Biceps': 4,
        'Triceps': 4
      },
      'Advanced': {
        'Chest': 8,
        'Shoulders': 6,
        'Back': 9,
        'Legs': 12,
        'Biceps': 5,
        'Triceps': 5
      }
    };

    return exercises.reduce((total, exercise) => {
      const duration = (typeof exercise.time === 'string' ? parseInt(exercise.time) : exercise.time) / 60; // Convert to minutes
      return total + (duration * caloriesPerMinute[selectedLevel][selectedBodyPart]);
    }, 0);
  };

  if (showHistory) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => setShowHistory(false)}
              className="p-2 rounded-lg bg-gray-800"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold">Workout History</h1>
            <div className="w-10"></div>
          </div>

          <div className="space-y-4">
            {workoutHistory.map((workout, index) => (
              <div 
                key={index}
                className="bg-gray-800 rounded-xl p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{workout.workout}</h3>
                    <p className="text-gray-400">{workout.bodyPart} • {workout.level}</p>
                  </div>
                  <p className="text-gray-400">{format(new Date(workout.date), 'MMM dd, yyyy')}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-gray-400 text-sm">Exercises</p>
                    <p className="text-xl font-bold">{workout.exercises}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Duration</p>
                    <p className="text-xl font-bold">{workout.duration} min</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Calories</p>
                    <p className="text-xl font-bold">{workout.calories} kcal</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'bodyParts' && selectedWorkout) {
    return (
      <div className="min-h-screen bg-blue-100 text-gray-700">
        <div className="max-w-7xl mx-auto p-6">
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setActiveView('main')}
                className="p-2 rounded-lg bg-blue-100"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-bold">{selectedWorkout.type}</h2>
              <div className="w-10"></div>
            </div>
            
            <div className="grid gap-4">
              {selectedWorkout.bodyParts.map((bodyPart, index) => (
                <button
                  key={index}
                  onClick={() => handleBodyPartClick(bodyPart)}
                  className="bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Dumbbell className="w-6 h-6 text-blue-500" />
                      <span className="font-semibold">{bodyPart}</span>
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
              className="absolute top-4 right-4 p-2 rounded-full bg-white/30 backdrop-blur-sm"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">{selectedExercise.name}</h2>
            <p className="text-gray-600 mb-6">Time: {selectedExercise.time} seconds</p>
            
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3 text-gray-500">Custom Repetitions</h3>
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
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-80 sm:h-96">
            <img 
              src={exercises[0].image}
              alt={selectedBodyPart}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent">
              <div className="p-6">
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => setActiveView('bodyParts')}
                    className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                  <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                  <Heart className="w-6 h-6 text-white" />
                </button>
                </div>
                <h1 className="text-3xl font-bold text-white mt-4">{selectedBodyPart} Workout</h1>
              </div>
            </div>
          </div>

          {workoutComplete && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-gray-800 rounded-3xl p-8 max-w-md w-full mx-4 text-center">
                <div className="mb-6">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2 text-white">Workout Complete!</h2>
                  <p className="text-gray-400">Great job! You've completed your workout.</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div>
                    <p className="text-gray-400 text-sm">Exercises</p>
                    <p className="text-xl font-bold text-white">{exercises.length}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Duration</p>
                    <p className="text-xl font-bold text-white">{Math.round(exercises.reduce((acc, ex) => acc + (typeof ex.time === 'string' ? parseInt(ex.time) : ex.time), 0) / 60)} min</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Calories</p>
                    <p className="text-xl font-bold text-white">{Math.round(calculateCalories(exercises))}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setWorkoutComplete(false);
                    setActiveView('main');
                  }}
                  className="w-full bg-blue-500 text-white py-4 rounded-xl hover:bg-blue-600 transition-colors"
                >
                  Return to Home
                </button>
              </div>
            </div>
          )}

          {isExercising && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-gray-800 rounded-3xl p-8 max-w-md w-full mx-4">
                <h2 className="text-2xl font-bold mb-4 text-white">Current Exercise</h2>
                <div className="text-center mb-8">
                  <div className="relative w-48 h-48 mx-auto mb-4">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        className="stroke-current text-gray-600"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        className="stroke-current text-blue-500"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={553}
                        strokeDashoffset={553 * (1 - timer / (typeof getCurrentExercise()?.time === 'string' ? parseInt(getCurrentExercise()?.time) : getCurrentExercise()?.time))}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-bold text-white">{timer}</span>
                    </div>
                  </div>
                  <p className="text-xl text-white">{getCurrentExercise()?.name}</p>
                  <p className="text-gray-400">{getCurrentExercise()?.reps} reps</p>
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
                  </button>
                  {timer === 0 && (
                    <button
                      onClick={handleNextExercise}
                      className="bg-green-500 text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-green-600 transition-colors"
                    >
                      <span>Next Exercise</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="p-6">
            <p className="text-gray-400 mb-4">
              {exercises.length} Exercises | {selectedLevel} Level
            </p>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg text-gray-300">Exercises</h2>
                <span className="text-gray-400">{exercises.length} Total</span>
              </div>
              <div className="grid gap-3">
                {exercises.map((exercise, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 bg-gray-800 rounded-xl cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={() => handleExerciseClick(exercise)}
                  >
                    <div className="flex items-center gap-3">
                      <img src={exercise.image} alt={exercise.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <p className="font-medium text-white">{exercise.name}</p>
                        <p className="text-sm text-gray-400">{exercise.reps} reps | {exercise.time} sec</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={handleStartWorkout}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl mt-6 transition-colors"
            >
              {isExercising ? 'Continue Workout' : 'Start Workout'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <button className="p-2 rounded-lg bg-gray-800">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Exercise</h1>
          <button 
            onClick={() => setShowHistory(true)}
            className="p-2 rounded-lg bg-gray-800"
          >
            <History className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
        <div className="bg-gray-800 rounded-2xl p-6 mb-6">
              <WorkoutLineChart data={weeklyData} />
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg">Daily Workout Schedule</h2>
            <button 
              onClick={() => setShowSchedule(true)}
                  className="bg-blue-500 px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
            >
              <CalendarIcon className="w-5 h-5" />
                  <span>Set Schedule</span>
            </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <SummaryMetrics weeklyData={weeklyData} workoutHistory={workoutHistory} />
          </div>
        </div>

        {showSchedule && (
          <DailyWorkoutSchedule 
            onClose={() => setShowSchedule(false)}
          />
        )}

        <div className="bg-gray-800 rounded-2xl p-6 mb-6">
          <h2 className="font-bold text-lg mb-4">Select Difficulty</h2>
          <div className="flex gap-4">
            {workoutData.map((level) => (
              <button
                key={level.level}
                onClick={() => handleLevelChange(level.level)}
                className={`flex-1 py-2 px-4 rounded-lg ${
                  selectedLevel === level.level
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                {level.level}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-4">Available Workouts</h2>
          <div className="grid gap-4">
            {workoutData
              .find(level => level.level === selectedLevel)
              ?.workouts.map((workout, index) => (
                <div 
                  key={index} 
                  className="bg-gray-800 rounded-2xl p-4 cursor-pointer hover:shadow-lg transition-all"
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
                      <p className="text-sm text-gray-400 mb-2">
                        {workout.bodyParts.length} Body Parts
                      </p>
                      <p className="text-sm text-gray-400">
                        {selectedLevel} Level
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {showScheduleCard && (
          <WorkoutScheduleCard onClose={() => setShowScheduleCard(false)} />
        )}
        
        {showExerciseCard && currentExercise && (
          <CurrentExerciseCard
            exercise={currentExercise}
            onClose={() => setShowExerciseCard(false)}
            onComplete={() => {
              // Handle exercise completion
              setShowExerciseCard(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Workout;