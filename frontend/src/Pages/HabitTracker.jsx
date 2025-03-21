import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Target, ClipboardList, Repeat, PlusCircle } from "lucide-react";

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No authentication token found");
          setError("User not authenticated.");
          return;
        }

        const res = await axios.get("http://localhost:4000/habit", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(res.data)) {
          setHabits(res.data);
        } else {
          console.error("Invalid data format received:", res.data);
          setHabits([]);
        }
      } catch (err) {
        console.error("Error fetching habits", err);
        setError("Failed to load habits.");
        setHabits([]);
      }
    };

    fetchHabits();
  }, []);

  const addHabit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/habit",
        { name: newHabit, frequency },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setHabits([...habits, res.data]);
      setNewHabit(""); // Clear input after adding
      toast.success("Habit added successfully!");
    } catch (err) {
      setError("Failed to add habit. Try again.");
      console.error("Error adding habit", err);
      toast.error("Failed to add habit.");
    }
  };

  const completeHabit = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/habit/${id}/complete`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setHabits(habits.map((habit) => (habit._id === id ? res.data : habit)));
      toast.success("Habit marked as complete!");
    } catch (err) {
      if (err.response?.status === 400) {
        toast.info("Habit already completed today!"); // ✅ Added this toast message
      } else {
        toast.error("Failed to complete habit.");
      }
    }
  };
  


  const deleteHabit = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("User not authenticated.");
        return;
      }

      await axios.delete(`http://localhost:4000/habit/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHabits(habits.filter((habit) => habit._id !== id));
      toast.success("Habit deleted successfully!");
    } catch (err) {
      console.error("Error deleting habit", err.response?.data || err.message);
      setError("Failed to delete habit.");
      toast.error(err.response?.data?.message || "Failed to delete habit.");
    }
  };

  return (
    <div className=" mockup-phone border-primary w-full mt-12 max-w-8xl mx-auto p-6 bg-slate-900  ">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center">
        <Target className="text-blue-400 w-8 h-8 sm:w-10 sm:h-10" />
        <span className="leading-tight">
          Track Your <span className="text-blue-400">Habit Streaks</span>
        </span>
      </h2>
      <ToastContainer />
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4 w-full">
        {/* Habit Input Field */}
        <div className="relative w-full">
          <ClipboardList className="absolute left-3 top-4 text-green-500 w-5 h-5" />
          <input
            className="border p-3 pl-10 rounded-lg w-full text-gray-200 border-blue-500 focus:ring-2 focus:ring-blue-400 bg-gray-900"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="New habit.............."
          />
        </div>

        {/* Frequency Dropdown */}
        <div className="relative w-full sm:w-48">
          <Repeat className="absolute left-3 top-4 text-blue-500 w-5 h-5" />
          <select
            className="border p-3 pl-10 rounded-lg w-full text-gray-200 focus:ring-2 focus:ring-blue-400 bg-gray-700"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        {/* Add Button */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition w-full sm:w-auto shadow-md"
          onClick={addHabit}
        >
          <PlusCircle className="w-5 h-5" /> Add
        </button>
      </div>

      {/* Habit List */}
      {habits.length === 0 ? (
        <p className="text-gray-100 text-center">No habits added yet.</p>
      ) : (
         // Inside return statement - Habit List
         <ul className="mt-4 space-y-2">
         {habits.map((habit) => (
           <li key={habit._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-300 rounded-lg bg-gray-700 ">
             <div className="flex items-center gap-2">
               <ClipboardList className="text-green-500 w-5 h-5" />
               {habit.name} <span className="text-yellow-500">({habit.streak}🔥)</span>
               {habit.frequency === "weekly" && (
                 <span className=" bg-yellow-500 text-black text-xs font-semibold px-1 py-1 rounded">Weekly Habit</span>
               )}
             </div>
             <div className="flex gap-2 mt-2 sm:mt-0">
               <button className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg" onClick={() => completeHabit(habit._id)}>✅ Complete</button>
               <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg" onClick={() => deleteHabit(habit._id)}> Delete</button>
             </div>
           </li>
         ))}
       </ul>

      )}
    </div>
  );
};

export default HabitTracker;




