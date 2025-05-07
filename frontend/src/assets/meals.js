// First, declare the mealsData array
const mealsData = [
  // ================== North Indian ==================
  {
    region: "North Indian",
    dietaryCondition: "Diabetes-Friendly",
    meals: [
      // Breakfast (Veg) - Existing
      {
        mealType: "Breakfast",
        vegNonVeg: "Veg",
        dishName: "Methi Thepla with Greek Yogurt",
        calories: 180,
        protein: 6,
        carbs: 25,
        fat: 5,
        description: "A nutritious Gujarati flatbread made with fenugreek leaves and whole wheat flour.",
        ingredients: ["1 cup whole wheat flour", "1/4 cup chopped methi", "2 tbsp Greek yogurt", "Salt"],
        steps: ["Mix all ingredients", "Knead dough", "Roll and cook on tawa", "Serve with yogurt"]
      },
      // Breakfast (Veg) - Added
      {
        mealType: "Breakfast",
        vegNonVeg: "Veg",
        dishName: "Oats Upma",
        calories: 200,
        protein: 8,
        carbs: 30,
        fat: 5,
        description: "A low-sodium breakfast made with oats and vegetables.",
        ingredients: ["1 cup oats", "Mixed vegetables", "1 tsp olive oil", "Low-sodium spices"],
        steps: ["Dry roast oats", "Sauté vegetables", "Mix and cook", "Serve hot"]
      },
      // Breakfast (Veg) - Added
      {
        mealType: "Breakfast",
        vegNonVeg: "Veg",
        dishName: "Besan Chilla",
        calories: 150,
        protein: 8,
        carbs: 15,
        fat: 5,
        description: "A protein-rich pancake made with chickpea flour.",
        ingredients: ["1 cup besan", "Onion", "Green chilies", "Spices"],
        steps: ["Prepare batter", "Cook on tawa", "Serve with chutney"]
      },
      // Breakfast (Non-Veg) - Added
      {
        mealType: "Breakfast",
        vegNonVeg: "Non-Veg",
        dishName: "Egg Bhurji with Multigrain Toast",
        calories: 220,
        protein: 18,
        carbs: 15,
        fat: 10,
        description: "Scrambled eggs with spices served on multigrain bread.",
        ingredients: ["2 eggs", "Onion", "Tomato", "Multigrain bread"],
        steps: ["Sauté onions/tomatoes", "Add eggs", "Serve with toasted bread"]
      },
      // Breakfast (Non-Veg) - Added
      {
        mealType: "Breakfast",
        vegNonVeg: "Non-Veg",
        dishName: "Keema Paratha",
        calories: 250,
        protein: 20,
        carbs: 20,
        fat: 12,
        description: "Whole wheat paratha stuffed with spiced minced meat.",
        ingredients: ["200g minced meat", "Whole wheat flour", "Onion", "Spices"],
        steps: ["Prepare stuffing", "Stuff paratha", "Cook on tawa"]
      },
      // Breakfast (Non-Veg) - Added
      {
        mealType: "Breakfast",
        vegNonVeg: "Non-Veg",
        dishName: "Poha with Egg",
        calories: 200,
        protein: 12,
        carbs: 25,
        fat: 8,
        description: "Flattened rice cooked with turmeric and topped with a boiled egg.",
        ingredients: ["1 cup poha", "1 boiled egg", "Turmeric", "Peanuts"],
        steps: ["Cook poha", "Top with egg", "Serve hot"]
      },
      // Lunch (Veg) - Existing
      {
        mealType: "Lunch",
        vegNonVeg: "Veg",
        dishName: "Rajma Brown Rice",
        calories: 350,
        protein: 15,
        carbs: 55,
        fat: 10,
        description: "A fiber-rich meal of kidney beans in tomato gravy served with brown rice.",
        ingredients: ["1 cup rajma", "1 onion", "2 tomatoes", "Spices"],
        steps: ["Soak rajma overnight", "Cook with onions and tomatoes", "Serve with brown rice"]
      },
      // Lunch (Veg) - Added
      {
        mealType: "Lunch",
        vegNonVeg: "Veg",
        dishName: "Palak Paneer with Roti",
        calories: 320,
        protein: 18,
        carbs: 25,
        fat: 15,
        description: "Spinach and cottage cheese curry with whole wheat roti.",
        ingredients: ["200g paneer", "2 cups spinach", "Garlic", "Whole wheat flour"],
        steps: ["Blanch spinach", "Prepare gravy", "Cook paneer", "Serve with roti"]
      },
      // Lunch (Veg) - Added
      {
        mealType: "Lunch",
        vegNonVeg: "Veg",
        dishName: "Vegetable Khichdi",
        calories: 280,
        protein: 10,
        carbs: 40,
        fat: 8,
        description: "A light and comforting one-pot meal with rice and lentils.",
        ingredients: ["1/2 cup rice", "1/2 cup moong dal", "Mixed vegetables", "Spices"],
        steps: ["Cook rice and dal", "Add vegetables", "Serve with yogurt"]
      },
      // Lunch (Non-Veg) - Added
      {
        mealType: "Lunch",
        vegNonVeg: "Non-Veg",
        dishName: "Chicken Curry with Brown Rice",
        calories: 340,
        protein: 28,
        carbs: 30,
        fat: 12,
        description: "Spicy chicken curry with fiber-rich brown rice.",
        ingredients: ["300g chicken", "Onion", "Tomato", "Coconut milk"],
        steps: ["Sauté onions", "Cook chicken", "Add spices", "Serve with rice"]
      },
      // Lunch (Non-Veg) - Added
      {
        mealType: "Lunch",
        vegNonVeg: "Non-Veg",
        dishName: "Mutton Biryani",
        calories: 400,
        protein: 25,
        carbs: 50,
        fat: 15,
        description: "Aromatic rice dish with tender mutton pieces.",
        ingredients: ["500g mutton", "Basmati rice", "Yogurt", "Spices"],
        steps: ["Marinate mutton", "Cook rice", "Layer and cook", "Serve hot"]
      },
      // Lunch (Non-Veg) - Added
      {
        mealType: "Lunch",
        vegNonVeg: "Non-Veg",
        dishName: "Fish Curry with Steamed Rice",
        calories: 340,
        protein: 25,
        carbs: 40,
        fat: 10,
        description: "Bengali-style fish curry with mustard and spices.",
        ingredients: ["500g fish", "Mustard paste", "Turmeric", "Green chilies"],
        steps: ["Marinate fish", "Prepare mustard gravy", "Cook fish in gravy", "Serve with rice"]
      },
      // Dinner (Veg) - Added
      {
        mealType: "Dinner",
        vegNonVeg: "Veg",
        dishName: "Baingan Bharta",
        calories: 200,
        protein: 6,
        carbs: 25,
        fat: 8,
        description: "Smoky mashed eggplant with spices.",
        ingredients: ["2 eggplants", "Onion", "Tomato", "Spices"],
        steps: ["Roast eggplant", "Mash and sauté", "Serve with roti"]
      },
      // Dinner (Veg) - Added
      {
        mealType: "Dinner",
        vegNonVeg: "Veg",
        dishName: "Vegetable Pulao",
        calories: 250,
        protein: 8,
        carbs: 40,
        fat: 6,
        description: "Fragrant rice cooked with mixed vegetables.",
        ingredients: ["1 cup basmati rice", "Mixed vegetables", "Spices", "Ghee"],
        steps: ["Sauté vegetables", "Cook rice", "Mix and serve"]
      },
      // Dinner (Veg) - Added
      {
        mealType: "Dinner",
        vegNonVeg: "Veg",
        dishName: "Dal Tadka",
        calories: 220,
        protein: 10,
        carbs: 30,
        fat: 6,
        description: "Tempered lentil soup with spices.",
        ingredients: ["1 cup toor dal", "Tomato", "Onion", "Spices"],
        steps: ["Cook dal", "Prepare tempering", "Mix and serve"]
      },
      // Dinner (Non-Veg) - Existing
      {
        mealType: "Dinner",
        vegNonVeg: "Non-Veg",
        dishName: "Grilled Chicken Tikka",
        calories: 300,
        protein: 35,
        carbs: 10,
        fat: 12,
        description: "Juicy chicken pieces marinated in spices and grilled to perfection.",
        ingredients: ["200g chicken breast", "Yogurt", "Tandoori masala", "Lemon juice"],
        steps: ["Marinate chicken", "Grill until done", "Serve with mint chutney"]
      },
      // Dinner (Non-Veg) - Added
      {
        mealType: "Dinner",
        vegNonVeg: "Non-Veg",
        dishName: "Butter Chicken",
        calories: 350,
        protein: 30,
        carbs: 20,
        fat: 15,
        description: "Creamy tomato-based chicken curry.",
        ingredients: ["300g chicken", "Tomato", "Cream", "Spices"],
        steps: ["Marinate chicken", "Prepare gravy", "Cook chicken", "Serve with naan"]
      },
      // Dinner (Non-Veg) - Added
      {
        mealType: "Dinner",
        vegNonVeg: "Non-Veg",
        dishName: "Fish Fry",
        calories: 280,
        protein: 25,
        carbs: 10,
        fat: 12,
        description: "Crispy fried fish with spices.",
        ingredients: ["500g fish", "Turmeric", "Red chili powder", "Rice flour"],
        steps: ["Marinate fish", "Coat with spices", "Shallow fry"]
      }
    ]
  },
  {
    region: "North Indian",
    dietaryCondition: "Hypertension-Friendly",
    meals: [
      // Breakfast (Veg) - Added
      {
        mealType: "Breakfast",
        vegNonVeg: "Veg",
        dishName: "Quinoa Poha",
        calories: 180,
        protein: 6,
        carbs: 25,
        fat: 5,
        description: "A low-sodium version of poha made with quinoa.",
        ingredients: ["1 cup quinoa flakes", "Peanuts", "Turmeric", "Curry leaves"],
        steps: ["Wash quinoa flakes", "Sauté peanuts", "Mix and cook", "Serve hot"]
      },
      // Breakfast (Veg) - Added
      {
        mealType: "Breakfast",
        vegNonVeg: "Veg",
        dishName: "Vegetable Stuffed Paratha",
        calories: 220,
        protein: 8,
        carbs: 30,
        fat: 6,
        description: "Whole wheat paratha stuffed with mixed vegetables.",
        ingredients: ["1 cup whole wheat flour", "Mixed vegetables", "Spices", "1 tsp oil"],
        steps: ["Prepare dough", "Stuff with vegetables", "Cook on tawa", "Serve with yogurt"]
      },
      // Breakfast (Veg) - Added
      {
        mealType: "Breakfast",
        vegNonVeg: "Veg",
        dishName: "Oats Idli",
        calories: 150,
        protein: 6,
        carbs: 20,
        fat: 3,
        description: "Steamed idlis made with oats and semolina.",
        ingredients: ["1 cup oats", "1/2 cup semolina", "Curd", "Salt substitute"],
        steps: ["Grind oats", "Prepare batter", "Steam idlis", "Serve with chutney"]
      },
      // Breakfast (Non-Veg) - Added
      {
        mealType: "Breakfast",
        vegNonVeg: "Non-Veg",
        dishName: "Egg White Omelette",
        calories: 150,
        protein: 15,
        carbs: 5,
        fat: 8,
        description: "A low-sodium omelette made with egg whites.",
        ingredients: ["3 egg whites", "Spinach", "Tomato", "Olive oil"],
        steps: ["Whisk egg whites", "Add vegetables", "Cook on pan", "Serve hot"]
      },
      // Breakfast (Non-Veg) - Added
      {
        mealType: "Breakfast",
        vegNonVeg: "Non-Veg",
        dishName: "Chicken Sandwich",
        calories: 250,
        protein: 20,
        carbs: 25,
        fat: 8,
        description: "Whole grain bread sandwich with grilled chicken.",
        ingredients: ["2 slices whole grain bread", "100g chicken breast", "Lettuce", "Tomato"],
        steps: ["Grill chicken", "Assemble sandwich", "Serve hot"]
      },
      // Breakfast (Non-Veg) - Added
      {
        mealType: "Breakfast",
        vegNonVeg: "Non-Veg",
        dishName: "Poha with Egg Whites",
        calories: 200,
        protein: 12,
        carbs: 25,
        fat: 6,
        description: "Flattened rice cooked with turmeric and egg whites.",
        ingredients: ["1 cup poha", "2 egg whites", "Turmeric", "Peanuts"],
        steps: ["Cook poha", "Add egg whites", "Serve hot"]
      },
      // Lunch (Veg) - Added
      {
        mealType: "Lunch",
        vegNonVeg: "Veg",
        dishName: "Vegetable Khichdi",
        calories: 280,
        protein: 10,
        carbs: 40,
        fat: 8,
        description: "A light and comforting one-pot meal with rice and lentils.",
        ingredients: ["1/2 cup rice", "1/2 cup moong dal", "Mixed vegetables", "Spices"],
        steps: ["Cook rice and dal", "Add vegetables", "Serve with yogurt"]
      },
      // Lunch (Veg) - Added
      {
        mealType: "Lunch",
        vegNonVeg: "Veg",
        dishName: "Palak Dal",
        calories: 250,
        protein: 12,
        carbs: 35,
        fat: 6,
        description: "Spinach and lentil soup with minimal salt.",
        ingredients: ["1 cup toor dal", "2 cups spinach", "Garlic", "Spices"],
        steps: ["Cook dal", "Add spinach", "Temper with spices", "Serve hot"]
      },
      // Lunch (Veg) - Added
      {
        mealType: "Lunch",
        vegNonVeg: "Veg",
        dishName: "Vegetable Stew",
        calories: 220,
        protein: 6,
        carbs: 35,
        fat: 5,
        description: "A light coconut-based stew with mixed vegetables.",
        ingredients: ["Mixed vegetables", "Coconut milk", "Curry leaves", "Spices"],
        steps: ["Cook vegetables", "Prepare stew", "Serve hot"]
      },
      // Lunch (Non-Veg) - Added
      {
        mealType: "Lunch",
        vegNonVeg: "Non-Veg",
        dishName: "Grilled Chicken Salad",
        calories: 280,
        protein: 30,
        carbs: 12,
        fat: 8,
        description: "Grilled chicken with fresh vegetables and lemon dressing.",
        ingredients: ["200g chicken breast", "Lettuce", "Cucumber", "Lemon juice"],
        steps: ["Grill chicken", "Chop vegetables", "Toss with dressing"]
      },
      // Lunch (Non-Veg) - Added
      {
        mealType: "Lunch",
        vegNonVeg: "Non-Veg",
        dishName: "Fish Curry with Steamed Rice",
        calories: 340,
        protein: 25,
        carbs: 40,
        fat: 10,
        description: "Bengali-style fish curry with mustard and spices.",
        ingredients: ["500g fish", "Mustard paste", "Turmeric", "Green chilies"],
        steps: ["Marinate fish", "Prepare mustard gravy", "Cook fish in gravy", "Serve with rice"]
      },
      // Lunch (Non-Veg) - Added
      {
        mealType: "Lunch",
        vegNonVeg: "Non-Veg",
        dishName: "Chicken Stew",
        calories: 300,
        protein: 25,
        carbs: 20,
        fat: 12,
        description: "A light coconut-based stew with chicken.",
        ingredients: ["300g chicken", "Coconut milk", "Potatoes", "Spices"],
        steps: ["Cook chicken", "Prepare stew", "Serve hot"]
      },
      // Dinner (Veg) - Added
      {
        mealType: "Dinner",
        vegNonVeg: "Veg",
        dishName: "Moong Dal Khichdi",
        calories: 250,
        protein: 12,
        carbs: 35,
        fat: 5,
        description: "Light lentil-rice dish with minimal spices.",
        ingredients: ["1/2 cup moong dal", "1/2 cup rice", "Turmeric", "Ghee"],
        steps: ["Cook dal and rice", "Temper with spices", "Serve hot"]
      },
      // Dinner (Veg) - Added
      {
        mealType: "Dinner",
        vegNonVeg: "Veg",
        dishName: "Vegetable Pulao",
        calories: 250,
        protein: 8,
        carbs: 40,
        fat: 6,
        description: "Fragrant rice cooked with mixed vegetables.",
        ingredients: ["1 cup basmati rice", "Mixed vegetables", "Spices", "Ghee"],
        steps: ["Sauté vegetables", "Cook rice", "Mix and serve"]
      },
      // Dinner (Veg) - Added
      {
        mealType: "Dinner",
        vegNonVeg: "Veg",
        dishName: "Baingan Bharta",
        calories: 200,
        protein: 6,
        carbs: 25,
        fat: 8,
        description: "Smoky mashed eggplant with spices.",
        ingredients: ["2 eggplants", "Onion", "Tomato", "Spices"],
        steps: ["Roast eggplant", "Mash and sauté", "Serve with roti"]
      },
      // Dinner (Non-Veg) - Added
      {
        mealType: "Dinner",
        vegNonVeg: "Non-Veg",
        dishName: "Herb-Grilled Chicken",
        calories: 250,
        protein: 30,
        carbs: 5,
        fat: 12,
        description: "Low-sodium grilled chicken with herbs and spices.",
        ingredients: ["200g chicken breast", "Fresh herbs", "Lemon juice", "Olive oil"],
        steps: ["Marinate with herbs", "Grill until done", "Rest for 5 minutes", "Serve with salad"]
      },
      // Dinner (Non-Veg) - Added
      {
        mealType: "Dinner",
        vegNonVeg: "Non-Veg",
        dishName: "Fish Fry",
        calories: 280,
        protein: 25,
        carbs: 10,
        fat: 12,
        description: "Crispy fried fish with spices.",
        ingredients: ["500g fish", "Turmeric", "Red chili powder", "Rice flour"],
        steps: ["Marinate fish", "Coat with spices", "Shallow fry"]
      },
      // Dinner (Non-Veg) - Added
      {
        mealType: "Dinner",
        vegNonVeg: "Non-Veg",
        dishName: "Chicken Curry",
        calories: 300,
        protein: 25,
        carbs: 20,
        fat: 12,
        description: "A light chicken curry with minimal salt.",
        ingredients: ["300g chicken", "Onion", "Tomato", "Spices"],
        steps: ["Sauté onions", "Cook chicken", "Add spices", "Serve hot"]
      }
    ]
  },
  // ================== South Indian ==================
  {
    region: "South Indian",
    dietaryCondition: "Diabetes-Friendly",
    meals: [
      // Breakfast (Veg) - Existing
      {
        mealType: "Breakfast",
        vegNonVeg: "Veg",
        dishName: "Ragi Dosa",
        calories: 150,
        protein: 5,
        carbs: 20,
        fat: 3,
        description: "A healthy dosa variant made with finger millet flour.",
        ingredients: ["1 cup ragi flour", "1/2 cup rice flour", "Cumin seeds", "Salt"],
        steps: ["Mix flours and spices", "Make thin batter", "Cook on hot tawa", "Serve with chutney"]
      },
      // Breakfast (Veg) - Added
      {
        mealType: "Breakfast",
        vegNonVeg: "Veg",
        dishName: "Pesarattu",
        calories: 150,
        protein: 6,
        carbs: 20,
        fat: 3,
        description: "A green gram dosa, rich in protein and fiber.",
        ingredients: ["1 cup green gram", "Ginger", "Green chilies", "Salt"],
        steps: ["Soak green gram", "Grind into batter", "Cook on tawa", "Serve with chutney"]
      },
      // Breakfast (Veg) - Added
      {
        mealType: "Breakfast",
        vegNonVeg: "Veg",
        dishName: "Idli with Sambar",
        calories: 180,
        protein: 8,
        carbs: 30,
        fat: 2,
        description: "Steamed rice cakes served with lentil soup.",
        ingredients: ["Idli batter", "Toor dal", "Vegetables", "Spices"],
        steps: ["Prepare batter", "Steam idlis", "Serve with sambar"]
      },
      // Breakfast (Non-Veg) - Added
      {
        mealType: "Breakfast",
        vegNonVeg: "Non-Veg",
        dishName: "Egg Dosa",
        calories: 180,
        protein: 12,
        carbs: 15,
        fat: 8,
        description: "Dosa with a layer of scrambled eggs.",
        ingredients: ["Dosa batter", "2 eggs", "Onion", "Green chilies"],
        steps: ["Spread dosa batter", "Add egg mixture", "Cook until crisp"]
      },
      // Breakfast (Non-Veg) - Added
      {
        mealType: "Breakfast",
        vegNonVeg: "Non-Veg",
        dishName: "Chicken Uttapam",
        calories: 200,
        protein: 15,
        carbs: 20,
        fat: 8,
        description: "Thick pancake topped with chicken and vegetables.",
        ingredients: ["Dosa batter", "100g chicken", "Onion", "Tomato"],
        steps: ["Prepare batter", "Top with chicken", "Cook on tawa"]
      },
      // Breakfast (Non-Veg) - Added
      {
        mealType: "Breakfast",
        vegNonVeg: "Non-Veg",
        dishName: "Keema Dosa",
        calories: 220,
        protein: 18,
        carbs: 20,
        fat: 10,
        description: "Dosa stuffed with spiced minced meat.",
        ingredients: ["Dosa batter", "200g minced meat", "Onion", "Spices"],
        steps: ["Prepare stuffing", "Stuff dosa", "Cook on tawa"]
      },
      // Lunch (Veg) - Existing
      {
        mealType: "Lunch",
        vegNonVeg: "Veg",
        dishName: "Millet Bisibelebath",
        calories: 280,
        protein: 10,
        carbs: 45,
        fat: 6,
        description: "A nutritious one-pot meal made with millets and lentils.",
        ingredients: ["1 cup mixed millets", "1/2 cup toor dal", "Mixed vegetables", "Spices"],
        steps: ["Cook millets and dal", "Prepare vegetables", "Mix with spices", "Garnish and serve"]
      },
      // Lunch (Veg) - Added
      {
        mealType: "Lunch",
        vegNonVeg: "Veg",
        dishName: "Vegetable Sambar Rice",
        calories: 250,
        protein: 8,
        carbs: 40,
        fat: 5,
        description: "Lentil soup with rice and vegetables.",
        ingredients: ["Toor dal", "Rice", "Vegetables", "Spices"],
        steps: ["Cook dal", "Prepare rice", "Mix and serve"]
      },
      // Lunch (Veg) - Added
      {
        mealType: "Lunch",
        vegNonVeg: "Veg",
        dishName: "Avial with Rice",
        calories: 220,
        protein: 6,
        carbs: 35,
        fat: 5,
        description: "Mixed vegetable curry with coconut and yogurt.",
        ingredients: ["Mixed vegetables", "Coconut", "Yogurt", "Curry leaves"],
        steps: ["Cook vegetables", "Prepare coconut paste", "Mix and serve"]
      },
      // Lunch (Non-Veg) - Added
      {
        mealType: "Lunch",
        vegNonVeg: "Non-Veg",
        dishName: "Chicken Curry with Brown Rice",
        calories: 340,
        protein: 28,
        carbs: 30,
        fat: 12,
        description: "Spicy chicken curry with fiber-rich brown rice.",
        ingredients: ["300g chicken", "Onion", "Tomato", "Coconut milk"],
        steps: ["Sauté onions", "Cook chicken", "Add spices", "Serve with rice"]
      },
      // Lunch (Non-Veg) - Added
      {
        mealType: "Lunch",
        vegNonVeg: "Non-Veg",
        dishName: "Fish Curry with Steamed Rice",
        calories: 340,
        protein: 25,
        carbs: 40,
        fat: 10,
        description: "Kerala-style fish curry with coconut milk.",
        ingredients: ["500g fish", "Coconut milk", "Curry leaves", "Turmeric"],
        steps: ["Marinate fish", "Prepare gravy", "Cook fish in gravy", "Serve with rice"]
      },
      // Lunch (Non-Veg) - Added
      {
        mealType: "Lunch",
        vegNonVeg: "Non-Veg",
        dishName: "Prawn Curry with Rice",
        calories: 320,
        protein: 25,
        carbs: 35,
        fat: 10,
        description: "Spicy prawn curry with steamed rice.",
        ingredients: ["500g prawns", "Coconut milk", "Onion", "Spices"],
        steps: ["Marinate prawns", "Prepare gravy", "Cook prawns", "Serve with rice"]
      },
      // Dinner (Veg) - Added
      {
        mealType: "Dinner",
        vegNonVeg: "Veg",
        dishName: "Curd Rice",
        calories: 180,
        protein: 6,
        carbs: 30,
        fat: 4,
        description: "Cooling and probiotic-rich rice dish with yogurt.",
        ingredients: ["1 cup rice", "2 cups curd", "Curry leaves", "Pomegranate seeds"],
        steps: ["Cook rice", "Mix with curd", "Add tempering", "Garnish and serve"]
      },
      // Dinner (Veg) - Added
      {
        mealType: "Dinner",
        vegNonVeg: "Veg",
        dishName: "Vegetable Stew with Appam",
        calories: 200,
        protein: 6,
        carbs: 35,
        fat: 4,
        description: "A light coconut-based stew with mixed vegetables.",
        ingredients: ["Mixed vegetables", "Coconut milk", "Curry leaves", "Spices"],
        steps: ["Cook vegetables", "Prepare coconut stew", "Serve with appam"]
      },
      // Dinner (Veg) - Added
      {
        mealType: "Dinner",
        vegNonVeg: "Veg",
        dishName: "Moong Dal Khichdi",
        calories: 250,
        protein: 12,
        carbs: 35,
        fat: 5,
        description: "Light lentil-rice dish with minimal spices.",
        ingredients: ["1/2 cup moong dal", "1/2 cup rice", "Turmeric", "Ghee"],
        steps: ["Cook dal and rice", "Temper with spices", "Serve hot"]
      },
      // Dinner (Non-Veg) - Existing
      {
        mealType: "Dinner",
        vegNonVeg: "Non-Veg",
        dishName: "Fish Moilee",
        calories: 320,
        protein: 28,
        carbs: 12,
        fat: 18,
        description: "Kerala-style fish curry with coconut milk.",
        ingredients: ["500g fish fillets", "Coconut milk", "Curry leaves", "Turmeric"],
        steps: ["Marinate fish", "Prepare coconut gravy", "Cook fish in gravy", "Serve hot"]
      },
      // Dinner (Non-Veg) - Added
      {
        mealType: "Dinner",
        vegNonVeg: "Non-Veg",
        dishName: "Chicken Stew with Appam",
        calories: 300,
        protein: 25,
        carbs: 20,
        fat: 12,
        description: "Coconut-based chicken stew served with appam.",
        ingredients: ["300g chicken", "Coconut milk", "Potatoes", "Spices"],
        steps: ["Cook chicken", "Prepare stew", "Serve with appam"]
      },
      // Dinner (Non-Veg) - Added
      {
        mealType: "Dinner",
        vegNonVeg: "Non-Veg",
        dishName: "Prawn Fry",
        calories: 280,
        protein: 25,
        carbs: 10,
        fat: 12,
        description: "Spicy fried prawns with curry leaves.",
        ingredients: ["500g prawns", "Turmeric", "Red chili powder", "Curry leaves"],
        steps: ["Marinate prawns", "Shallow fry", "Serve hot"]
      }
    ]
  },
  {
    region: "South Indian",
    dietaryCondition: "Hypertension-Friendly",
    meals: [
      // Breakfast (Veg) - Added
      {
        mealType: "Breakfast",
        vegNonVeg: "Veg",
        dishName: "Quinoa Idli",
        calories: 120,
        protein: 6,
        carbs: 15,
        fat: 2,
        description: "Steamed quinoa and rice cakes, perfect for low-sodium diet.",
        ingredients: ["1 cup quinoa", "1/2 cup rice", "Urad dal", "Salt substitute"],
        steps: ["Grind ingredients", "Ferment batter", "Steam idlis", "Serve with chutney"]
      },
      // Breakfast (Veg) - Added
      {
        mealType: "Breakfast",
        vegNonVeg: "Veg",
        dishName: "Ragi Dosa",
        calories: 150,
        protein: 5,
        carbs: 20,
        fat: 3,
        description: "A healthy dosa variant made with finger millet flour.",
        ingredients: ["1 cup ragi flour", "1/2 cup rice flour", "Cumin seeds", "Salt"],
        steps: ["Mix flours and spices", "Make thin batter", "Cook on hot tawa", "Serve with chutney"]
      },
      // Breakfast (Veg) - Added
      {
        mealType: "Breakfast",
        vegNonVeg: "Veg",
        dishName: "Oats Upma",
        calories: 200,
        protein: 8,
        carbs: 30,
        fat: 5,
        description: "A low-sodium breakfast made with oats and vegetables.",
        ingredients: ["1 cup oats", "Mixed vegetables", "1 tsp olive oil", "Low-sodium spices"],
        steps: ["Dry roast oats", "Sauté vegetables", "Mix and cook", "Serve hot"]
      },
      // Breakfast (Non-Veg) - Added
      {
        mealType: "Breakfast",
        vegNonVeg: "Non-Veg",
        dishName: "Egg White Dosa",
        calories: 150,
        protein: 12,
        carbs: 15,
        fat: 5,
        description: "Dosa made with egg whites for a low-sodium option.",
        ingredients: ["Dosa batter", "2 egg whites", "Onion", "Green chilies"],
        steps: ["Spread dosa batter", "Add egg whites", "Cook until crisp"]
      },
      // Breakfast (Non-Veg) - Added
      {
        mealType: "Breakfast",
        vegNonVeg: "Non-Veg",
        dishName: "Chicken Sandwich",
        calories: 250,
        protein: 20,
        carbs: 25,
        fat: 8,
        description: "Whole grain bread sandwich with grilled chicken.",
        ingredients: ["2 slices whole grain bread", "100g chicken breast", "Lettuce", "Tomato"],
        steps: ["Grill chicken", "Assemble sandwich", "Serve hot"]
      },
      // Breakfast (Non-Veg) - Added
      {
        mealType: "Breakfast",
        vegNonVeg: "Non-Veg",
        dishName: "Poha with Egg Whites",
        calories: 200,
        protein: 12,
        carbs: 25,
        fat: 6,
        description: "Flattened rice cooked with turmeric and egg whites.",
        ingredients: ["1 cup poha", "2 egg whites", "Turmeric", "Peanuts"],
        steps: ["Cook poha", "Add egg whites", "Serve hot"]
      },
      // Lunch (Veg) - Added
      {
        mealType: "Lunch",
        vegNonVeg: "Veg",
        dishName: "Vegetable Sambar Rice",
        calories: 250,
        protein: 8,
        carbs: 40,
        fat: 5,
        description: "Lentil soup with rice and vegetables.",
        ingredients: ["Toor dal", "Rice", "Vegetables", "Spices"],
        steps: ["Cook dal", "Prepare rice", "Mix and serve"]
      },
      // Lunch (Veg) - Added
      {
        mealType: "Lunch",
        vegNonVeg: "Veg",
        dishName: "Avial with Rice",
        calories: 220,
        protein: 6,
        carbs: 35,
        fat: 5,
        description: "Mixed vegetable curry with coconut and yogurt.",
        ingredients: ["Mixed vegetables", "Coconut", "Yogurt", "Curry leaves"],
        steps: ["Cook vegetables", "Prepare coconut paste", "Mix and serve"]
      },
      // Lunch (Veg) - Added
      {
        mealType: "Lunch",
        vegNonVeg: "Veg",
        dishName: "Vegetable Stew",
        calories: 220,
        protein: 6,
        carbs: 35,
        fat: 5,
        description: "A light coconut-based stew with mixed vegetables.",
        ingredients: ["Mixed vegetables", "Coconut milk", "Curry leaves", "Spices"],
        steps: ["Cook vegetables", "Prepare stew", "Serve hot"]
      },
      // Lunch (Non-Veg) - Added
      {
        mealType: "Lunch",
        vegNonVeg: "Non-Veg",
        dishName: "Grilled Chicken Salad",
        calories: 280,
        protein: 30,
        carbs: 12,
        fat: 8,
        description: "Grilled chicken with fresh vegetables and lemon dressing.",
        ingredients: ["200g chicken breast", "Lettuce", "Cucumber", "Lemon juice"],
        steps: ["Grill chicken", "Chop vegetables", "Toss with dressing"]
      },
      // Lunch (Non-Veg) - Added
      {
        mealType: "Lunch",
        vegNonVeg: "Non-Veg",
        dishName: "Fish Curry with Steamed Rice",
        calories: 340,
        protein: 25,
        carbs: 40,
        fat: 10,
        description: "Bengali-style fish curry with mustard and spices.",
        ingredients: ["500g fish", "Mustard paste", "Turmeric", "Green chilies"],
        steps: ["Marinate fish", "Prepare mustard gravy", "Cook fish in gravy", "Serve with rice"]
      },
      // Lunch (Non-Veg) - Added
      {
        mealType: "Lunch",
        vegNonVeg: "Non-Veg",
        dishName: "Chicken Stew",
        calories: 300,
        protein: 25,
        carbs: 20,
        fat: 12,
        description: "A light coconut-based stew with chicken.",
        ingredients: ["300g chicken", "Coconut milk", "Potatoes", "Spices"],
        steps: ["Cook chicken", "Prepare stew", "Serve hot"]
      },
      // Dinner (Veg) - Added
      {
        mealType: "Dinner",
        vegNonVeg: "Veg",
        dishName: "Moong Dal Khichdi",
        calories: 250,
        protein: 12,
        carbs: 35,
        fat: 5,
        description: "Light lentil-rice dish with minimal spices.",
        ingredients: ["1/2 cup moong dal", "1/2 cup rice", "Turmeric", "Ghee"],
        steps: ["Cook dal and rice", "Temper with spices", "Serve hot"]
      },
      // Dinner (Veg) - Added
      {
        mealType: "Dinner",
        vegNonVeg: "Veg",
        dishName: "Vegetable Pulao",
        calories: 250,
        protein: 8,
        carbs: 40,
        fat: 6,
        description: "Fragrant rice cooked with mixed vegetables.",
        ingredients: ["1 cup basmati rice", "Mixed vegetables", "Spices", "Ghee"],
        steps: ["Sauté vegetables", "Cook rice", "Mix and serve"]
      },
      // Dinner (Veg) - Added
      {
        mealType: "Dinner",
        vegNonVeg: "Veg",
        dishName: "Baingan Bharta",
        calories: 200,
        protein: 6,
        carbs: 25,
        fat: 8,
        description: "Smoky mashed eggplant with spices.",
        ingredients: ["2 eggplants", "Onion", "Tomato", "Spices"],
        steps: ["Roast eggplant", "Mash and sauté", "Serve with roti"]
      },
      // Dinner (Non-Veg) - Added
      {
        mealType: "Dinner",
        vegNonVeg: "Non-Veg",
        dishName: "Herb-Grilled Chicken",
        calories: 250,
        protein: 30,
        carbs: 5,
        fat: 12,
        description: "Low-sodium grilled chicken with herbs and spices.",
        ingredients: ["200g chicken breast", "Fresh herbs", "Lemon juice", "Olive oil"],
        steps: ["Marinate with herbs", "Grill until done", "Rest for 5 minutes", "Serve with salad"]
      },
      // Dinner (Non-Veg) - Added
      {
        mealType: "Dinner",
        vegNonVeg: "Non-Veg",
        dishName: "Fish Fry",
        calories: 280,
        protein: 25,
        carbs: 10,
        fat: 12,
        description: "Crispy fried fish with spices.",
        ingredients: ["500g fish", "Turmeric", "Red chili powder", "Rice flour"],
        steps: ["Marinate fish", "Coat with spices", "Shallow fry"]
      },
      // Dinner (Non-Veg) - Added
      {
        mealType: "Dinner",
        vegNonVeg: "Non-Veg",
        dishName: "Chicken Curry",
        calories: 300,
        protein: 25,
        carbs: 20,
        fat: 12,
        description: "A light chicken curry with minimal salt.",
        ingredients: ["300g chicken", "Onion", "Tomato", "Spices"],
        steps: ["Sauté onions", "Cook chicken", "Add spices", "Serve hot"]
      }
    ]
  }
];

