export const workoutData = [
    {
      level: "Beginner",
      workouts: [
        {
          type: "Upper Body",
          bodyParts: ["Chest", "Shoulders", "Arms", "Back"],
          exercises: {
            "Chest": [
              { name: "Push-ups", reps: 12, time: 30, image: "https://images.unsplash.com/photo-1566351557863-2da2b4c8c269?w=800&q=80" },
              { name: "Chest Dips", reps: 10, time: 30, image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80" },
              { name: "Incline Push-ups", reps: 15, time: 30, image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80" },
              { name: "Decline Push-ups", reps: 10, time: 30, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80" },
              { name: "Dumbbell Chest Press", reps: 12, time: 30, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80" }
            ],
            "Shoulders": [
              { name: "Shoulder Taps", reps: 12, time: 30, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80" },
              { name: "Dumbbell Shoulder Press", reps: 10, time: 30, image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80" },
              { name: "Lateral Raises", reps: 12, time: 30, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80" },
              { name: "Front Raises", reps: 12, time: 30, image: "https://images.unsplash.com/photo-1544216717-3bbf52512659?w=800&q=80" },
              { name: "Reverse Fly", reps: 10, time: 30, image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80" }
            ],
            "Arms": [
              { name: "Bicep Curls", reps: 12, time: 30, image: "https://images.unsplash.com/photo-1594765050594-7196fb54f2ac?w=800&q=80" },
              { name: "Triceps Dips", reps: 10, time: 30, image: "https://images.unsplash.com/photo-1526401485004-5952501fca2e?w=800&q=80" },
              { name: "Hammer Curls", reps: 12, time: 30, image: "https://images.unsplash.com/photo-1595777405565-dfb5b3a368b6?w=800&q=80" },
              { name: "Overhead Triceps Extension", reps: 12, time: 30, image: "https://images.unsplash.com/photo-1534367610403-ef2d84c27eb5?w=800&q=80" },
              { name: "Concentration Curls", reps: 10, time: 30, image: "https://images.unsplash.com/photo-1594381898411-846e7a6d8f1a?w=800&q=80" }
            ],
            "Back": [
              { name: "Pull-ups", reps: 10, time: 30, image: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=800&q=80" },
              { name: "Bent-over Rows", reps: 12, time: 30, image: "https://images.unsplash.com/photo-1572898829941-089fddc3a388?w=800&q=80" },
              { name: "Deadlifts", reps: 10, time: 30, image: "https://images.unsplash.com/photo-1589156191108-e1900a808c04?w=800&q=80" },
              { name: "Seated Cable Rows", reps: 12, time: 30, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80" },
              { name: "Lat Pulldown", reps: 12, time: 30, image: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=800&q=80" }
            ]
          }
        },
        {
          type: "Lower Body",
          bodyParts: ["Quads", "Hamstrings", "Glutes", "Calves"],
          exercises: {
            "Quads": [
              { name: "Bodyweight Squats", reps: 15, time: 30, image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80" },
              { name: "Lunges", reps: 12, time: 30, image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80" },
              { name: "Jump Squats", reps: 10, time: 30, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80" },
              { name: "Step-ups", reps: 12, time: 30, image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&q=80" },
              { name: "Wall Sit", reps: "Hold", time: 30, image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80" }
            ],
            "Hamstrings": [
              { name: "Romanian Deadlifts", reps: 12, time: 30, image: "https://images.unsplash.com/photo-1589156191108-e1900a808c04?w=800&q=80" },
              { name: "Leg Curls", reps: 15, time: 30, image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&q=80" },
              { name: "Good Mornings", reps: 12, time: 30, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80" }
            ],
            "Glutes": [
              { name: "Hip Thrusts", reps: 15, time: 30, image: "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=800&q=80" },
              { name: "Glute Bridges", reps: 20, time: 30, image: "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=800&q=80" },
              { name: "Fire Hydrants", reps: 12, time: 30, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80" }
            ],
            "Calves": [
              { name: "Standing Calf Raises", reps: 20, time: 30, image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&q=80" },
              { name: "Seated Calf Raises", reps: 15, time: 30, image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&q=80" },
              { name: "Jump Rope", reps: 50, time: 30, image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&q=80" }
            ]
          }
        },
        {
          type: "Core",
          bodyParts: ["Abs", "Obliques", "Lower Back"],
          exercises: {
            "Abs": [
              { name: "Plank", reps: "Hold", time: 30, image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=800&q=80" },
              { name: "Leg Raises", reps: 10, time: 30, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80" },
              { name: "Russian Twists", reps: 20, time: 30, image: "https://images.unsplash.com/photo-1544216717-3bbf52512659?w=800&q=80" },
              { name: "Sit-ups", reps: 15, time: 30, image: "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=800&q=80" },
              { name: "Bicycle Crunches", reps: 20, time: 30, image: "https://images.unsplash.com/photo-1572898829941-089fddc3a388?w=800&q=80" }
            ],
            "Obliques": [
              { name: "Side Planks", reps: "Hold", time: 30, image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=800&q=80" },
              { name: "Standing Side Bends", reps: 15, time: 30, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80" },
              { name: "Woodchoppers", reps: 12, time: 30, image: "https://images.unsplash.com/photo-1544216717-3bbf52512659?w=800&q=80" }
            ],
            "Lower Back": [
              { name: "Superman Hold", reps: "Hold", time: 30, image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=800&q=80" },
              { name: "Bird Dogs", reps: 12, time: 30, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80" },
              { name: "Back Extensions", reps: 15, time: 30, image: "https://images.unsplash.com/photo-1544216717-3bbf52512659?w=800&q=80" }
            ]
          }
        },
        {
          type: "Cardio",
          bodyParts: ["Full Body"],
          exercises: {
            "Full Body": [
              { name: "Jumping Jacks", reps: 30, time: 30, image: "https://images.unsplash.com/photo-1594777600030-1280171d60b6?w=800&q=80" },
              { name: "Burpees", reps: 15, time: 30, image: "https://images.unsplash.com/photo-1594765050594-7196fb54f2ac?w=800&q=80" },
              { name: "Mountain Climbers", reps: 40, time: 30, image: "https://images.unsplash.com/photo-1526401485004-5952501fca2e?w=800&q=80" },
              { name: "High Knees", reps: 30, time: 30, image: "https://images.unsplash.com/photo-1594381898411-846e7a6d8f1a?w=800&q=80" },
              { name: "Skaters", reps: 20, time: 30, image: "https://images.unsplash.com/photo-1589156191108-e1900a808c04?w=800&q=80" }
            ]
          }
        }
      ]
    },
    // Space for Intermediate level
    
    {
      level: "Intermediate",
      workouts: [
        {
          type: "Upper Body",
          bodyParts: ["Chest", "Shoulders", "Arms", "Back"],
          exercises: {
            "Chest": [
              { name: "Weighted Push-ups", reps: 15, time: "40 sec", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80" },
              { name: "Dumbbell Bench Press", reps: 12, time: "40 sec", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80" },
              { name: "Incline Dumbbell Press", reps: 12, time: "40 sec", image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80" },
              { name: "Decline Bench Press", reps: 12, time: "40 sec", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80" },
              { name: "Chest Flys", reps: 12, time: "40 sec", image: "https://images.unsplash.com/photo-1526401485004-5952501fca2e?w=800&q=80" }
            ],
            "Shoulders": [
              { name: "Dumbbell Shoulder Press", reps: 12, time: "40 sec", image: "https://images.unsplash.com/photo-1594765050594-7196fb54f2ac?w=800&q=80" },
              { name: "Arnold Press", reps: 12, time: "40 sec", image: "https://images.unsplash.com/photo-1595777405565-dfb5b3a368b6?w=800&q=80" },
              { name: "Upright Rows", reps: 12, time: "40 sec", image: "https://images.unsplash.com/photo-1594381898411-846e7a6d8f1a?w=800&q=80" },
              { name: "Reverse Flys", reps: 12, time: "40 sec", image: "https://images.unsplash.com/photo-1534367610403-ef2d84c27eb5?w=800&q=80" },
              { name: "Face Pulls", reps: 12, time: "40 sec", image: "https://images.unsplash.com/photo-1589156191108-e1900a808c04?w=800&q=80" }
            ],
            "Arms": [
              { name: "Bicep Curls", reps: 12, time: "40 sec", image: "https://images.unsplash.com/photo-1594381898411-846e7a6d8f1a?w=800&q=80" },
              { name: "Triceps Dips", reps: 12, time: "40 sec", image: "https://images.unsplash.com/photo-1526401485004-5952501fca2e?w=800&q=80" },
              { name: "Hammer Curls", reps: 12, time: "40 sec", image: "https://images.unsplash.com/photo-1595777405565-dfb5b3a368b6?w=800&q=80" },
              { name: "Overhead Triceps Extension", reps: 12, time: "40 sec", image: "https://images.unsplash.com/photo-1534367610403-ef2d84c27eb5?w=800&q=80" },
              { name: "Concentration Curls", reps: 12, time: "40 sec", image: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=800&q=80" }
            ],
            "Back": [
              { name: "Pull-ups", reps: 10, time: "40 sec", image: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=800&q=80" },
              { name: "Bent-over Rows", reps: 12, time: "40 sec", image: "https://images.unsplash.com/photo-1572898829941-089fddc3a388?w=800&q=80" },
              { name: "Deadlifts", reps: 10, time: "40 sec", image: "https://images.unsplash.com/photo-1589156191108-e1900a808c04?w=800&q=80" },
              { name: "Lat Pulldown", reps: 12, time: "40 sec", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80" },
              { name: "Seated Cable Rows", reps: 12, time: "40 sec", image: "https://images.unsplash.com/photo-1594765050594-7196fb54f2ac?w=800&q=80" }
            ]
          }
        },
        {
          type: "Core",
          bodyParts: ["Abs", "Obliques", "Lower Back"],
          exercises: {
            "Abs": [
              { name: "Plank", reps: "Hold", time: "40 sec", image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=800&q=80" },
              { name: "Leg Raises", reps: 12, time: "40 sec", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80" },
              { name: "Russian Twists", reps: 20, time: "40 sec", image: "https://images.unsplash.com/photo-1544216717-3bbf52512659?w=800&q=80" },
              { name: "Sit-ups", reps: 15, time: "40 sec", image: "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=800&q=80" },
              { name: "Bicycle Crunches", reps: 20, time: "40 sec", image: "https://images.unsplash.com/photo-1572898829941-089fddc3a388?w=800&q=80" }
            ]
          }
        },
  
        {
          type: "Lower Body",
          bodyParts: ["Quads", "Hamstrings", "Glutes", "Calves"],
          exercises: {
            "Quads": [
              { name: "Squats", reps: 12, time: "40 sec", image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80" },
              { name: "Lunges", reps: 12, time: "40 sec", image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80" }
            ],
            "Hamstrings": [
              { name: "Romanian Deadlifts", reps: 12, time: "40 sec", image: "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=800&q=80" },
              { name: "Hamstring Curls", reps: 12, time: "40 sec", image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&q=80" }
            ],
            "Glutes": [
              { name: "Glute Bridges", reps: 12, time: "40 sec", image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&q=80" },
              { name: "Hip Thrusts", reps: 12, time: "40 sec", image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=800&q=80" }
            ],
            "Calves": [
              { name: "Calf Raises", reps: 15, time: "40 sec", image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&q=80" },
              { name: "Seated Calf Raises", reps: 15, time: "40 sec", image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&q=80" }
            ]
          }
        },
  
        {
          type: "Cardio",
          bodyParts: ["Full Body"],
          exercises: {
            "Full Body": [
              { name: "Jumping Jacks", reps: 30, time: "40 sec", image: "https://images.unsplash.com/photo-1594777600030-1280171d60b6?w=800&q=80" },
              { name: "Burpees", reps: 15, time: "40 sec", image: "https://images.unsplash.com/photo-1594765050594-7196fb54f2ac?w=800&q=80" },
              { name: "Mountain Climbers", reps: 40, time: "40 sec", image: "https://images.unsplash.com/photo-1526401485004-5952501fca2e?w=800&q=80" },
              { name: "High Knees", reps: 30, time: "40 sec", image: "https://images.unsplash.com/photo-1594381898411-846e7a6d8f1a?w=800&q=80" },
              { name: "Skaters", reps: 20, time: "40 sec", image: "https://images.unsplash.com/photo-1589156191108-e1900a808c04?w=800&q=80" }
            ]
          }
        }
      ]
    },
    
    // Space for Advanced level
    
    {
      level: "Advanced",
      workouts: [
        {
          type: "Upper Body",
          bodyParts: ["Chest", "Shoulders", "Arms", "Back"],
          exercises: {
            "Chest": [
              { name: "Barbell Bench Press", reps: 8, time: "50 sec", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80" },
              { name: "Incline Dumbbell Press", reps: 10, time: "50 sec", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80" },
              { name: "Decline Barbell Press", reps: 8, time: "50 sec", image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80" },
              { name: "Dumbbell Flys", reps: 10, time: "50 sec", image: "https://images.unsplash.com/photo-1526401485004-5952501fca2e?w=800&q=80" },
              { name: "Cable Crossovers", reps: 12, time: "50 sec", image: "https://images.unsplash.com/photo-1534367610403-ef2d84c27eb5?w=800&q=80" }
            ],
            "Shoulders": [
              { name: "Seated Military Press", reps: 10, time: "50 sec", image: "https://images.unsplash.com/photo-1594765050594-7196fb54f2ac?w=800&q=80" },
              { name: "Lateral Raises", reps: 12, time: "50 sec", image: "https://images.unsplash.com/photo-1595777405565-dfb5b3a368b6?w=800&q=80" },
              { name: "Front Raises", reps: 12, time: "50 sec", image: "https://images.unsplash.com/photo-1594381898411-846e7a6d8f1a?w=800&q=80" },
              { name: "Face Pulls", reps: 12, time: "50 sec", image: "https://images.unsplash.com/photo-1534367610403-ef2d84c27eb5?w=800&q=80" },
              { name: "Shrugs", reps: 12, time: "50 sec", image: "https://images.unsplash.com/photo-1589156191108-e1900a808c04?w=800&q=80" }
            ],
            "Arms": [
              { name: "Weighted Dips", reps: 10, time: "50 sec", image: "https://images.unsplash.com/photo-1526401485004-5952501fca2e?w=800&q=80" },
              { name: "Barbell Curls", reps: 10, time: "50 sec", image: "https://images.unsplash.com/photo-1594381898411-846e7a6d8f1a?w=800&q=80" },
              { name: "Close-Grip Bench Press", reps: 10, time: "50 sec", image: "https://images.unsplash.com/photo-1589156191108-e1900a808c04?w=800&q=80" },
              { name: "Zottman Curls", reps: 12, time: "50 sec", image: "https://images.unsplash.com/photo-1595777405565-dfb5b3a368b6?w=800&q=80" },
              { name: "Overhead Dumbbell Triceps Extension", reps: 12, time: "50 sec", image: "https://images.unsplash.com/photo-1534367610403-ef2d84c27eb5?w=800&q=80" }
            ],
            "Back": [
              { name: "Deadlifts", reps: 8, time: "50 sec", image: "https://images.unsplash.com/photo-1589156191108-e1900a808c04?w=800&q=80" },
              { name: "Pull-ups", reps: 12, time: "50 sec", image: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=800&q=80" },
              { name: "Barbell Bent-over Rows", reps: 10, time: "50 sec", image: "https://images.unsplash.com/photo-1572898829941-089fddc3a388?w=800&q=80" },
              { name: "T-Bar Rows", reps: 10, time: "50 sec", image: "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=800&q=80" },
              { name: "Face Pulls", reps: 12, time: "50 sec", image: "https://images.unsplash.com/photo-1534367610403-ef2d84c27eb5?w=800&q=80" }
            ]
          }
        },
  
        {
          type: "Lower Body",
          bodyParts: ["Quads", "Hamstrings", "Glutes", "Calves"],
          exercises: {
            "Quads": [
              { name: "Back Squats", reps: 8, time: "50 sec", image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80" },
              { name: "Front Squats", reps: 10, time: "50 sec", image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80" },
              { name: "Bulgarian Split Squats", reps: 10, time: "50 sec", image: "https://images.unsplash.com/photo-1534367610403-ef2d84c27eb5?w=800&q=80" },
              { name: "Hack Squats", reps: 8, time: "50 sec", image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&q=80" },
              { name: "Leg Press", reps: 12, time: "50 sec", image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80" }
            ],
            "Hamstrings": [
              { name: "Romanian Deadlifts", reps: 10, time: "50 sec", image: "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=800&q=80" },
              { name: "Nordic Curls", reps: 8, time: "50 sec", image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&q=80" },
              { name: "Seated Leg Curls", reps: 12, time: "50 sec", image: "https://images.unsplash.com/photo-1526401485004-5952501fca2e?w=800&q=80" },
              { name: "Good Mornings", reps: 10, time: "50 sec", image: "https://images.unsplash.com/photo-1594381898411-846e7a6d8f1a?w=800&q=80" },
              { name: "Glute-Ham Raises", reps: 10, time: "50 sec", image: "https://images.unsplash.com/photo-1589156191108-e1900a808c04?w=800&q=80" }
            ],
            "Glutes": [
              { name: "Barbell Hip Thrusts", reps: 10, time: "50 sec", image: "https://images.unsplash.com/photo-1572898829941-089fddc3a388?w=800&q=80" },
              { name: "Cable Kickbacks", reps: 12, time: "50 sec", image: "https://images.unsplash.com/photo-1534367610403-ef2d84c27eb5?w=800&q=80" },
              { name: "Glute Bridges", reps: 12, time: "50 sec", image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&q=80" },
              { name: "Step-Ups", reps: 12, time: "50 sec", image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=800&q=80" },
              { name: "Lateral Band Walks", reps: 15, time: "50 sec", image: "https://images.unsplash.com/photo-1526401485004-5952501fca2e?w=800&q=80" }
            ],
            "Calves": [
              { name: "Standing Calf Raises", reps: 15, time: "50 sec", image: "https://images.unsplash.com/photo-1594765050594-7196fb54f2ac?w=800&q=80" },
              { name: "Seated Calf Raises", reps: 15, time: "50 sec", image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80" },
              { name: "Donkey Calf Raises", reps: 12, time: "50 sec", image: "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=800&q=80" },
              { name: "Jump Rope", reps: 100, time: "50 sec", image: "https://images.unsplash.com/photo-1594381898411-846e7a6d8f1a?w=800&q=80" },
              { name: "Tibialis Raises", reps: 12, time: "50 sec", image: "https://images.unsplash.com/photo-1526401485004-5952501fca2e?w=800&q=80" }
            ]
          }
        },
        {
          type: "Core",
          bodyParts: ["Abs", "Obliques", "Lower Back"],
          exercises: {
            "Abs": [
              { name: "Hanging Leg Raises", reps: 12, time: "50 sec", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80" },
              { name: "Ab Wheel Rollouts", reps: 10, time: "50 sec", image: "https://images.unsplash.com/photo-1544216717-3bbf52512659?w=800&q=80" },
              { name: "Decline Sit-ups", reps: 15, time: "50 sec", image: "https://images.unsplash.com/photo-1572898829941-089fddc3a388?w=800&q=80" },
              { name: "Russian Twists with Weight", reps: 20, time: "50 sec", image: "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=800&q=80" }
            ],
            "Obliques": [
              { name: "Cable Woodchoppers", reps: 12, time: "50 sec", image: "https://images.unsplash.com/photo-1534367610403-ef2d84c27eb5?w=800&q=80" },
              { name: "Side Planks", reps: "Hold", time: "50 sec", image: "https://images.unsplash.com/photo-1526401485004-5952501fca2e?w=800&q=80" },
              { name: "Twisting Hanging Leg Raises", reps: 12, time: "50 sec", image: "https://images.unsplash.com/photo-1594381898411-846e7a6d8f1a?w=800&q=80" }
            ],
            "Lower Back": [
              { name: "Hyperextensions", reps: 12, time: "50 sec", image: "https://images.unsplash.com/photo-1589156191108-e1900a808c04?w=800&q=80" },
              { name: "Good Mornings", reps: 10, time: "50 sec", image: "https://images.unsplash.com/photo-1594765050594-7196fb54f2ac?w=800&q=80" }
            ]
          }
        },
        {
          type: "Cardio",
          bodyParts: ["Full Body Conditioning"],
          exercises: {
            "Full Body Conditioning": [
              { name: "Burpees", reps: 15, time: "50 sec", image: "https://images.unsplash.com/photo-1594765050594-7196fb54f2ac?w=800&q=80" },
              { name: "Sprints", reps: "30 meters", time: "50 sec", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80" },
              { name: "Jump Rope", reps: 100, time: "50 sec", image: "https://images.unsplash.com/photo-1594381898411-846e7a6d8f1a?w=800&q=80" },
              { name: "Rowing Machine", reps: "500 meters", time: "50 sec", image: "https://images.unsplash.com/photo-1526401485004-5952501fca2e?w=800&q=80" }
            ]
          }
        }
      ]
    }
  ];