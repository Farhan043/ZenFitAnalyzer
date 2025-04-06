import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaDumbbell,
  FaRunning,
  FaHeart,
  FaCalendar,
  FaClock,
  FaArrowRight,
  FaCheckCircle,
  FaExclamationCircle,
  FaPlay,
  FaHistory,
  FaStop,
  FaStopwatch,
  FaTrash,
  FaTrophy,
  FaArrowLeft,
  FaEye,
  FaFire,
  FaBolt,
  FaStar,
  FaShare,
  FaCheck,
  FaTimes,
  FaChartLine,
  FaMedal,
  FaHeartbeat,
  FaFireAlt,
  FaBook,
  FaSync,
  FaRandom,
  FaUsers,
  FaBalanceScale,
  FaBone,
  FaShieldAlt,
  FaWeight,
  FaBrain,
  FaBed,
  FaCircle,
  FaList,
  FaMoon,
  FaAppleAlt,
  FaChartBar,
  FaRuler,
  FaCamera,
} from "react-icons/fa";
import { BiBody } from "react-icons/bi";
import { GiMuscleUp, GiWeightLiftingUp } from "react-icons/gi";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
// import WorkoutAdd from "../../Components/workoutAdd";
import { CheckCircle } from "lucide-react";
import Footer from "../../Components/Footer";

// Replace with your actual RapidAPI key
const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;
const API_BASE_URL = "http://localhost:4000";





// Sample workout data
const sampleWorkouts = [
  {
    name: "Beginner Weight Loss Program",
    description: "A perfect starting point for your fitness journey",
    difficulty: "beginner",
    goal: "weightLoss",
    daysPerWeek: 3,
    workouts: [
      {
        day: 1,
        exercises: [
          {
            name: "Walking",
            sets: 1,
            reps: "30 minutes",
            restTime: "0",
            instructions: "Maintain a brisk pace",
            equipment: "none",
            target: "cardio",
          },
          {
            name: "Bodyweight Squats",
            sets: 3,
            reps: "10",
            restTime: "60 seconds",
            instructions:
              "Keep your back straight and go as low as comfortable",
            equipment: "bodyweight",
            target: "legs",
          },
        ],
      },
    ],
  },
  {
    name: "Intermediate Strength Training",
    description: "Build muscle and increase strength",
    difficulty: "intermediate",
    goal: "muscleGain",
    daysPerWeek: 4,
    workouts: [
      {
        day: 1,
        exercises: [
          {
            name: "Bench Press",
            sets: 4,
            reps: "8-10",
            restTime: "90 seconds",
            instructions: "Keep proper form throughout the movement",
            equipment: "barbell",
            target: "chest",
          },
          {
            name: "Deadlifts",
            sets: 3,
            reps: "8",
            restTime: "120 seconds",
            instructions: "Maintain a straight back and engage your core",
            equipment: "barbell",
            target: "back",
          },
        ],
      },
    ],
  },
  {
    name: "Advanced HIIT Program",
    description: "High-intensity interval training for maximum results",
    difficulty: "advanced",
    goal: "endurance",
    daysPerWeek: 5,
    workouts: [
      {
        day: 1,
        exercises: [
          {
            name: "Burpees",
            sets: 5,
            reps: "20",
            restTime: "30 seconds",
            instructions:
              "Perform as quickly as possible while maintaining form",
            equipment: "bodyweight",
            target: "full body",
          },
          {
            name: "Mountain Climbers",
            sets: 5,
            reps: "30 seconds",
            restTime: "30 seconds",
            instructions: "Keep a steady pace and engage your core",
            equipment: "bodyweight",
            target: "core",
          },
        ],
      },
    ],
  },
];