const fruitsAndDesserts = {
  fruits: [
    {
      name: "Apple",
      image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?q=80&w=1000&auto=format&fit=crop",
      calories: 95,
      fat: 0.3,
      fiber: 4.5,
      sugar: 19,
      protein: 0.5,
      serving: "1 medium (182g)",
      benefits: ["Heart health", "Blood sugar control", "Rich in antioxidants"]
    },
    {
      name: "Banana",
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=1000&auto=format&fit=crop",
      calories: 105,
      fat: 0.4,
      fiber: 3.1,
      sugar: 14,
      protein: 1.3,
      serving: "1 medium (118g)",
      benefits: ["Energy boost", "Mood improvement", "Digestive health"]
    },
    {
      name: "Orange",
      image: "https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1000&auto=format&fit=crop",
      calories: 62,
      fat: 0.2,
      fiber: 3.1,
      sugar: 12,
      protein: 1.2,
      serving: "1 medium (131g)",
      benefits: ["Immune support", "Skin health", "High in Vitamin C"]
    },
    {
      name: "Strawberries",
      image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=1000&auto=format&fit=crop",
      calories: 49,
      fat: 0.5,
      fiber: 3,
      sugar: 7,
      protein: 1,
      serving: "1 cup (152g)",
      benefits: ["Heart health", "Blood sugar regulation", "Anti-inflammatory"]
    },
    {
      name: "Mango",
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1000&auto=format&fit=crop",
      calories: 99,
      fat: 0.6,
      fiber: 2.6,
      sugar: 22.5,
      protein: 1.4,
      serving: "1 cup (165g)",
      benefits: ["Eye health", "Immune system boost", "Digestive aid", "Skin health"]
    },
    {
      name: "Blueberries",
      image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?q=80&w=1000&auto=format&fit=crop",
      calories: 85,
      fat: 0.5,
      fiber: 3.6,
      sugar: 15,
      protein: 1.1,
      serving: "1 cup (148g)",
      benefits: ["Brain function", "Heart health", "Anti-aging", "Blood sugar control"]
    },
    {
      name: "Pomegranate",
      image: "https://images.unsplash.com/photo-1541344999736-83eca272f6fc?q=80&w=1000&auto=format&fit=crop",
      calories: 234,
      fat: 3.3,
      fiber: 11.3,
      sugar: 38.6,
      protein: 4.7,
      serving: "1 whole (282g)",
      benefits: ["Anti-inflammatory", "Heart health", "Athletic performance", "Memory improvement"]
    },
    {
      name: "Kiwi",
      image: "https://images.unsplash.com/photo-1585059895524-72359e06133a?q=80&w=1000&auto=format&fit=crop",
      calories: 42,
      fat: 0.4,
      fiber: 2.1,
      sugar: 6.2,
      protein: 0.8,
      serving: "1 medium (69g)",
      benefits: ["Sleep quality", "Digestive health", "Immune support", "Skin health"]
    },
    {
      name: "Dragon Fruit",
      image: "https://images.unsplash.com/photo-1527325678964-54921661f888?q=80&w=1000&auto=format&fit=crop",
      calories: 60,
      fat: 0.4,
      fiber: 3,
      sugar: 8,
      protein: 1.2,
      serving: "1 cup (200g)",
      benefits: ["Antioxidants", "Iron content", "Digestive health", "Immune system"]
    },
    {
      name: "Avocado",
      image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=1000&auto=format&fit=crop",
      calories: 240,
      fat: 22,
      fiber: 10,
      sugar: 1,
      protein: 3,
      serving: "1 whole (200g)",
      benefits: ["Heart health", "Good fats", "Nutrient absorption", "Weight management"]
    },
    {
      name: "Pineapple",
      image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?q=80&w=1000&auto=format&fit=crop",
      calories: 82,
      fat: 0.2,
      fiber: 2.3,
      sugar: 16,
      protein: 0.9,
      serving: "1 cup (165g)",
      benefits: ["Digestion aid", "Anti-inflammatory", "Immune support", "Bone strength"]
    },
    {
      name: "Watermelon",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=1000&auto=format&fit=crop",
      calories: 46,
      fat: 0.2,
      fiber: 0.6,
      sugar: 9.4,
      protein: 0.9,
      serving: "1 cup (152g)",
      benefits: ["Hydration", "Heart health", "Muscle soreness", "Skin protection"]
    },
    {
      name: "Papaya",
      image: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe",
      calories: 120,
      fat: 0.2,
      fiber: 4.7,
      sugar: 12,
      protein: 0.9,
      serving: "1 cup (140g)",
      benefits: ["Digestive health", "Skin health", "Anti-inflammatory", "Heart health"]
    },
    {
      name: "Guava",
      image: "https://images.unsplash.com/photo-1536511132770-e5058c7e8c46",
      calories: 68,
      fat: 0.9,
      fiber: 8.9,
      sugar: 8.9,
      protein: 2.6,
      serving: "1 fruit (118g)",
      benefits: ["Vitamin C rich", "Blood sugar control", "Immunity booster"]
    },
    {
      name: "Passion Fruit",
      image: "https://images.unsplash.com/photo-1604495772376-9657f0035eb5",
      calories: 68,
      fat: 0.7,
      fiber: 2.4,
      sugar: 11.2,
      protein: 2.2,
      serving: "2 fruits (36g)",
      benefits: ["Antioxidant rich", "Improves sleep", "Boosts immunity", "Reduces anxiety"]
    },
    {
      name: "Lychee",
      image: "https://th.bing.com/th/id/OIP.KA2Vd6FxwLV6q4C7raxRCgAAAA?rs=1&pid=ImgDetMain",
      calories: 66,
      fat: 0.4,
      fiber: 1.3,
      sugar: 15,
      protein: 0.8,
      serving: "100g (about 10 fruits)",
      benefits: ["Vitamin C rich", "Blood circulation", "Anti-aging", "Heart health"]
    }
  ],

  dairy: [
    {
      name: "Greek Yogurt",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777",
      calories: 130,
      fat: 4,
      protein: 13,
      carbs: 9,
      serving: "1 cup (170g)",
      benefits: ["Probiotics", "Protein rich", "Bone health"],
      type: "Dairy"
    },
    {
      name: "Cottage Cheese",
      image: "https://thumbs.dreamstime.com/z/cottage-cheese-19386608.jpg",
      calories: 120,
      fat: 5,
      protein: 14,
      carbs: 3,
      serving: "1 cup (226g)",
      benefits: ["High protein", "Low calorie", "Calcium rich"],
      type: "Dairy"
    },
    {
      name: "Almond Milk",
      image: "https://images.unsplash.com/photo-1600718374662-0483d2b9da44",
      calories: 40,
      fat: 3,
      protein: 1,
      carbs: 2,
      serving: "1 cup (240ml)",
      benefits: ["Lactose free", "Low calorie", "Vitamin E"],
      type: "Dairy Alternative"
    },
    {
      name: "Kefir",
      image: "https://images.unsplash.com/photo-1559598467-f8b76c8155d0",
      calories: 104,
      fat: 2.5,
      protein: 9,
      carbs: 12,
      serving: "1 cup (240ml)",
      benefits: ["Gut health", "Stronger immunity", "Better digestion"],
      type: "Dairy"
    }
  ],

  eggs: [
    {
      name: "Boiled Egg",
      image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543",
      calories: 70,
      fat: 5,
      protein: 6,
      cholesterol: 187,
      serving: "1 large egg",
      preparation: ["Hard boiled", "Soft boiled"],
      benefits: ["High protein", "Nutrient dense", "Brain health"]
    },
    {
      name: "Scrambled Eggs",
      image: "https://assets.bonappetit.com/photos/57ace84d53e63daf11a4db61/master/pass/SCRAMBLED-EGG-1-of-1.jpg",
      calories: 140,
      fat: 10,
      protein: 12,
      cholesterol: 374,
      serving: "2 large eggs",
      preparation: ["Scrambled with milk", "Plain scrambled"],
      benefits: ["Quick preparation", "Customizable", "High protein"]
    },
    {
      name: "Eggs Benedict",
      image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7",
      calories: 280,
      fat: 16,
      protein: 18,
      cholesterol: 400,
      serving: "1 serving (2 eggs)",
      preparation: ["Poached eggs", "Hollandaise sauce", "English muffin"],
      benefits: ["High protein", "Vitamin D", "Complete breakfast"]
    },
    {
      name: "Frittata",
      image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf",
      calories: 220,
      fat: 14,
      protein: 16,
      cholesterol: 380,
      serving: "1 slice (1/6 of pan)",
      preparation: ["Baked", "Mixed with vegetables"],
      benefits: ["Versatile", "Meal prep friendly", "Nutrient dense"]
    }
  ],

  desserts: [
    {
      name: "Chocolate Cake",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop",
      calories: 352,
      fat: 15.8,
      sugar: 28,
      protein: 4.2,
      serving: "1 slice (100g)",
      ingredients: ["Chocolate", "Flour", "Sugar", "Eggs", "Butter"]
    },
    {
      name: "Cheesecake",
      image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1000&auto=format&fit=crop",
      calories: 321,
      fat: 22,
      sugar: 22,
      protein: 6,
      serving: "1 slice (100g)",
      ingredients: ["Cream cheese", "Sugar", "Eggs", "Graham crackers", "Butter"]
    },
    {
      name: "Carrot Cake",
      image: "https://images.unsplash.com/photo-1525059337994-6f2a1311b4d4?q=80&w=1000&auto=format&fit=crop",
      calories: 295,
      fat: 14,
      sugar: 25,
      protein: 3.8,
      serving: "1 slice (100g)",
      ingredients: ["Carrots", "Flour", "Sugar", "Oil", "Cream cheese frosting"]
    },
    {
      name: "Tiramisu",
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1000&auto=format&fit=crop",
      calories: 240,
      fat: 15,
      sugar: 20,
      protein: 4,
      serving: "1 piece (100g)",
      ingredients: ["Mascarpone", "Coffee", "Ladyfingers", "Cocoa powder", "Eggs"]
    },
    {
      name: "Apple Pie",
      image: "https://www.jessicagavin.com/wp-content/uploads/2020/10/apple-pie-5-1200.jpg",
      calories: 267,
      fat: 13,
      sugar: 22,
      protein: 2.4,
      serving: "1 slice (100g)",
      ingredients: ["Apples", "Pie crust", "Cinnamon", "Sugar", "Butter"]
    },
    {
      name: "Red Velvet Cake",
      image: "https://i.pinimg.com/originals/b2/4d/1f/b24d1f5d8def11bd69b3c583a0be2687.jpg",
      calories: 293,
      fat: 12,
      sugar: 33,
      protein: 5,
      serving: "1 slice (100g)",
      ingredients: ["Flour", "Cocoa", "Buttermilk", "Cream cheese frosting", "Food coloring"]
    },
    {
      name: "caramel custard",
      image: "https://media.istockphoto.com/id/488794646/photo/creme-brulee-with-fresh-fruit.jpg?s=1024x1024&w=is&k=20&c=UoI5OkGorgoPHwlR8nnsBok3iZyGGEaTA2VXc0mhPo8=",
      calories: 260,
      fat: 20,
      sugar: 18,
      protein: 4,
      serving: "1 ramekin (100g)",
      ingredients: ["Heavy cream", "Vanilla bean", "Egg yolks", "Sugar", "Salt"]
    },
    {
      name: "Fruit Tart",
      image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?q=80&w=1000&auto=format&fit=crop",
      calories: 220,
      fat: 11,
      sugar: 16,
      protein: 4,
      serving: "1 slice (100g)",
      ingredients: ["Pastry crust", "Custard", "Fresh fruits", "Glaze", "Vanilla"]
    },
    {
      name: "Chocolate Mousse",
      image: "https://www.cookingclassy.com/wp-content/uploads/2020/02/chocolate-mousse-8.jpg",
      calories: 208,
      fat: 14,
      sugar: 19,
      protein: 3.5,
      serving: "1 cup (100g)",
      ingredients: ["Dark chocolate", "Heavy cream", "Eggs", "Sugar", "Vanilla extract"]
    },
    {
      name: "Lemon Meringue Pie",
      image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=1000&auto=format&fit=crop",
      calories: 310,
      fat: 12,
      sugar: 36,
      protein: 5,
      serving: "1 slice (100g)",
      ingredients: ["Lemon curd", "Meringue", "Pie crust", "Eggs", "Butter"]
    },
    {
      name: "Bread Pudding",
      image: "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?q=80&w=1000&auto=format&fit=crop",
      calories: 278,
      fat: 10,
      sugar: 32,
      protein: 7,
      serving: "1 serving (100g)",
      ingredients: ["Bread", "Milk", "Eggs", "Vanilla", "Raisins"]
    },
    {
      name: "Mille-feuille",
      image: "https://images.unsplash.com/photo-1464195244916-405fa0a82545",
      calories: 280,
      fat: 16,
      sugar: 24,
      protein: 4,
      serving: "1 piece (120g)",
      ingredients: ["Puff pastry", "Vanilla cream", "Powdered sugar"]
    }
  ],

  breakfast: [
    {
      name: "Overnight Oats",
      image: "https://feelgoodfoodie.net/wp-content/uploads/2023/04/Overnight-Oats-18-736x1104.jpg",
      calories: 300,
      fat: 5,
      protein: 12,
      carbs: 50,
      fiber: 8,
      serving: "1 cup (240g)",
      ingredients: ["Oats", "Milk", "Chia seeds", "Honey", "Fruits"],
      benefits: ["High fiber", "Protein rich", "Heart healthy"]
    },
    {
      name: "Avocado Toast",
      image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d",
      calories: 280,
      fat: 16,
      protein: 8,
      carbs: 28,
      fiber: 10,
      serving: "1 slice",
      ingredients: ["Whole grain bread", "Avocado", "Eggs", "Salt", "Pepper"],
      benefits: ["Healthy fats", "High fiber", "Protein rich"]
    },
    {
      name: "Protein Pancakes",
      image: "https://images.unsplash.com/photo-1598214886806-c87b84b7078b",
      calories: 280,
      fat: 8,
      protein: 20,
      carbs: 35,
      fiber: 5,
      serving: "3 pancakes",
      ingredients: ["Protein powder", "Oats", "Banana", "Eggs", "Cinnamon"],
      benefits: ["High protein", "Low sugar", "Energy boosting"]
    },
    {
      name: "Chia Seed Pudding",
      image: "https://healthysubstitute.com/wp-content/uploads/2019/07/4b-chia-pudding-almond-milk.jpg",
      calories: 180,
      fat: 11,
      protein: 6,
      carbs: 15,
      fiber: 10,
      serving: "1 cup",
      ingredients: ["Chia seeds", "Almond milk", "Honey", "Berries"],
      benefits: ["Omega-3 rich", "High fiber", "Antioxidants"]
    }
  ],

  smoothies: [
    {
      name: "Berry Blast",
      image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888",
      calories: 180,
      fat: 2,
      protein: 4,
      carbs: 35,
      fiber: 6,
      serving: "16 oz (480ml)",
      ingredients: ["Mixed berries", "Banana", "Greek yogurt", "Honey"],
      benefits: ["Antioxidants", "Vitamin C", "Probiotics"]
    },
    {
      name: "Green Goddess",
      image: "https://images.unsplash.com/photo-1556881286-fc6915169721",
      calories: 150,
      fat: 3,
      protein: 5,
      carbs: 25,
      fiber: 8,
      serving: "16 oz (480ml)",
      ingredients: ["Spinach", "Kale", "Apple", "Banana", "Almond milk"],
      benefits: ["Iron rich", "Detoxifying", "High fiber"]
    },
    {
      name: "Tropical Paradise",
      image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4",
      calories: 165,
      fat: 2,
      protein: 3,
      carbs: 38,
      fiber: 5,
      serving: "16 oz (480ml)",
      ingredients: ["Mango", "Pineapple", "Coconut water", "Lime"],
      benefits: ["Hydrating", "Vitamin C rich", "Digestive aid"]
    },
    {
      name: "Protein Power",
      image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699",
      calories: 220,
      fat: 5,
      protein: 20,
      carbs: 28,
      fiber: 4,
      serving: "16 oz (480ml)",
      ingredients: ["Protein powder", "Banana", "Peanut butter", "Oat milk"],
      benefits: ["Muscle recovery", "Energy boost", "Meal replacement"]
    }
  ],

  snacks: [
    {
      name: "Trail Mix",
      image: "https://th.bing.com/th/id/OIP.HxHzDuxd8se-GYf3cEPExgHaLH?rs=1&pid=ImgDetMain",
      calories: 160,
      fat: 12,
      protein: 6,
      carbs: 14,
      fiber: 3,
      serving: "1/4 cup (30g)",
      ingredients: ["Mixed nuts", "Dried fruits", "Dark chocolate chips"],
      benefits: ["Energy boost", "Heart healthy", "Brain function"]
    },
    {
      name: "Hummus with Vegetables",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
      calories: 150,
      fat: 8,
      protein: 5,
      carbs: 16,
      fiber: 4,
      serving: "1/4 cup hummus + vegetables",
      ingredients: ["Chickpeas", "Tahini", "Olive oil", "Fresh vegetables"],
      benefits: ["Plant protein", "Healthy fats", "Fiber rich"]
    },
    {
      name: "Greek Yogurt Parfait",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777",
      calories: 180,
      fat: 4,
      protein: 15,
      carbs: 20,
      fiber: 3,
      serving: "1 cup (250g)",
      ingredients: ["Greek yogurt", "Granola", "Honey", "Mixed berries"],
      benefits: ["Protein rich", "Probiotics", "Antioxidants"]
    },
    {
      name: "Roasted Chickpeas",
      image: "https://www.gimmesomeoven.com/wp-content/uploads/2022/06/Roasted-Chickpeas-Recipe-9.jpg",
      calories: 120,
      fat: 4,
      protein: 6,
      carbs: 18,
      fiber: 6,
      serving: "1/4 cup (30g)",
      ingredients: ["Chickpeas", "Olive oil", "Spices"],
      benefits: ["High fiber", "Plant protein", "Heart healthy"]
    }
  ]
};

