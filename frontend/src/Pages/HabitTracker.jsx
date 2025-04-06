import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Target, ClipboardList, Repeat, PlusCircle, Activity, Trophy, Trash2, CheckCircle, Calendar, Zap, X, Star, Info } from "lucide-react";

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

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
    if (!newHabit.trim()) {
      toast.warning("Please enter a habit name");
      return;
    }
    
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
      setShowForm(false); // Hide form after adding
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
        toast.info("Habit already completed today!");
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

  // Function to get streak emoji count based on streak value
  const getStreakDisplay = (streak) => {
    if (streak >= 10) return <span className="text-amber-400 font-bold">{streak}🔥</span>;
    if (streak >= 7) return <span className="text-amber-500 font-bold">{streak}🔥</span>;
    if (streak >= 3) return <span className="text-orange-500 font-bold">{streak}🔥</span>;
    return <span className="text-orange-400 font-bold">{streak}🔥</span>;
  };

  return (
    <div className="w-full mt-8 mx-auto mb-12 px-2 max-w-full">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl shadow-2xl border border-blue-500/30 backdrop-blur-sm overflow-hidden">
        <div className="bg-black/40 px-4 py-5 sm:px-6 border-b border-blue-500/20">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 sm:mb-0">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Target className="text-blue-400 w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Habit <span className="text-blue-400">Tracker</span>
              </h2>
            </div>
            
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2 px-4 rounded-lg transition-all duration-200 shadow-lg"
            >
              {showForm ? (
                <>
                  <X size={18} /> Hide Form
                </>
              ) : (
                <>
                  <PlusCircle size={18} /> New Habit
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 m-4 rounded-lg">
            <div className="flex items-center gap-2">
              <X className="h-5 w-5" />
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Add Habit Form */}
        {showForm && (
          <div className="px-6 py-5 bg-slate-800/50 border-b border-blue-500/10 animate-fadeIn">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Habit Input Field */}
              <div className="relative flex-grow">
                <ClipboardList className="absolute left-3 top-3 text-blue-400 w-5 h-5" />
                <input
                  className="border p-2 pl-10 rounded-lg w-full text-gray-200 border-blue-500/30 focus:ring-2 focus:ring-blue-400 bg-gray-900/70 shadow-inner"
                  value={newHabit}
                  onChange={(e) => setNewHabit(e.target.value)}
                  placeholder="Enter new habit..."
                />
              </div>

              {/* Frequency Dropdown */}
              <div className="relative w-full sm:w-48">
                <Calendar className="absolute left-3 top-3 text-blue-400 w-5 h-5" />
                <select
                  className="border p-2 pl-10 rounded-lg w-full text-gray-200 border-blue-500/30 focus:ring-2 focus:ring-blue-400 bg-gray-900/70 shadow-inner"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>

              {/* Add Button */}
              <button
                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-md"
                onClick={addHabit}
              >
                <PlusCircle className="w-5 h-5" /> Add Habit
              </button>
            </div>

            {/* Streak Info */}
            <div className="w-full mt-3 text-xs text-gray-400 bg-slate-800/30 p-2 rounded-lg border border-blue-500/10">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p><span className="text-blue-400 font-medium">Daily habits:</span> Complete every day to maintain streak.</p>
                  <p><span className="text-purple-400 font-medium">Weekly habits:</span> Must complete at least once a day - missing more than a day will break your streak!</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-5">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-xl border border-blue-500/20 shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                <ClipboardList className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Total Habits</h3>
                <p className="text-2xl font-bold text-white">{habits.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-xl border border-blue-500/20 shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Active Streaks</h3>
                <p className="text-2xl font-bold text-white">
                  {habits.filter(h => h.streak > 0).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-xl border border-blue-500/20 shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Best Streak</h3>
                <p className="text-2xl font-bold text-white">
                  {habits.length > 0 
                    ? Math.max(...habits.map(h => h.streak), 0) 
                    : 0}
                  <span className="text-amber-400 ml-1">🔥</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Habit List */}
        <div className="p-5">
          {habits.length === 0 ? (
            <div className="text-center py-10 px-4">
              <div className="bg-slate-800/50 p-8 rounded-xl border border-blue-500/10 inline-block mx-auto">
                <ClipboardList className="mx-auto h-14 w-14 text-blue-400 mb-3 opacity-50" />
                <h3 className="text-xl font-semibold text-white mb-2">No habits added yet</h3>
                <p className="text-gray-400 mb-6">Start building better habits by adding your first one</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-all duration-200 mx-auto"
                >
                  <PlusCircle size={18} /> Add Your First Habit
                </button>
              </div>
            </div>
          ) : (
            <ul className="space-y-3">
              {habits.map((habit) => (
                <li 
                  key={habit._id} 
                  className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl border border-blue-500/20 overflow-hidden shadow-md transition-all duration-200 hover:shadow-lg hover:border-blue-500/30"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 relative">
                    <div className="flex items-center gap-3 mb-3 sm:mb-0">
                      <div className={`p-2 rounded-full ${habit.frequency === 'daily' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                        {habit.frequency === 'daily' 
                          ? <Repeat className="w-5 h-5" /> 
                          : <Calendar className="w-5 h-5" />
                        }
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-lg flex items-center gap-2">
                          {habit.name}
                          {habit.frequency === "weekly" && (
                            <span className="bg-purple-500/20 text-purple-400 text-xs font-semibold px-2 py-1 rounded-full border border-purple-500/20">
                              Weekly
                            </span>
                          )}
                        </h3>
                        <div className="flex items-center gap-1 text-sm">
                          <Zap className="h-4 w-4 text-amber-400" />
                          <span className="text-gray-400">Streak:</span> {getStreakDisplay(habit.streak)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-1 transition-all duration-200 shadow-md"
                        onClick={() => completeHabit(habit._id)}
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span className="hidden sm:inline">Complete</span>
                      </button>
                      <button 
                        className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-1 transition-all duration-200 shadow-md"
                        onClick={() => deleteHabit(habit._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
};

export default HabitTracker;