// Define all styles in one place
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

  .scale-up-center {
    animation: scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  }

  @keyframes scale-up-center {
    0% {
      transform: scale(0.5);
    }
    100% {
      transform: scale(1);
    }
  }

  .animate-bounce-slow {
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(-5%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: translateY(0);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }

  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media (max-width: 640px) {
    .aspect-video {
      aspect-ratio: 16 / 9;
    }
  }
`;

// Move this before the Workout component definition
const defaultExercises = {
  fullBody: [
    {
      name: "Warm-Up Set",
      gifUrl: "https://api.exercisedb.io/image/warm-up.gif",
      equipment: "none",
      target: "full body",
      bodyPart: "full body",
      instructions:
        "5-7 minutes of light cardio: march in place, arm circles, leg swings, hip rotations",
      sets: 1,
      reps: "5-7 minutes",
      restTime: "30 seconds",
      type: "warm-up",
    },
    {
      name: "Jumping Jacks",
      gifUrl: "https://api.exercisedb.io/image/jumping-jacks.gif",
      equipment: "body weight",
      target: "cardiovascular",
      bodyPart: "full body",
      instructions:
        "Jump while raising arms and spreading legs, return to starting position",
      sets: 3,
      reps: "30 seconds",
      restTime: "20 seconds",
      type: "cardio",
    },
    {
      name: "Jump Rope",
      gifUrl: "https://api.exercisedb.io/image/jump-rope.gif",
      equipment: "jump rope",
      target: "cardiovascular",
      bodyPart: "full body",
      instructions: "Perform basic jumps or alternating feet jumps",
      sets: 3,
      reps: "45 seconds",
      restTime: "30 seconds",
      type: "cardio",
    },
    {
      name: "Bodyweight Squats",
      gifUrl: "https://api.exercisedb.io/image/squats.gif",
      equipment: "body weight",
      target: "legs",
      bodyPart: "lower body",
      instructions:
        "Stand with feet shoulder-width apart, lower body until thighs are parallel to ground",
      sets: 3,
      reps: "15",
      restTime: "45 seconds",
      type: "strength",
    },
    {
      name: "Push-Ups",
      gifUrl: "https://api.exercisedb.io/image/push-ups.gif",
      equipment: "body weight",
      target: "chest",
      bodyPart: "upper body",
      instructions:
        "Start in plank position, lower body until chest nearly touches ground, push back up",
      sets: 3,
      reps: "10-12",
      restTime: "45 seconds",
      type: "strength",
    },
    {
      name: "Dumbbell Rows",
      gifUrl: "https://api.exercisedb.io/image/dumbbell-rows.gif",
      equipment: "dumbbells",
      target: "back",
      bodyPart: "upper body",
      instructions:
        "Bend over with dumbbell in each hand, pull weights to sides of chest",
      sets: 3,
      reps: "12",
      restTime: "45 seconds",
      type: "strength",
    },
    {
      name: "Plank Hold",
      gifUrl: "https://api.exercisedb.io/image/plank.gif",
      equipment: "body weight",
      target: "core",
      bodyPart: "core",
      instructions: "Hold plank position with straight body, engage core",
      sets: 3,
      reps: "30 seconds",
      restTime: "30 seconds",
      type: "core",
    },
    {
      name: "Mountain Climbers",
      gifUrl: "https://api.exercisedb.io/image/mountain-climbers.gif",
      equipment: "body weight",
      target: "core",
      bodyPart: "core",
      instructions:
        "In plank position, alternate bringing knees to chest rapidly",
      sets: 3,
      reps: "30 seconds",
      restTime: "30 seconds",
      type: "cardio",
    },
    {
      name: "Shoulder Press",
      gifUrl: "https://api.exercisedb.io/image/shoulder-press.gif",
      equipment: "dumbbells",
      target: "shoulders",
      bodyPart: "upper body",
      instructions:
        "Press dumbbells overhead from shoulder height, return to start",
      sets: 3,
      reps: "12",
      restTime: "45 seconds",
      type: "strength",
    },
    {
      name: "Lunges",
      gifUrl: "https://api.exercisedb.io/image/lunges.gif",
      equipment: "body weight",
      target: "legs",
      bodyPart: "lower body",
      instructions:
        "Step forward into lunge position, lower back knee toward ground",
      sets: 3,
      reps: "12 each leg",
      restTime: "45 seconds",
      type: "strength",
    },
    {
      name: "Burpees",
      gifUrl: "https://api.exercisedb.io/image/burpees.gif",
      equipment: "body weight",
      target: "full body",
      bodyPart: "full body",
      instructions:
        "Drop to plank, perform push-up, jump feet forward, jump up explosively",
      sets: 3,
      reps: "10",
      restTime: "45 seconds",
      type: "cardio",
    },
  ],
  lowerBody: [
    {
      name: "Bulgarian Split Squats",
      gifUrl: "https://api.exercisedb.io/image/Bnk8hbPl0Aa-rp",
      equipment: "body weight",
      target: "legs",
      bodyPart: "lower body",
      instructions: "Place rear foot on bench, lower into split squat position",
      sets: 3,
      reps: "12 each leg",
      restTime: "45 seconds",
    },
    {
      name: "Glute Bridges",
      gifUrl: "https://api.exercisedb.io/image/Cnk8hbPl0Aa-rp",
      equipment: "body weight",
      target: "glutes",
      bodyPart: "lower body",
      instructions: "Lie on back, feet flat, lift hips up squeezing glutes",
      sets: 3,
      reps: "15",
      restTime: "30 seconds",
    },
    {
      name: "Calf Raises",
      gifUrl: "https://api.exercisedb.io/image/Dnk8hbPl0Aa-rp",
      equipment: "body weight",
      target: "calves",
      bodyPart: "lower body",
      instructions: "Stand on edge of step, raise heels up and down",
      sets: 4,
      reps: "20",
      restTime: "30 seconds",
    },
    {
      name: "Goblet Squats",
      gifUrl: "https://api.exercisedb.io/image/Enk8hbPl0Aa-rp",
      equipment: "dumbbell",
      target: "quadriceps",
      bodyPart: "lower body",
      instructions:
        "Hold dumbbell at chest, perform squat maintaining upright posture",
      sets: 4,
      reps: "12",
      restTime: "60 seconds",
    },
  ],
  absCore: [
    {
      name: "Plank Variations",
      gifUrl: "https://api.exercisedb.io/image/Fnk8hbPl0Aa-rp",
      equipment: "body weight",
      target: "core",
      bodyPart: "abs",
      instructions:
        "Hold plank position, alternate between forearm and full plank",
      sets: 3,
      reps: "45 seconds",
      restTime: "30 seconds",
    },
    {
      name: "Russian Twists",
      gifUrl: "https://api.exercisedb.io/image/Gnk8hbPl0Aa-rp",
      equipment: "dumbbell",
      target: "obliques",
      bodyPart: "abs",
      instructions:
        "Sit with knees bent, feet off ground, rotate torso side to side",
      sets: 3,
      reps: "20 total",
      restTime: "30 seconds",
    },
    {
      name: "Dead Bug",
      gifUrl: "https://api.exercisedb.io/image/Hnk8hbPl0Aa-rp",
      equipment: "body weight",
      target: "core stability",
      bodyPart: "abs",
      instructions:
        "Lie on back, extend opposite arm and leg while maintaining lower back contact",
      sets: 3,
      reps: "12 each side",
      restTime: "30 seconds",
    },
    {
      name: "Hanging Leg Raises",
      gifUrl: "https://api.exercisedb.io/image/Ink8hbPl0Aa-rp",
      equipment: "pull-up bar",
      target: "lower abs",
      bodyPart: "abs",
      instructions:
        "Hang from bar, raise legs to parallel while keeping them straight",
      sets: 4,
      reps: "10",
      restTime: "45 seconds",
    },
  ],
  cardioHIIT: [
    {
      name: "Jump Rope",
      gifUrl: "https://api.exercisedb.io/image/Jnk8hbPl0Aa-rp",
      equipment: "jump rope",
      target: "cardiovascular",
      bodyPart: "full body",
      instructions: "Perform basic jumps, alternating feet, or double unders",
      sets: 4,
      reps: "45 seconds",
      restTime: "15 seconds",
    },
    {
      name: "High Knees",
      gifUrl: "https://api.exercisedb.io/image/Knk8hbPl0Aa-rp",
      equipment: "body weight",
      target: "cardiovascular",
      bodyPart: "full body",
      instructions: "Run in place bringing knees to chest height",
      sets: 4,
      reps: "30 seconds",
      restTime: "15 seconds",
    },
  ],
};

// Add workout descriptions object for context
const workoutDescriptions = {
  fullBody: {
    title: "Complete Full Body Workout",
    description:
      "A comprehensive workout targeting all major muscle groups with a mix of cardio, strength, and core exercises. Starts with proper warm-up and progresses through different movement patterns.",
    benefits: [
      "Complete body conditioning",
      "Balanced muscle development",
      "Improved cardiovascular fitness",
      "Enhanced functional strength",
      "Effective calorie burn",
    ],
    recommendedFrequency: "2-3 times per week",
    duration: "60-75 minutes",
    structure: [
      "Warm-up (5-7 minutes)",
      "Cardio activation (10 minutes)",
      "Strength training (30-40 minutes)",
      "Core work (10 minutes)",
      "High-intensity finish (5 minutes)",
    ],
    intensity: "Moderate to High",
    levelSuitability: "Beginner to Advanced (modify as needed)",
  },
  lowerBody: {
    title: "Lower Body Strength",
    description:
      "Focus on building strength and muscle in your legs, glutes, and lower body. Essential for overall stability and power.",
    benefits: [
      "Builds leg strength and muscle mass",
      "Improves balance and stability",
      "Enhances athletic performance",
      "Boosts metabolism through large muscle group activation",
    ],
    recommendedFrequency: "2 times per week",
    duration: "40-50 minutes",
  },
  absCore: {
    title: "Core & Abs Workout",
    description:
      "Strengthen your core muscles for better stability, posture, and aesthetic appeal. Essential for all fitness levels.",
    benefits: [
      "Improves posture and balance",
      "Reduces risk of back pain",
      "Enhances athletic performance",
      "Develops visible core definition",
    ],
    recommendedFrequency: "3-4 times per week",
    duration: "30-40 minutes",
  },
  cardioHIIT: {
    title: "Cardio HIIT",
    description:
      "High-Intensity Interval Training for maximum calorie burn and cardiovascular fitness in minimal time.",
    benefits: [
      "Maximizes calorie burn",
      "Improves cardiovascular endurance",
      "Increases metabolic rate",
      "Time-efficient workout",
    ],
    recommendedFrequency: "2-3 times per week",
    duration: "20-30 minutes",
  },
};

// Update the workoutArticles object with more comprehensive content and better images
const workoutArticles = {
  fullBody: [
    {
      title: "Full Body Training Guide",
      headerImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
      icon: <FaDumbbell className="text-emerald-400" />,
      content: [
        {
          heading: "Benefits of Full Body Training",
          icon: <FaHeartbeat className="text-red-400" />,
          image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2",
          text: "Full body workouts provide a comprehensive approach to fitness, engaging multiple muscle groups in each session for maximum efficiency and results.",
          points: [
            { icon: <FaFire />, text: "Increased calorie burn and fat loss" },
            { icon: <FaSync />, text: "Better muscle recovery between sessions" },
            { icon: <FaClock />, text: "More efficient workout schedule" },
            { icon: <FaDumbbell />, text: "Improved functional strength" },
            { icon: <FaChartLine />, text: "Enhanced hormone production" },
            { icon: <FaRandom />, text: "Greater workout flexibility" },
            { icon: <FaUsers />, text: "Suitable for all fitness levels" },
            { icon: <FaBalanceScale />, text: "Better overall muscle balance" }
          ]
        },
        {
          heading: "Key Full Body Exercises",
          icon: <GiMuscleUp className="text-blue-400" />,
          image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e",
          text: "Master these fundamental compound movements for optimal full body development:",
          subsections: [
            {
              title: "Upper Body Push",
              exercises: [
                "Bench Press - Chest and triceps development",
                "Overhead Press - Shoulder strength",
                "Push-Ups - Multiple variations",
                "Dips - Upper body power"
              ]
            },
            {
              title: "Upper Body Pull",
              exercises: [
                "Pull-Ups/Chin-Ups - Back strength",
                "Bent-Over Rows - Back thickness",
                "Face Pulls - Rear deltoid focus",
                "Lat Pulldowns - Width development"
              ]
            },
            {
              title: "Lower Body",
              exercises: [
                "Squats - Overall leg development",
                "Deadlifts - Posterior chain strength",
                "Lunges - Unilateral leg work",
                "Romanian Deadlifts - Hamstring focus"
              ]
            },
            {
              title: "Core Movements",
              exercises: [
                "Planks - Core stability",
                "Russian Twists - Rotational strength",
                "Ab Wheel Rollouts - Core control",
                "Hanging Leg Raises - Lower abs focus"
              ]
            }
          ]
        },
        {
          heading: "Training Recommendations",
          icon: <FaChartLine className="text-emerald-400" />,
          text: "Optimize your full body training with these proven guidelines:",
          points: [
            { 
              icon: <FaCalendar />, 
              text: "Train 2-3 times per week with 48 hours rest between sessions" 
            },
            { 
              icon: <FaClock />, 
              text: "Keep workouts to 45-75 minutes for optimal hormone response" 
            },
            { 
              icon: <FaDumbbell />, 
              text: "Start with compound movements when fresh" 
            },
            { 
              icon: <FaChartLine />, 
              text: "Progressive overload: Increase weight/reps gradually" 
            }
          ]
        },
        {
          heading: "Workout Structure",
          icon: <FaList className="text-purple-400" />,
          text: "Follow this proven structure for effective full body workouts:",
          subsections: [
            {
              title: "Warm-Up (10-15 mins)",
              exercises: [
                "Dynamic stretching",
                "Mobility work",
                "Light cardio",
                "Movement preparation"
              ]
            },
            {
              title: "Main Workout (40-50 mins)",
              exercises: [
                "2-3 compound exercises (3-4 sets each)",
                "2-3 isolation exercises (3 sets each)",
                "Superset complementary movements",
                "Progressive weight increases"
              ]
            },
            {
              title: "Cool-Down (5-10 mins)",
              exercises: [
                "Light stretching",
                "Mobility work",
                "Recovery exercises",
                "Breathing exercises"
              ]
            }
          ]
        },
        {
          heading: "Sample Weekly Schedule",
          icon: <FaCalendar className="text-yellow-400" />,
          text: "Example 3-day full body split:",
          points: [
            { 
              icon: <FaDumbbell />, 
              text: "Monday: Full Body A (Push focus)" 
            },
            { 
              icon: <FaBed />, 
              text: "Tuesday: Rest/Light cardio" 
            },
            { 
              icon: <FaDumbbell />, 
              text: "Wednesday: Full Body B (Pull focus)" 
            },
            { 
              icon: <FaBed />, 
              text: "Thursday: Rest/Light cardio" 
            },
            { 
              icon: <FaDumbbell />, 
              text: "Friday: Full Body C (Legs focus)" 
            },
            { 
              icon: <FaBed />, 
              text: "Weekend: Active recovery/Rest" 
            }
          ]
        },
        {
          heading: "Progress Tracking",
          icon: <FaChartBar className="text-indigo-400" />,
          text: "Monitor these key metrics for consistent progress:",
          points: [
            { 
              icon: <FaWeight />, 
              text: "Track weights used and reps performed" 
            },
            { 
              icon: <FaClock />, 
              text: "Monitor rest periods between sets" 
            },
            { 
              icon: <FaRuler />, 
              text: "Take monthly body measurements" 
            },
            { 
              icon: <FaCamera />, 
              text: "Progress photos every 4-6 weeks" 
            }
          ]
        },
        {
          heading: "Recovery Tips",
          icon: <FaBed className="text-teal-400" />,
          text: "Optimize your recovery for better results:",
          points: [
            { 
              icon: <FaMoon />, 
              text: "Get 7-9 hours of quality sleep" 
            },
            { 
              icon: <FaAppleAlt />, 
              text: "Maintain proper nutrition and hydration" 
            },
            { 
              icon: <FaHeart />, 
              text: "Include active recovery days" 
            },
            { 
              icon: <FaStopwatch />, 
              text: "Listen to your body and adjust intensity" 
            }
          ]
        }
      ]
    }
  ],
  
  cardio: [
    {
      title: "Cardio Training Essentials",
      headerImage: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c",
      icon: <FaRunning className="text-blue-400" />,
      content: [
        {
          heading: "Benefits of Cardio Training",
          icon: <FaHeart className="text-red-400" />,
          image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c",
          text: "Cardio training is essential for heart health and overall fitness...",
          points: [
            { icon: <FaHeartbeat />, text: "Improved cardiovascular health" },
            { icon: <FaWeight />, text: "Enhanced weight management" },
            { icon: <FaBrain />, text: "Better mental clarity" },
            { icon: <FaBed />, text: "Improved sleep quality" }
          ]
        }
      ]
    }
  ],
  
  strength: [
    {
      title: "Strength Training Guide",
      headerImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
      icon: <GiMuscleUp className="text-purple-400" />,
      content: [
        {
          heading: "Benefits of Strength Training",
          icon: <FaDumbbell className="text-yellow-400" />,
          image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
          text: "Strength training is crucial for building muscle and improving overall strength...",
          points: [
            { icon: <GiMuscleUp />, text: "Increased muscle mass" },
            { icon: <FaBone />, text: "Improved bone density" },
            { icon: <FaFire />, text: "Higher metabolic rate" },
            { icon: <FaShieldAlt />, text: "Better injury prevention" }
          ]
        }
      ]
    }
  ],

  lowerBody: [
    {
      title: "Lower Body Training Guide",
      headerImage: "https://images.unsplash.com/photo-1574680096145-d05b474e2155",
      icon: <FaDumbbell className="text-purple-400" />,
      content: [
        {
          heading: "Benefits of Lower Body Training",
          icon: <FaHeartbeat className="text-red-400" />,
          image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61",
          text: "Lower body training is essential for building a strong foundation and improving overall functional strength.",
          points: [
            { icon: <FaFire />, text: "Enhanced athletic performance" },
            { icon: <FaSync />, text: "Improved joint stability" },
            { icon: <FaClock />, text: "Increased metabolic rate" },
            { icon: <FaDumbbell />, text: "Better functional movement" },
            { icon: <FaChartLine />, text: "Enhanced power output" },
            { icon: <FaRandom />, text: "Reduced injury risk" },
            { icon: <FaUsers />, text: "Balanced muscle development" },
            { icon: <FaBalanceScale />, text: "Improved posture and alignment" }
          ]
        },
        {
          heading: "Key Lower Body Exercises",
          icon: <GiMuscleUp className="text-blue-400" />,
          image: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3",
          text: "Master these fundamental movements for optimal lower body development:",
          subsections: [
            {
              title: "Quad Dominant Exercises",
              exercises: [
                "Back Squats - Overall leg development",
                "Front Squats - Quad focus and core stability",
                "Leg Press - Controlled quad isolation",
                "Bulgarian Split Squats - Unilateral strength"
              ]
            },
            {
              title: "Posterior Chain Exercises",
              exercises: [
                "Deadlifts - Total posterior chain power",
                "Romanian Deadlifts - Hamstring focus",
                "Hip Thrusts - Glute development",
                "Good Mornings - Lower back and hamstrings"
              ]
            },
            {
              title: "Calf & Ankle Work",
              exercises: [
                "Standing Calf Raises - Gastrocnemius focus",
                "Seated Calf Raises - Soleus emphasis",
                "Jump Rope - Dynamic calf work",
                "Box Jumps - Explosive power"
              ]
            },
            {
              title: "Functional Movements",
              exercises: [
                "Walking Lunges - Dynamic stability",
                "Step-Ups - Unilateral power",
                "Farmer's Walks - Grip and leg endurance",
                "Sled Pushes/Pulls - Total leg conditioning"
              ]
            }
          ]
        },
        {
          heading: "Training Structure",
          icon: <FaList className="text-emerald-400" />,
          text: "Follow this proven structure for effective lower body workouts:",
          subsections: [
            {
              title: "Warm-Up (10-15 mins)",
              exercises: [
                "Dynamic leg stretches",
                "Mobility drills",
                "Light cardio",
                "Activation exercises"
              ]
            },
            {
              title: "Main Workout (40-50 mins)",
              exercises: [
                "2-3 compound movements (4 sets each)",
                "2-3 isolation exercises (3 sets each)",
                "Superset complementary exercises",
                "Progressive overload focus"
              ]
            },
            {
              title: "Finisher (5-10 mins)",
              exercises: [
                "High-intensity intervals",
                "Drop sets",
                "Isometric holds",
                "Cool-down stretches"
              ]
            }
          ]
        }
      ]
    }
  ],

  absCore: [
    {
      title: "Complete Core Training Guide",
      headerImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd",
      icon: <BiBody className="text-emerald-400" />,
      content: [
        {
          heading: "Understanding Core Training",
          icon: <FaBook className="text-blue-400" />,
          image: "https://th.bing.com/th/id/OIP.81ngtRaDM1aJpIBCXpL8cQHaEf?rs=1&pid=ImgDetMain",
          subImages: [
            {
              url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
              title: "Stabilization Training",
              description: "Core stability exercises form the foundation of strength"
            },
            {
              url: "https://th.bing.com/th/id/OIP.Xb6s3v8aLV86kZOr8HboRAAAAA?rs=1&pid=ImgDetMain",
              title: "Movement Patterns",
              description: "Multi-planar movements for functional core strength"
            },
            {
              url: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3",
              title: "Integration Training",
              description: "Combining core work with full-body movements"
            },
            {
              url: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff",
              title: "Progressive Overload",
              description: "Gradually increasing difficulty for continued growth"
            }
          ],
          text: "Core training goes beyond just abs - it's about building a strong, stable foundation for all movement. Understanding proper form and progression is key to effective core development.",
          points: [
            { icon: <FaShieldAlt />, text: "Improved spine stability" },
            { icon: <FaSync />, text: "Enhanced movement control" },
            { icon: <FaHeartbeat />, text: "Better posture and alignment" },
            { icon: <FaDumbbell />, text: "Increased power transfer" },
            { icon: <FaChartLine />, text: "Reduced injury risk" },
            { icon: <FaBalanceScale />, text: "Better balance and coordination" },
            { icon: <FaBolt />, text: "Enhanced athletic performance" },
            { icon: <FaFire />, text: "Improved functional strength" }
          ],
          additionalContent: [
            {
              title: "Core Anatomy",
              image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2",
              description: "Understanding the muscles that make up your core:",
              points: [
                "Rectus Abdominis - 'Six-pack' muscles",
                "Transverse Abdominis - Deep core stabilizer",
                "Obliques - Rotational and side flexion",
                "Erector Spinae - Back support and extension"
              ]
            },
            {
              title: "Movement Planes",
              image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff",
              description: "Training in all three planes of motion:",
              points: [
                "Sagittal Plane - Forward/backward movements",
                "Frontal Plane - Side-to-side movements",
                "Transverse Plane - Rotational movements",
                "Multi-planar - Combined movements"
              ]
            },
            {
              title: "Core Function",
              image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3",
              description: "Primary functions of core musculature:",
              points: [
                "Stabilization - Maintaining neutral spine",
                "Force Transfer - Power generation",
                "Movement Control - Precision and balance",
                "Protection - Injury prevention"
              ]
            }
          ]
        },
        {
          heading: "Core Training Principles",
          icon: <GiMuscleUp className="text-purple-400" />,
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
          text: "Master these fundamental principles for effective core development:",
          subsections: [
            {
              title: "Anti-Extension Movements",
              exercises: [
                "Planks - Various modifications",
                "Ab Wheel Rollouts - Progressive resistance",
                "Dead Bugs - Spine stability",
                "Body Saws - Advanced control"
              ]
            },
            {
              title: "Anti-Rotation Exercises",
              exercises: [
                "Pallof Press - Rotational stability",
                "Bird Dogs - Contralateral control",
                "Side Planks - Lateral stability",
                "Renegade Rows - Multi-planar stability"
              ]
            },
            {
              title: "Dynamic Movements",
              exercises: [
                "Cable Woodchops - Rotational power",
                "Russian Twists - Oblique focus",
                "Medicine Ball Slams - Power development",
                "Hanging Leg Raises - Lower abs emphasis"
              ]
            }
          ]
        },
        {
          heading: "Training Recommendations",
          icon: <FaChartLine className="text-yellow-400" />,
          text: "Optimize your core training with these proven guidelines:",
          points: [
            { 
              icon: <FaCalendar />, 
              text: "Train core 3-4 times per week" 
            },
            { 
              icon: <FaClock />, 
              text: "15-20 minute focused sessions" 
            },
            { 
              icon: <FaDumbbell />, 
              text: "Progress from basic to advanced" 
            },
            { 
              icon: <FaChartLine />, 
              text: "Focus on quality over quantity" 
            }
          ]
        },
        {
          heading: "Workout Structure",
          icon: <FaList className="text-purple-400" />,
          text: "Follow this effective structure for core training:",
          subsections: [
            {
              title: "Warm-Up (5-7 mins)",
              exercises: [
                "Cat-cow stretches",
                "Bird dogs",
                "Dead bugs",
                "Activation exercises"
              ]
            },
            {
              title: "Main Work (10-15 mins)",
              exercises: [
                "2-3 anti-extension exercises",
                "2-3 anti-rotation movements",
                "1-2 dynamic exercises",
                "Integrated movement patterns"
              ]
            },
            {
              title: "Finisher (3-5 mins)",
              exercises: [
                "High-intensity intervals",
                "Isometric holds",
                "Movement flow sequences",
                "Cool-down stretches"
              ]
            }
          ]
        }
      ]
    }
  ]
};

// Update the WorkoutArticles component to handle subsections
const WorkoutArticles = ({ selectedSection }) => {
  if (!selectedSection || !workoutArticles[selectedSection]) {
    return null;
  }

  return (
    <div className="mt-12 space-y-8 animate-fadeIn">
      {workoutArticles[selectedSection].map((article, index) => (
        <div
          key={index}
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 shadow-xl"
        >
          {/* Hero Section */}
          <div className="relative h-[200px] sm:h-[300px] md:h-[400px]">
            <img
              src={article.headerImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent">
              <div className="absolute bottom-0 p-4 sm:p-6 md:p-8">
                <div className="flex items-center gap-3 mb-3">
                  {article.icon}
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                    {article.title}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="p-4 sm:p-6 md:p-8 space-y-8 md:space-y-12">
            {article.content.map((section, sIndex) => (
              <div key={sIndex} className="relative">
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-6">
                  {section.icon}
                  <h4 className="text-xl sm:text-2xl font-semibold text-white">
                    {section.heading}
                  </h4>
                </div>

                {/* Main Section Image */}
                {section.image && (
                  <div className="relative h-[200px] sm:h-[300px] rounded-xl overflow-hidden mb-6">
                    <img
                      src={section.image}
                      alt={section.heading}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Section Text */}
                {section.text && (
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {section.text}
                  </p>
                )}

                {/* Points Grid */}
                {section.points && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {section.points.map((point, pIndex) => (
                      <div
                        key={pIndex}
                        className="flex items-center gap-3 bg-gray-700/30 p-4 rounded-xl backdrop-blur-sm"
                      >
                        <div className="text-emerald-400">{point.icon}</div>
                        <span className="text-gray-300">{point.text}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Sub Images Gallery */}
                {section.subImages && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {section.subImages.map((subImage, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="bg-gray-700/30 rounded-xl overflow-hidden"
                      >
                        <div className="relative h-[200px]">
                          <img
                            src={subImage.url}
                            alt={subImage.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h5 className="text-lg font-semibold text-emerald-400 mb-2">
                            {subImage.title}
                          </h5>
                          <p className="text-gray-300 text-sm">
                            {subImage.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Additional Content Sections */}
                {section.additionalContent && (
                  <div className="space-y-8 mt-8">
                    {section.additionalContent.map((content, contentIndex) => (
                      <div
                        key={contentIndex}
                        className="bg-gray-700/30 rounded-xl overflow-hidden"
                      >
                        <div className="relative h-[200px]">
                          <img
                            src={content.image}
                            alt={content.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <h5 className="text-xl font-semibold text-emerald-400 mb-3">
                            {content.title}
                          </h5>
                          <p className="text-gray-300 mb-4">{content.description}</p>
                          <ul className="space-y-2">
                            {content.points.map((point, pointIndex) => (
                              <li
                                key={pointIndex}
                                className="flex items-center gap-2 text-gray-300"
                              >
                                <FaCircle className="text-emerald-400 text-xs" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Subsections */}
                {section.subsections && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {section.subsections.map((subsection, subIndex) => (
                      <div
                        key={subIndex}
                        className="bg-gray-700/30 p-6 rounded-xl backdrop-blur-sm"
                      >
                        <h5 className="text-lg font-medium text-emerald-400 mb-4">
                          {subsection.title}
                        </h5>
                        <ul className="space-y-2">
                          {subsection.exercises.map((exercise, exIndex) => (
                            <li
                              key={exIndex}
                              className="flex items-center gap-2 text-gray-300"
                            >
                              <FaCircle className="text-emerald-400 text-xs" />
                              {exercise}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Then, add this new component for the workout sections
const WorkoutSections = () => {
  const [selectedSection, setSelectedSection] = useState("fullBody");
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700 mb-12">
      {/* Section Navigation */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedSection("fullBody")}
          className={`px-6 py-3 rounded-lg whitespace-nowrap transition-all ${
            selectedSection === "fullBody"
              ? "bg-emerald-500 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          Full Body Workout
        </button>
        <button
          onClick={() => setSelectedSection("lowerBody")}
          className={`px-6 py-3 rounded-lg whitespace-nowrap transition-all ${
            selectedSection === "lowerBody"
              ? "bg-emerald-500 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          Lower Body Workout
        </button>
        <button
          onClick={() => setSelectedSection("absCore")}
          className={`px-6 py-3 rounded-lg whitespace-nowrap transition-all ${
            selectedSection === "absCore"
              ? "bg-emerald-500 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          Abs & Core Workout
        </button>
      </div>

      {/* Add the articles section */}
      <WorkoutArticles selectedSection={selectedSection} />
    </div>
  );
};

// Update the main Workout component to use WorkoutSections
const Workout = () => {
  const [workoutPlans, setWorkoutPlans] = useState(() => {
    // Try to get saved workout plan from localStorage
    const savedPlan = localStorage.getItem('workoutPlan');
    return savedPlan ? JSON.parse(savedPlan) : null;
  });

  const [isPlanGenerated, setIsPlanGenerated] = useState(() => {
    // Check if there's a saved plan
    return localStorage.getItem('workoutPlan') !== null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [userPreferences, setUserPreferences] = useState({
    fitnessLevel: "beginner",
    goal: "weightLoss",
    daysPerWeek: 2,
    bodyPart: "all",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [adviceOpen, setAdviceOpen] = useState(false);
  const navigate = useNavigate();

  const [workoutTimer, setWorkoutTimer] = useState({
    isActive: false,
    time: 0,
    currentExercise: null,
  });

  // First, ensure workoutHistory is initialized as an array
  const [workoutHistory, setWorkoutHistory] = useState([]);

  // Add state for favorites
  const [favoriteExercises, setFavoriteExercises] = useState([]);

  // Add these new state variables
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exerciseTimer, setExerciseTimer] = useState({
    time: 0,
    isResting: false,
    restTimeLeft: 0,
  });

  // Add these new state variables after other useState declarations
  const [workoutSession, setWorkoutSession] = useState({
    isActive: false,
    exerciseTimeLimit: 105, // 1:45 minutes in seconds
    timeRemaining: 105,
    completedExercises: [],
    startTime: null,
    endTime: null,
    totalDuration: 0,
  });

  // Add celebration state
  const [showCelebration, setShowCelebration] = useState(false);

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };




  // Define valid body parts according to API requirements
  const validBodyParts = [
    "back",
    "cardio",
    "chest",
    "lower arms",
    "lower legs",
    "neck",
    "shoulders",
    "upper arms",
    "upper legs",
    "waist",
  ];

  const fetchExercisesByBodyPart = async (bodyPart) => {
    try {
      // Validate body part
      if (!validBodyParts.includes(bodyPart)) {
        console.warn(`Invalid body part: ${bodyPart}`);
        return [];
      }

      const options = {
        method: "GET",
        url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
        headers: {
          "X-RapidAPI-Key": RAPID_API_KEY,
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          Accept: "application/json",
        },
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
        "back",
        "chest",
        "shoulders",
        "upper legs",
        "upper arms",
        "waist",
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
        console.log("Using default exercises as fallback");
        allExercises =
          defaultExercises[userPreferences.goal] || defaultExercises.weightLoss;
      }

      // Define exercise counts based on fitness level
      const exercisesPerWorkout = {
        beginner: 4,
        intermediate: 6,
        advanced: 8,
      };

      // Define sets and reps based on goal
      const workoutConfig = {
        weightLoss: { sets: 3, reps: "15-20", rest: "30 seconds" },
        muscleGain: { sets: 4, reps: "8-12", rest: "90 seconds" },
        endurance: { sets: 3, reps: "12-15", rest: "45 seconds" },
        strength: { sets: 5, reps: "4-6", rest: "120 seconds" },
      };

      const config = workoutConfig[userPreferences.goal];
      const exerciseCount = exercisesPerWorkout[userPreferences.fitnessLevel];

      // Create workout plan
      const workoutPlan = {
        name: `${
          userPreferences.fitnessLevel.charAt(0).toUpperCase() +
          userPreferences.fitnessLevel.slice(1)
        } ${userPreferences.goal} Plan`,
        description: `Custom ${userPreferences.daysPerWeek}-day workout plan for ${userPreferences.goal}`,
        difficulty: userPreferences.fitnessLevel,
        goal: userPreferences.goal,
        daysPerWeek: userPreferences.daysPerWeek,
        workouts: [],
      };

      // Generate workouts for each day
      for (let day = 1; day <= userPreferences.daysPerWeek; day++) {
        const shuffledExercises = [...allExercises]
          .sort(() => Math.random() - 0.5)
          .slice(0, exerciseCount)
          .map((exercise) => ({
            name: exercise.name,
            sets: config.sets,
            reps: config.reps,
            restTime: config.rest,
            equipment: exercise.equipment,
            target: exercise.target,
            bodyPart: exercise.bodyPart,
            gifUrl: exercise.gifUrl,
            instructions:
              exercise.instructions ||
              `Perform ${exercise.name} with proper form`,
          }));

        workoutPlan.workouts.push({
          day,
          exercises: shuffledExercises,
        });
      }

      // After workout plan is generated, save it to localStorage
      setWorkoutPlans(workoutPlan);
      localStorage.setItem('workoutPlan', JSON.stringify(workoutPlan));
    
      setIsPlanGenerated(true);
      setError(null);
    } catch (error) {
      console.error("Error generating workout plan:", error);
      setError("Failed to generate workout plan");
    } finally {
      setLoading(false);
    }
  };

  // Add a new state to track if a plan has been generated
  // const [isPlanGenerated, setIsPlanGenerated] = useState(false);

  // Modify the handlePreferencesChange to not trigger plan generation
  const handlePreferencesChange = (field, value) => {
    setUserPreferences(prev => {
      const newPreferences = {
        ...prev,
        [field]: value,
      };
      // Save preferences to localStorage
      localStorage.setItem('workoutPreferences', JSON.stringify(newPreferences));
      return newPreferences;
    });
  };

  // Add a new function to handle plan generation
  const handleGeneratePlan = () => {
    setIsPlanGenerated(true);
    generateWorkoutPlan();
  };

  const getGoalIcon = (goal) => {
    switch (goal) {
      case "weightLoss":
        return <FaRunning className="text-2xl" />;
      case "muscleGain":
        return <GiMuscleUp className="text-2xl" />;
      case "endurance": // endurance means
        return <FaHeart className="text-2xl" />;
      case "strength":
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
          <h3 className="text-3xl font-bold mb-6 text-gradient">
            {exercise.name}
          </h3>

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
                  <p className="text-emerald-400 text-sm font-medium mb-1">
                    Sets
                  </p>
                  <p className="text-2xl font-bold">{exercise.sets}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-emerald-400 text-sm font-medium mb-1">
                    Reps
                  </p>
                  <p className="text-2xl font-bold">{exercise.reps}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-emerald-400 text-sm font-medium mb-1">
                    Rest
                  </p>
                  <p className="text-2xl font-bold">{exercise.restTime}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-emerald-400 text-sm font-medium mb-1">
                    Target
                  </p>
                  <p className="text-2xl font-bold">{exercise.target}</p>
                </div>
              </div>

              {/* Equipment and Body Part */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center mb-4">
                  <FaDumbbell className="text-emerald-400 mr-2" />
                  <p className="text-gray-300">
                    <span className="font-medium">Equipment:</span>{" "}
                    {exercise.equipment}
                  </p>
                </div>
                <div className="flex items-center">
                  <BiBody className="text-emerald-400 mr-2" />
                  <p className="text-gray-300">
                    <span className="font-medium">Body Part:</span>{" "}
                    {exercise.bodyPart}
                  </p>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-emerald-400 font-medium mb-2">
                  Instructions
                </h4>
                <p className="text-gray-300">{exercise.instructions}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Add function to toggle favorites
  const toggleFavorite = (exercise) => {
    setFavoriteExercises((prev) => {
      const isExisting = prev.some((ex) => ex.name === exercise.name);
      if (isExisting) {
        return prev.filter((ex) => ex.name !== exercise.name);
      }
      return [...prev, exercise];
    });
  };

  // Modify the ExerciseCard component to include favorite button
  const ExerciseCard = ({ exercise, isActive, onStart }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
        isActive ? "ring-2 ring-emerald-400" : ""
      }`}
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
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(exercise);
          }}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300"
        >
          <FaHeart
            className={`text-xl ${
              favoriteExercises.some((ex) => ex.name === exercise.name)
                ? "text-red-500"
                : "text-gray-400"
            }`}
          />
        </button>
      </div>

      {/* Exercise Details */}
      <div className="p-6">
        <h4 className="text-xl font-semibold mb-4 text-gradient">
          {exercise.name}
        </h4>
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
        {onStart && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStart(exercise);
            }}
            className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <FaPlay className="text-sm" />
            Start Exercise
          </button>
        )}
      </div>
    </motion.div>
  );

  // Add equipment selection to your preferences section
  const equipmentOptions = [
    "bodyweight",
    "dumbbell",
    "barbell",
    "cable",
    "machine",
    "bands",
  ];

  const startWorkoutTimer = (exercise) => {
    setWorkoutTimer({
      isActive: true,
      time: 0,
      currentExercise: exercise,
    });
  };

  const stopWorkoutTimer = () => {
    setWorkoutTimer({
      ...workoutTimer,
      isActive: false,
    });
  };

  useEffect(() => {
    let interval = null;
    if (workoutTimer.isActive) {
      interval = setInterval(() => {
        setWorkoutTimer((prev) => ({
          ...prev,
          time: prev.time + 1,
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [workoutTimer.isActive]);

  // Add this component before the return statement
  const WorkoutProgress = ({ workout, currentExercise }) => {
    const totalExercises = workout.exercises.length;
    const currentIndex = workout.exercises.findIndex(
      (ex) => ex.name === currentExercise?.name
    );
    const progress = ((currentIndex + 1) / totalExercises) * 100;

    return (
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-300">Workout Progress</span>
          <span className="text-emerald-400">{`${
            currentIndex + 1
          }/${totalExercises}`}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-emerald-400 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    );
  };

  // Add this useEffect to load workout history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("workoutHistory");
    if (savedHistory) {
      setWorkoutHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Modify the saveWorkoutToHistory function to properly save the workout
  const saveWorkoutToHistory = (workout) => {
    const workoutEntry = {
      date: new Date().toISOString(),
      workout: {
        name: workout.name,
        exercises: workout.exercises,
        duration: workoutTimer.time,
      },
    };

    const updatedHistory = [...workoutHistory, workoutEntry];
    setWorkoutHistory(updatedHistory);
    localStorage.setItem("workoutHistory", JSON.stringify(updatedHistory));
  };

  // Modify the deleteWorkoutHistory function
  const deleteWorkoutHistory = (workoutId) => {
    // Filter out the workout with the matching ID
    const updatedHistory = workoutHistory.filter(
      (entry) => entry.id !== workoutId
    );
    setWorkoutHistory(updatedHistory);
    localStorage.setItem("workoutHistory", JSON.stringify(updatedHistory));
  };

  // Update the WorkoutHistory component
  const WorkoutHistory = () => {
    const [selectedWorkoutDetails, setSelectedWorkoutDetails] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    // Add safety check for workoutHistory
    const safeWorkoutHistory = Array.isArray(workoutHistory) ? workoutHistory : [];

    return (
      <div className="w-full px-4 lg:px-6 mt-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-700 shadow-xl">
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <FaHistory className="mr-2 text-emerald-400" />
            Workout History
          </h3>

          {!safeWorkoutHistory || safeWorkoutHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <FaDumbbell className="mx-auto text-4xl mb-4 text-emerald-400/50" />
              <p className="text-lg">No completed workouts yet. Start your fitness journey today!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {safeWorkoutHistory.map((entry, index) => (
                <div
                  key={index}
                  className="bg-gray-700/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl hover:bg-gray-700/70 transition-all duration-300 border border-gray-600/50"
                >
                  {/* Date Header */}
                  <div className="flex items-center gap-2 mb-3 bg-gray-800/50 p-3 rounded-lg">
                    <FaCalendar className="text-emerald-400" />
                    <p className="text-emerald-400 font-medium">
                      {new Date(entry?.date || new Date()).toLocaleDateString(undefined, {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>

                  {/* Workout Details */}
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-white mb-3">
                      {entry?.workout?.name || "Full Body Workout"}
                    </h4>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                          <FaDumbbell className="text-emerald-400" />
                          <span>{entry?.workout?.exercises?.length || 0} exercises</span>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                          <FaClock className="text-emerald-400" />
                          <span>
                            {Math.floor((entry?.workout?.duration || 0) / 60)}m
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Exercise List Preview */}
                    <div className="mb-4">
                      <div className="text-sm text-gray-400 mb-2">Completed Exercises:</div>
                      <ul className="text-gray-300 text-sm space-y-1">
                        {entry?.workout?.exercises?.slice(0, 3).map((exercise, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <FaCircle className="text-emerald-400 text-[8px]" />
                            {exercise.name}
                          </li>
                        ))}
                        {(entry?.workout?.exercises?.length || 0) > 3 && (
                          <li className="text-emerald-400 text-sm">
                            +{(entry?.workout?.exercises?.length || 0) - 3} more exercises
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-600/50">
                    <button
                      onClick={() => setSelectedWorkoutDetails(entry)}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-all duration-300"
                    >
                      <FaEye />
                      View Details
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(entry?.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all duration-300"
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Workout Details Modal */}
          {selectedWorkoutDetails && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[1000] p-4 overflow-y-auto">
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl w-full max-w-4xl mx-auto overflow-hidden border border-gray-700 shadow-xl">
                {/* Modal Header */}
                <div className="bg-gray-800 px-6 py-4 border-b border-gray-700 sticky top-0 z-10">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                      Workout Details
                    </h3>
                    <button
                      onClick={() => setSelectedWorkoutDetails(null)}
                      className="text-gray-400 hover:text-white p-2 hover:bg-gray-700/50 rounded-lg transition-all"
                    >
                      <FaTimes className="text-xl" />
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
                  <div className="space-y-6">
                    {/* Workout Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-700/30 p-4 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-emerald-500/10 rounded-lg">
                            <FaCalendar className="text-emerald-400 text-xl" />
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Date</p>
                            <p className="text-white font-medium">
                              {new Date(selectedWorkoutDetails.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-700/30 p-4 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-blue-500/10 rounded-lg">
                            <FaClock className="text-blue-400 text-xl" />
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Duration</p>
                            <p className="text-white font-medium">
                              {Math.floor(selectedWorkoutDetails.workout.duration / 60)}m {selectedWorkoutDetails.workout.duration % 60}s
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Exercises List */}
                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold text-white flex items-center gap-2">
                        <FaDumbbell className="text-emerald-400" />
                        Completed Exercises
                      </h4>
                      <div className="space-y-4">
                        {selectedWorkoutDetails.workout.exercises.map((exercise, index) => (
                          <div
                            key={index}
                            className="bg-gray-700/30 p-4 rounded-xl border border-gray-600/50"
                          >
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                              <div>
                                <h5 className="text-lg font-medium text-emerald-400 mb-2">
                                  {exercise.name}
                                </h5>
                                <div className="space-y-2">
                                  <p className="text-gray-300 flex items-center gap-2">
                                    <GiMuscleUp className="text-emerald-400" />
                                    {exercise.sets} sets × {exercise.reps}
                                  </p>
                                  <p className="text-gray-300 flex items-center gap-2">
                                    <BiBody className="text-emerald-400" />
                                    Target: {exercise.target}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <p className="text-gray-400 text-sm">
                                  Completed at: {new Date(exercise.completedAt).toLocaleTimeString()}
                                </p>
                                <p className="text-emerald-400 font-medium">
                                  Duration: {Math.floor(exercise.duration / 60)}m {exercise.duration % 60}s
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {deleteConfirm && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[1000] p-4">
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-xl max-w-md w-full mx-auto border border-gray-700 shadow-xl">
                <div className="text-center mb-6">
                  <div className="bg-red-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaExclamationCircle className="text-3xl text-red-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">
                    Delete Workout?
                  </h4>
                  <p className="text-gray-300">
                    Are you sure you want to delete this workout history? This action cannot be undone.
                  </p>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      deleteWorkoutHistory(deleteConfirm);
                      setDeleteConfirm(null);
                    }}
                    className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Add this function to calculate workout duration based on exercises
  const calculateWorkoutDuration = (exercises) => {
    let totalTime = 0;
    exercises.forEach((exercise) => {
      // Calculate time for each exercise (sets * reps * estimated time per rep + rest time)
      const exerciseTime =
        exercise.sets *
        (typeof exercise.reps === "string" && exercise.reps.includes("seconds")
          ? parseInt(exercise.reps)
          : parseInt(exercise.reps) * 3); // Assume 3 seconds per rep if not time-based
      const restTime = parseInt(exercise.restTime) * (exercise.sets - 1);
      totalTime += exerciseTime + restTime;
    });
    return totalTime + 300; // Add 5 minutes buffer
  };

  // Modify the startWorkout function
  const startWorkout = (workout) => {
    setActiveWorkout(workout);
    setCurrentExerciseIndex(0);
    setWorkoutSession({
      isActive: true,
      exerciseTimeLimit: 105,
      timeRemaining: 105,
      completedExercises: [],
      startTime: new Date(),
      endTime: null,
      totalDuration: 0,
    });
  };

  // Add this useEffect for the timer
  useEffect(() => {
    let interval = null;
    if (workoutSession.isActive && workoutSession.timeRemaining > 0) {
      interval = setInterval(() => {
        setWorkoutSession((prev) => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        }));
      }, 1000);
    } else if (workoutSession.timeRemaining === 0 && workoutSession.isActive) {
      // Auto-move to next exercise when timer ends
      handleNext();
    }
    return () => clearInterval(interval);
  }, [workoutSession.isActive, workoutSession.timeRemaining]);

  // Add these navigation functions
  const handleNext = () => {
    if (!activeWorkout) return;

    // Mark current exercise as completed
    const completedExercise = {
      ...activeWorkout.exercises[currentExerciseIndex],
      completedAt: new Date(),
      duration: workoutSession.exerciseTimeLimit - workoutSession.timeRemaining,
    };

    setWorkoutSession((prev) => ({
      ...prev,
      completedExercises: [...prev.completedExercises, completedExercise],
    }));

    // Move to next exercise or complete workout
    if (currentExerciseIndex < activeWorkout.exercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
      setWorkoutSession((prev) => ({
        ...prev,
        timeRemaining: prev.exerciseTimeLimit,
      }));
    } else {
      completeWorkout();
    }
  };

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex((prev) => prev - 1);
      setWorkoutSession((prev) => ({
        ...prev,
        timeRemaining: prev.exerciseTimeLimit,
      }));
    }
  };

  // Modify the ActiveWorkoutDisplay component
  const ActiveWorkoutDisplay = () => {
    if (!activeWorkout || !workoutSession.isActive) return null;

    const currentExercise = activeWorkout.exercises[currentExerciseIndex];
    const isLastExercise =
      currentExerciseIndex === activeWorkout.exercises.length - 1;
    const progress =
      ((currentExerciseIndex + 1) / activeWorkout.exercises.length) * 100;
    const minutes = Math.floor(workoutSession.timeRemaining / 60);
    const seconds = workoutSession.timeRemaining % 60;

    const handleComplete = () => {
      if (workoutSession.isActive) {
        completeWorkout();
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
        <div className="bg-gray-800 w-full max-w-4xl mx-4 rounded-xl shadow-lg border border-gray-700">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-emerald-400">
                  Current Exercise: {currentExercise.name}
                </h3>
                <p className="text-gray-300 mt-2">
                  {currentExercise.sets} sets × {currentExercise.reps}
                </p>
              </div>
              <div className="text-center bg-gray-700 px-6 py-3 rounded-lg">
                <div className="text-3xl font-bold text-white">
                  {minutes}:{seconds.toString().padStart(2, "0")}
                </div>
                <p className="text-gray-400">Time Remaining</p>
              </div>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
              <div
                className="bg-emerald-400 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-300 text-lg">
                Exercise {currentExerciseIndex + 1} of{" "}
                {activeWorkout.exercises.length}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentExerciseIndex === 0}
                  className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
                    currentExerciseIndex === 0
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  <FaArrowLeft />
                  Previous
                </button>

                {isLastExercise ? (
                  <button
                    onClick={handleComplete}
                    className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg flex items-center gap-2 animate-pulse"
                  >
                    <FaCheckCircle className="mr-2" />
                    Complete Workout
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-lg flex items-center gap-2"
                  >
                    Next
                    <FaArrowRight />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Update the WorkoutCelebration component
  const WorkoutCelebration = () => {
    const formatDuration = (totalSeconds) => {
      if (!totalSeconds || isNaN(totalSeconds)) return "0s";
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      const parts = [];
      if (hours > 0) parts.push(`${hours}h`);
      if (minutes > 0) parts.push(`${minutes}m`);
      if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);
      return parts.join(" ");
    };

    const calculateCaloriesBurned = (duration) => {
      return Math.round((duration / 60) * 8);
    };

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-start justify-center z-[999] overflow-y-auto pt-4 pb-4">
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl w-full max-w-lg mx-4 my-auto border border-gray-700 shadow-2xl transform scale-up-center">
          {/* Scrollable Container */}
          <div className="max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="p-8">
              {/* Top Section with Trophy Animation */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-emerald-500 opacity-10 blur-2xl rounded-full"></div>
                <div className="relative">
                  <div className="text-7xl mb-4 animate-bounce-slow">🏆</div>
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                    Workout Complete!
                  </h2>
                  <p className="text-gray-400 text-lg mt-2">
                    You've crushed it! Here's your workout summary
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {/* Duration Card */}
                <div className="bg-gray-700/50 p-4 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center justify-center mb-2">
                    <FaClock className="text-emerald-400 text-xl" />
                  </div>
                  <p className="text-gray-400 text-sm">Total Time</p>
                  <p className="text-2xl font-bold text-white">
                    {formatDuration(workoutSession.totalDuration)}
                  </p>
                </div>

                {/* Calories Card */}
                <div className="bg-gray-700/50 p-4 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center justify-center mb-2">
                    <FaFire className="text-orange-400 text-xl" />
                  </div>
                  <p className="text-gray-400 text-sm">Calories Burned</p>
                  <p className="text-2xl font-bold text-white">
                    {calculateCaloriesBurned(workoutSession.totalDuration)}
                  </p>
                </div>

                {/* Exercises Card */}
                <div className="bg-gray-700/50 p-4 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center justify-center mb-2">
                    <FaDumbbell className="text-blue-400 text-xl" />
                  </div>
                  <p className="text-gray-400 text-sm">Exercises</p>
                  <p className="text-2xl font-bold text-white">
                    {workoutSession.completedExercises.length}
                  </p>
                </div>

                {/* Streak Card */}
                <div className="bg-gray-700/50 p-4 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center justify-center mb-2">
                    <FaBolt className="text-yellow-400 text-xl" />
                  </div>
                  <p className="text-gray-400 text-sm">Current Streak</p>
                  <p className="text-2xl font-bold text-white">
                    {workoutHistory.length + 1}
                  </p>
                </div>
              </div>

              {/* Motivational Message */}
              <div className="mb-8 p-4 bg-gray-700/30 rounded-xl backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FaStar className="text-yellow-400" />
                  <span className="text-emerald-400 font-semibold">
                    Achievement Unlocked!
                  </span>
                </div>
                <p className="text-gray-300">
                  You're making great progress! Keep up the momentum and stay
                  consistent with your fitness journey.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setShowCelebration(false)}
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 px-8 py-3 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <FaCheck className="text-lg" />
                  Continue
                </button>
                <button
                  onClick={() => {
                    setShowCelebration(false);
                    // Add navigation logic to history
                  }}
                  className="w-full bg-gray-700 hover:bg-gray-600 px-8 py-3 rounded-xl text-gray-300 font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaHistory className="text-lg" />
                  View Workout History
                </button>
              </div>

              {/* Share Button */}
              <button className="mt-4 text-gray-400 hover:text-gray-300 transition-colors duration-200 flex items-center gap-2 mx-auto">
                <FaShare className="text-sm" />
                Share Achievement
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Update the completeWorkout function
  const completeWorkout = () => {
    // Prevent multiple calls
    if (!workoutSession.isActive) return;

    const endTime = new Date();
    const totalDuration = Math.floor(
      (endTime - workoutSession.startTime) / 1000
    );

    // Mark the last exercise as completed
    const lastExercise = {
      ...activeWorkout.exercises[currentExerciseIndex],
      completedAt: endTime,
      duration: workoutSession.exerciseTimeLimit - workoutSession.timeRemaining,
    };

    const allCompletedExercises = [
      ...workoutSession.completedExercises,
      lastExercise,
    ];

    const workoutEntry = {
      id: Date.now(),
      date: endTime.toISOString(),
      workout: {
        name: activeWorkout.name,
        exercises: allCompletedExercises,
        duration: totalDuration,
        startTime: workoutSession.startTime,
        endTime: endTime,
        completed: true,
      },
    };

    // Update workout history
    const updatedHistory = [...workoutHistory, workoutEntry];
    setWorkoutHistory(updatedHistory);
    localStorage.setItem("workoutHistory", JSON.stringify(updatedHistory));

    // First, update the session state
    setWorkoutSession((prev) => ({
      ...prev,
      isActive: false,
      endTime: endTime,
      totalDuration: totalDuration,
    }));

    // Then show celebration
    setShowCelebration(true);

    // Reset other states
    setActiveWorkout(null);
    setCurrentExerciseIndex(0);
  };

  // Add this new component after WorkoutHistory
  const WorkoutStatistics = () => {
    // Calculate total streak (consecutive days)
    const calculateStreak = () => {
      if (workoutHistory.length === 0) return 0;

      const sortedWorkouts = [...workoutHistory].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      let streak = 1;
      const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

      for (let i = 1; i < sortedWorkouts.length; i++) {
        const currentDate = new Date(sortedWorkouts[i - 1].date);
        const prevDate = new Date(sortedWorkouts[i].date);
        const diffDays = Math.round((currentDate - prevDate) / oneDay);

        if (diffDays === 1) {
          streak++;
        } else {
          break;
        }
      }
      return streak;
    };

    // Calculate total calories burned from all workouts
    const calculateTotalCalories = () => {
      return workoutHistory.reduce((total, entry) => {
        // Assuming 8 calories burned per minute of workout
        const workoutMinutes = entry.workout.duration / 60;
        return total + workoutMinutes * 8;
      }, 0);
    };

    // Calculate total workout time in minutes
    const calculateTotalWorkoutTime = () => {
      const totalSeconds = workoutHistory.reduce((total, entry) => {
        return total + entry.workout.duration;
      }, 0);
      return Math.round(totalSeconds / 60);
    };

    // Calculate total workouts completed
    const totalWorkouts = workoutHistory.length;

    return (
      <div className="w-full px-4 lg:px-6 mt-8 lg:mt-12">
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-700 shadow-xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 lg:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <FaChartLine className="text-emerald-400" />
              <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                Workout Statistics
              </span>
            </h3>

            {/* Time Period Selector - Mobile Optimized */}
            {/* <div className="w-full sm:w-auto">
              <select className="w-full sm:w-auto bg-gray-700 text-gray-300 rounded-lg px-4 py-2 text-sm border border-gray-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 transition-all">
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div> */}
          </div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Current Streak Card */}
            <div className="bg-gray-800/50 rounded-xl p-4 lg:p-6 border border-gray-700/50 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-500/10 rounded-lg">
                  <FaBolt className="text-yellow-400 text-xl lg:text-2xl" />
                </div>
                <span className="text-yellow-400 text-xs lg:text-sm font-medium px-3 py-1 bg-yellow-400/10 rounded-full">
                  Current
                </span>
              </div>
              <h4 className="text-gray-400 text-sm mb-1">Workout Streak</h4>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl lg:text-3xl font-bold text-white">
                  {calculateStreak()}
                </span>
                <span className="text-gray-400 text-xs lg:text-sm">days</span>
              </div>
            </div>

            {/* Total Calories Card */}
            <div className="bg-gray-800/50 rounded-xl p-4 lg:p-6 border border-gray-700/50 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-500/10 rounded-lg">
                  <FaFire className="text-orange-400 text-xl lg:text-2xl" />
                </div>
                <span className="text-orange-400 text-xs lg:text-sm font-medium px-3 py-1 bg-orange-400/10 rounded-full">
                  Total
                </span>
              </div>
              <h4 className="text-gray-400 text-sm mb-1">Calories Burned</h4>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl lg:text-3xl font-bold text-white">
                  {calculateTotalCalories().toLocaleString()}
                </span>
                <span className="text-gray-400 text-xs lg:text-sm">kcal</span>
              </div>
            </div>

            {/* Total Time Card */}
            <div className="bg-gray-800/50 rounded-xl p-4 lg:p-6 border border-gray-700/50 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <FaClock className="text-blue-400 text-xl lg:text-2xl" />
                </div>
                <span className="text-blue-400 text-xs lg:text-sm font-medium px-3 py-1 bg-blue-400/10 rounded-full">
                  Total
                </span>
              </div>
              <h4 className="text-gray-400 text-sm mb-1">Workout Time</h4>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl lg:text-3xl font-bold text-white">
                  {calculateTotalWorkoutTime()}
                </span>
                <span className="text-gray-400 text-xs lg:text-sm">
                  minutes
                </span>
              </div>
            </div>

            {/* Total Workouts Card */}
            <div className="bg-gray-800/50 rounded-xl p-4 lg:p-6 border border-gray-700/50 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-500/10 rounded-lg">
                  <FaDumbbell className="text-emerald-400 text-xl lg:text-2xl" />
                </div>
                <span className="text-emerald-400 text-xs lg:text-sm font-medium px-3 py-1 bg-emerald-400/10 rounded-full">
                  Total
                </span>
              </div>
              <h4 className="text-gray-400 text-sm mb-1">Workouts Completed</h4>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl lg:text-3xl font-bold text-white">
                  {totalWorkouts}
                </span>
                <span className="text-gray-400 text-xs lg:text-sm">
                  sessions
                </span>
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="mt-6 lg:mt-8 bg-gray-800/50 rounded-xl p-4 lg:p-6 border border-gray-700/50">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                <FaTrophy className="text-emerald-400" />
                Achievements
              </h4>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Longest Streak */}
              <div className="bg-gray-700/30 rounded-lg p-4 flex items-center gap-4 transform hover:scale-[1.02] transition-all duration-300">
                <div className="p-3 bg-purple-500/10 rounded-lg shrink-0">
                  <FaMedal className="text-purple-400 text-xl" />
                </div>
                <div className="min-w-0">
                  <p className="text-gray-400 text-sm">Longest Streak</p>
                  <p className="text-white font-semibold truncate">
                    {calculateStreak()} days
                  </p>
                </div>
              </div>

              {/* Average Workout Time */}
              <div className="bg-gray-700/30 rounded-lg p-4 flex items-center gap-4 transform hover:scale-[1.02] transition-all duration-300">
                <div className="p-3 bg-green-500/10 rounded-lg shrink-0">
                  <FaHeartbeat className="text-green-400 text-xl" />
                </div>
                <div className="min-w-0">
                  <p className="text-gray-400 text-sm">Avg. Workout Time</p>
                  <p className="text-white font-semibold truncate">
                    {totalWorkouts
                      ? Math.round(calculateTotalWorkoutTime() / totalWorkouts)
                      : 0}{" "}
                    min
                  </p>
                </div>
              </div>

              {/* Average Calories */}
              <div className="bg-gray-700/30 rounded-lg p-4 flex items-center gap-4 transform hover:scale-[1.02] transition-all duration-300">
                <div className="p-3 bg-pink-500/10 rounded-lg shrink-0">
                  <FaFireAlt className="text-pink-400 text-xl" />
                </div>
                <div className="min-w-0">
                  <p className="text-gray-400 text-sm">Avg. Calories/Workout</p>
                  <p className="text-white font-semibold truncate">
                    {totalWorkouts
                      ? Math.round(calculateTotalCalories() / totalWorkouts)
                      : 0}{" "}
                    kcal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add a function to clear the workout plan
  const clearWorkoutPlan = () => {
    setWorkoutPlans(null);
    setIsPlanGenerated(false);
    localStorage.removeItem('workoutPlan');
  };

  // Add this useEffect to handle cleanup on unmount if needed
  useEffect(() => {
    // Load saved preferences
    const savedPreferences = localStorage.getItem('workoutPreferences');
    if (savedPreferences) {
      setUserPreferences(JSON.parse(savedPreferences));
    }

    return () => {
      // Optional: Clear the plan when component unmounts
      // Uncomment if you want to clear the plan when leaving the page
      // localStorage.removeItem('workoutPlan');
      // localStorage.removeItem('isPlanGenerated');
    };
  }, []);

  return (
    <>
      <div className="bg-black text-white p-5 shadow-blue-500 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl flex items-center gap-2 font-bold">
            <img src="/public/logo.gif" alt="" />
            <span className="text-blue-400">ZenFit</span> AnalyZer
          </div>

          <div className="hidden md:flex space-x-6 text-lg">
            <Link to="/home" className="hover:text-blue-400 transition">
              Home
            </Link>
            <Link to="/meal" className="hover:text-blue-400 transition">
              Meal
            </Link>
            <Link to="/workout" className="hover:text-blue-400 transition">
              Workout
            </Link>
            <Link to="/social" className="hover:text-blue-400 transition">
              Community
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setAdviceOpen(true)}
              onMouseLeave={() => setAdviceOpen(false)}
            >
              <div className=" hover:text-blue-400 transition">
                <button className="hover:text-blue-400 transition">
                  Advice
                </button>
                {adviceOpen && (
                  <div className="absolute left-0  w-40 bg-gray-900 text-white shadow-lg rounded-lg">
                    <Link
                      to="/fitness"
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      Fitness
                    </Link>
                    <Link
                      to="/nutrition"
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      Nutrition
                    </Link>
                    <Link
                      to="/selfcare"
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      Self-Care
                    </Link>
                    <Link
                      to="/wellness"
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      Wellness
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <Link to="/notification">
              <i className="ri-notification-3-line text-2xl text-blue-400"></i>
            </Link>
            <div className="hidden md:block">
              <button
                onClick={handleLogout}
                className="p-2 bg-black bg-opacity-50 rounded-full"
              >
                <i className="ri-logout-box-line text-2xl text-blue-400"></i>
              </button>
            </div>
          </div>

          <div className="md:hidden mt-2">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="bg-slate-900 md:hidden flex flex-col border border-blue-400 text-white mt-7 p-4 absolute top-16 left-0 w-96 mx-4 my-4 shadow-md rounded-md">
            <Link to="/home" className="py-2 px-4 hover:bg-gray-700 rounded-md">
              Home
            </Link>
            <Link to="/meal" className="py-2 px-4 hover:bg-gray-700 rounded-md">
              Meal
            </Link>
            <Link
              to="/workout"
              className="py-2 px-4 hover:bg-gray-700 rounded-md"
            >
              Workout
            </Link>
            <Link
              to="/social"
              className="py-2 px-4 hover:bg-gray-700 rounded-md"
            >
              community
            </Link>
            <div className="flex flex-col">
              <button className="py-2 px-4 hover:bg-gray-700  rounded-md">
                Advice
              </button>
              <div className="ml-4 space-y-2">
                <Link
                  to="/fitness"
                  className="block py-2 px-4 hover:bg-gray-600 rounded-md"
                >
                  Fitness
                </Link>
                <Link
                  to="/nutrition"
                  className="block py-2 px-4 hover:bg-gray-600 rounded-md"
                >
                  Nutrition
                </Link>
                <Link
                  to="/selfcare"
                  className="block py-2 px-4 hover:bg-gray-600 rounded-md"
                >
                  Self-Care
                </Link>
                <Link
                  to="/wellness"
                  className="block py-2 px-4 hover:bg-gray-600 rounded-md"
                >
                  Wellness
                </Link>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 mt-4 bg-gray-800 hover:bg-gray-700 rounded-md text-blue-400 text-lg w-full"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      <div className="min-h-screen mt-2 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* Hero Section */}
        {/* <div className="relative overflow-hidden mb-12"> */}
        <div className="absolute  bg-gradient-to-r from-emerald-500/20 to-blue-500/20"></div>
        <div className="container mx-auto px-4 py-20  z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
              Personalized Workout Plans
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transform your fitness journey with AI-powered workout plans
              tailored to your goals
            </p>
          </motion.div>
        </div>
        {/* </div> */}

        {/* Preference Selection - Now separate from WorkoutSections */}
        <div className="container mx-auto px-4 mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700">
            <h2 className="text-2xl font-semibold mb-8 flex items-center">
              <BiBody className="mr-2 text-3xl text-emerald-400" />
              Customize Your Plan
            </h2>
            
            {/* Preferences grid and generate button */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-gray-300 mb-2 flex items-center">
                  <GiMuscleUp className="mr-2" />
                  Fitness Level
                </label>
                <select
                  className="w-full bg-gray-700 rounded-lg p-3 border border-gray-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 transition-all"
                  value={userPreferences.fitnessLevel}
                  onChange={(e) =>
                    handlePreferencesChange("fitnessLevel", e.target.value)
                  }
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-gray-300 mb-2 flex items-center">
                  <FaHeart className="mr-2" />
                  Goal
                </label>
                <select
                  className="w-full bg-gray-700 rounded-lg p-3 border border-gray-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 transition-all"
                  value={userPreferences.goal}
                  onChange={(e) =>
                    handlePreferencesChange("goal", e.target.value)
                  }
                >
                  <option value="weightLoss">Weight Loss</option>
                  <option value="muscleGain">Muscle Gain</option>
                  <option value="endurance">Endurance</option>
                  <option value="strength">Strength</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-gray-300 mb-2 flex items-center">
                  <FaCalendar className="mr-2" />
                  Days per Week
                </label>
                <select
                  className="w-full bg-gray-700 rounded-lg p-3 border border-gray-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 transition-all"
                  value={userPreferences.daysPerWeek}
                  onChange={(e) =>
                    handlePreferencesChange(
                      "daysPerWeek",
                      parseInt(e.target.value)
                    )
                  }
                >
                  {[2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} days
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-gray-300 mb-2 flex items-center">
                  <FaDumbbell className="mr-2" />
                  Equipment
                </label>
                <select
                  className="w-full bg-gray-700 rounded-lg p-3 border border-gray-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 transition-all"
                  value={userPreferences.equipment}
                  onChange={(e) =>
                    handlePreferencesChange("equipment", e.target.value)
                  }
                >
                  {equipmentOptions.map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Generate Plan Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleGeneratePlan}
                className="bg-emerald-500 hover:bg-emerald-600 px-8 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 text-lg font-semibold"
              >
                <FaDumbbell className="text-xl" />
                Generate Workout Plan
              </button>
            </div>

            {/* Loading and Error states */}
            {loading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto"></div>
                <p className="mt-4 text-gray-300">
                  Generating your personalized workout plan...
                </p>
              </div>
            )}

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

            {/* Initial State Message */}
            {!isPlanGenerated && !loading && (
              <div className="text-center py-8">
                <p className="text-gray-300 text-lg mb-8">
                  Customize your preferences and click "Generate Workout Plan"
                  to create your personalized fitness program.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Generated Workout Plan Section */}
        {!loading && !error && workoutPlans && isPlanGenerated && (
          <div className="container mx-auto px-4 mb-12">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold flex items-center">
                  <FaCalendar className="mr-2 text-3xl text-emerald-400" />
                  Your Generated Workout Plan
                </h2>
                <button
                  onClick={clearWorkoutPlan}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300"
                >
                  <FaTrash />
                  Clear Plan
                </button>
              </div>
              <div className="space-y-12">
                {workoutPlans.workouts.map((workout, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold flex items-center">
                        <FaCalendar className="mr-2 text-emerald-400" />
                        Day {workout.day}
                      </h3>
                      <button
                        onClick={() => startWorkout(workout)}
                        className="bg-emerald-500 hover:bg-emerald-600 px-6 py-2 rounded-lg flex items-center gap-2"
                      >
                        <FaPlay />
                        Start Workout
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {workout.exercises.map((exercise, exIndex) => (
                        <ExerciseCard
                          key={exIndex}
                          exercise={exercise}
                          isActive={
                            activeWorkout &&
                            currentExerciseIndex === exIndex
                          }
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Exercise Modal */}
        {selectedExercise && (
          <ExerciseModal
            exercise={selectedExercise}
            onClose={() => setSelectedExercise(null)}
          />
        )}

        {/* Workout Progress */}
        {selectedPlan && (
          <WorkoutProgress
            workout={selectedPlan}
            currentExercise={selectedExercise}
          />
        )}

        {/* Workout History */}
        <WorkoutHistory />

        {/* Workout Statistics */}
        <WorkoutStatistics />

        {/* Active Workout Timer */}
        {activeWorkout && <ActiveWorkoutDisplay />}

        {/* Favorite Exercises Section */}
        {favoriteExercises.length > 0 && (
          <div className="w-full px-4 lg:px-6 mt-8 lg:mt-12">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-700 shadow-xl">
              {/* Header */}
              <div className="flex items-center gap-2 mb-6 lg:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                  <FaHeart className="text-red-400" />
                  <span className="bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
                    Favorite Exercises
                  </span>
                </h3>
              </div>

              {/* Exercises Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {favoriteExercises.map((exercise, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 transform hover:scale-[1.02] transition-all duration-300"
                  >
                    {/* Exercise Image/GIF Container */}
                    <div className="relative aspect-video bg-gray-900">
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

                      {/* Favorite Button Overlay */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(exercise);
                        }}
                        className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-all duration-300"
                      >
                        <FaHeart className="text-red-500 text-xl" />
                      </button>
                    </div>

                    {/* Exercise Details */}
                    <div className="p-4 lg:p-5">
                      <h4
                        className="text-lg font-semibold mb-3 text-white line-clamp-1"
                        title={exercise.name}
                      >
                        {exercise.name}
                      </h4>

                      <div className="space-y-2">
                        {/* Sets & Reps */}
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center text-gray-300">
                            <GiMuscleUp className="mr-2 text-emerald-400" />
                            {exercise.sets} sets × {exercise.reps}
                          </span>
                          <span className="text-emerald-400 text-xs px-2 py-1 bg-emerald-400/10 rounded-full">
                            {exercise.target}
                          </span>
                        </div>

                        {/* Equipment & Rest Time */}
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center text-gray-300">
                            <FaDumbbell className="mr-2 text-emerald-400" />
                            {exercise.equipment}
                          </span>
                          <span className="flex items-center text-gray-300">
                            <FaClock className="mr-2 text-emerald-400" />
                            {exercise.restTime}
                          </span>
                        </div>
                      </div>

                      {/* View Details Button */}
                      <div className="mt-4">
                        <button
                          onClick={() => setSelectedExercise(exercise)}
                          className="w-full bg-gray-700 hover:bg-gray-600 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                        >
                          <FaEye className="text-emerald-400" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {favoriteExercises.length === 0 && (
                <div className="text-center py-8 sm:py-12">
                  <div className="bg-gray-800/50 rounded-xl p-6 sm:p-8 max-w-md mx-auto">
                    <FaHeart className="text-red-400 text-3xl sm:text-4xl mx-auto mb-4 opacity-50" />
                    <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">
                      No Favorite Exercises Yet
                    </h4>
                    <p className="text-sm sm:text-base text-gray-400">
                      Click the heart icon on any exercise to add it to your
                      favorites for quick access.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {showCelebration && <WorkoutCelebration />}

        {/* Workout Articles Section - Now at the end */}
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent mb-4">
              Comprehensive Workout Guides
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Explore detailed training guides and learn proper techniques for different workout styles
            </p>
          </div>
          <WorkoutSections />
        </div>

        <style>{styles}</style>
        
      </div>
      <Footer/>
    </>
  );
};

export default Workout;