const nutritionalCategories = {
  proteins: [
    {
      name: "Chicken Breast",
      image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791",
      calories: 165,
      protein: 31,
      fat: 3.6,
      serving: "100g",
      preparation: ["Grilled", "Baked", "Pan-seared"],
      benefits: ["Lean protein", "Low fat", "Versatile"]
    },
    {
      name: "Salmon",
      image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6",
      calories: 208,
      protein: 22,
      fat: 13,
      serving: "100g",
      preparation: ["Grilled", "Baked", "Pan-seared"],
      benefits: ["Omega-3 fatty acids", "High protein", "Brain health"]
    },
    {
      name: "Tofu",
      image: "https://images.unsplash.com/photo-1546069901-5ec6a79120b0",
      calories: 70,
      protein: 8,
      fat: 4,
      serving: "100g",
      preparation: ["Stir-fried", "Grilled", "Baked"],
      benefits: ["Plant-based protein", "Low calorie", "Versatile"]
    },
    {
      name: "Lentils",
      image: "https://cdn.britannica.com/14/157214-050-3A82D9CD/kinds-lentils.jpg",
      calories: 230,
      protein: 18,
      fat: 0.8,
      serving: "1 cup cooked",
      preparation: ["Boiled", "Soup", "Curry"],
      benefits: ["Plant protein", "Iron rich", "Heart healthy"]
    }
  ],
  
  grains: [
    {
      name: "Quinoa",
      image: "https://cdn.shopify.com/s/files/1/0048/2489/1482/products/quinoa_720x@2x.jpg?v=1553871537",
      calories: 120,
      protein: 4.4,
      carbs: 21,
      fiber: 2.8,
      serving: "1/2 cup cooked",
      benefits: ["Complete protein", "Gluten-free", "High fiber"]
    },
    {
      name: "Brown Rice",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
      calories: 216,
      protein: 5,
      carbs: 45,
      fiber: 3.5,
      serving: "1 cup cooked",
      benefits: ["Whole grain", "High fiber", "Rich in minerals"]
    },
    {
      name: "Oats",
      image: "https://images.unsplash.com/photo-1571748982800-fa51082c2224",
      calories: 307,
      protein: 13,
      carbs: 55,
      fiber: 8,
      serving: "1 cup",
      benefits: ["Heart healthy", "High fiber", "Sustained energy"]
    },
    {
      name: "Buckwheat",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
      calories: 155,
      protein: 6,
      carbs: 33,
      fiber: 4.5,
      serving: "1 cup cooked",
      benefits: ["Gluten-free", "Complete protein", "Rich in minerals"]
    }
  ],
  
  vegetables: [
    {
      name: "Kale",
      image: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57",
      calories: 33,
      protein: 2.9,
      carbs: 6.7,
      fiber: 1.3,
      serving: "1 cup raw",
      benefits: ["Vitamin K", "Antioxidants", "Anti-inflammatory"]
    },
    {
      name: "Sweet Potato",
      image: "https://th.bing.com/th/id/R.2d6d312d0724b1ee697dd476502715b9?rik=fPRaQBGTHYZnuQ&riu=http%3a%2f%2fbtrade-egypt.com%2fwp-content%2fuploads%2f2018%2f04%2f413886.jpg&ehk=oiTMZPHI%2fT1i9ZxYTbZ5HAgLYFeIHAqTH5RFzIBbArs%3d&risl=&pid=ImgRaw&r=0",
      calories: 103,
      protein: 2,
      carbs: 24,
      fiber: 4,
      serving: "1 medium",
      benefits: ["Vitamin A", "Complex carbs", "Fiber rich"]
    },
    {
      name: "Broccoli",
      image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc",
      calories: 55,
      protein: 3.7,
      carbs: 11,
      fiber: 5,
      serving: "1 cup",
      benefits: ["Cancer-fighting", "High fiber", "Vitamin C"]
    },
    {
      name: "Bell Peppers",
      image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83",
      calories: 30,
      protein: 1,
      carbs: 7,
      fiber: 2.5,
      serving: "1 medium pepper",
      benefits: ["Vitamin C rich", "Antioxidants", "Eye health"]
    },
    {
      name: "Spinach",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb",
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fiber: 2.2,
      serving: "1 cup raw",
      benefits: ["Iron rich", "Bone health", "Eye health", "Brain function"]
    },
    {
      name: "Cauliflower",
      image: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3",
      calories: 25,
      protein: 2,
      carbs: 5,
      fiber: 2.5,
      serving: "1 cup chopped",
      benefits: ["Low carb", "Anti-inflammatory", "Cancer-fighting", "Brain health"]
    },
    {
      name: "Brussels Sprouts",
      image: "https://images.unsplash.com/photo-1438118907704-7718ee9a191a",
      calories: 38,
      protein: 3,
      carbs: 8,
      fiber: 3.3,
      serving: "1 cup",
      benefits: ["Vitamin K", "Digestive health", "Anti-cancer", "Heart health"]
    },
    {
      name: "Asparagus",
      image: "https://images.unsplash.com/photo-1515471209610-dae1c92d8777",
      calories: 27,
      protein: 3,
      carbs: 5,
      fiber: 2.8,
      serving: "1 cup",
      benefits: ["Anti-aging", "Folate rich", "Digestive health", "Anti-inflammatory"]
    },
    {
      name: "Zucchini",
      image: "https://th.bing.com/th/id/OIP.BinNQea9hRPw3T7uCS7lnAHaHa?rs=1&pid=ImgDetMain",
      calories: 17,
      protein: 1.2,
      carbs: 3.1,
      fiber: 1,
      serving: "1 cup sliced",
      benefits: ["Low calorie", "Heart health", "Anti-inflammatory", "Eye health"]
    },
    {
      name: "Mushrooms",
      image: "https://images.unsplash.com/photo-1504545102780-26774c1bb073",
      calories: 22,
      protein: 3.1,
      carbs: 3.3,
      fiber: 1,
      serving: "1 cup",
      benefits: ["Immune support", "Vitamin D", "Brain health", "Anti-aging"]
    },
    {
      name: "Eggplant",
      image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25",
      calories: 35,
      protein: 0.8,
      carbs: 8.6,
      fiber: 3,
      serving: "1 cup cubed",
      benefits: ["Heart health", "Brain function", "Blood sugar control", "Antioxidants"]
    },
    {
      name: "Carrots",
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37",
      calories: 52,
      protein: 1.2,
      carbs: 12,
      fiber: 3.6,
      serving: "1 cup chopped",
      benefits: ["Eye health", "Immune system", "Skin health", "Heart health"]
    }
  ]
};

// Helper function
const getUniqueValues = (field) => {
  const values = new Set();
  mealsData.forEach(region => {
    if (field === 'region') values.add(region.region);
    else if (field === 'dietaryCondition') values.add(region.dietaryCondition);
    else if (field === 'mealType' || field === 'vegNonVeg') {
      region.meals.forEach(meal => values.add(meal[field]));
    }
  });
  return Array.from(values);
};

// Single export statement at the end of the file
export { 
    mealsData, 
    getUniqueValues, 
    fruitsAndDesserts, 
    nutritionalCategories 
};
