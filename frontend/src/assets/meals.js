

export const mealsData = [
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

// Helper function to get unique values for filters (unchanged)
export const getUniqueValues = (field) => {
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
