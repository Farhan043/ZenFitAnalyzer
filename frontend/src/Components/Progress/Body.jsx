import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Camera,
  BarChart,
  Upload,
  Calendar,
  Filter,
  XCircle,
} from "lucide-react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Footer from "../Footer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const getUserId = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    return payload.userId || payload._id;
  } catch (e) {
    console.error("Error decoding token:", e);
    return null;
  }
};

export default function Body() {
  const [activeTab, setActiveTab] = useState("photos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    weight: "",
    chest: "",
    waist: "",
    hips: "",
    thighs: "",
    arms: "",
    notes: "",
  });
  const [error, setError] = useState("");
  const [progressEntries, setProgressEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [progressData, setProgressData] = useState(null);
  const [weightChange, setWeightChange] = useState(0);
  const [bodyCompositionChanges, setBodyCompositionChanges] = useState([]);
  const [weightProgressData, setWeightProgressData] = useState([]);
  const [startEntry, setStartEntry] = useState(null);
  const [endEntry, setEndEntry] = useState(null);
  const [weightPercentageChange, setWeightPercentageChange] = useState(0);
  const [imageAnalysisData, setImageAnalysisData] = useState([]);
  const [imageStats, setImageStats] = useState(null);
  const [imageProgressAnalysis, setImageProgressAnalysis] = useState([]);
  const [cumulativeWeightChanges, setCumulativeWeightChanges] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = getUserId();
    if (!userId) {
      navigate("/login");
      return;
    }
    fetchProgressEntries();

    // Load saved data from localStorage with user-specific keys
    const savedProgressData = localStorage.getItem(`progressData_${userId}`);
    const savedWeightChange = localStorage.getItem(`weightChange_${userId}`);
    const savedBodyCompositionChanges = localStorage.getItem(`bodyCompositionChanges_${userId}`);
    const savedWeightProgressData = localStorage.getItem(`weightProgressData_${userId}`);
    const savedStartEntry = localStorage.getItem(`startEntry_${userId}`);
    const savedEndEntry = localStorage.getItem(`endEntry_${userId}`);
    const savedWeightPercentageChange = localStorage.getItem(`weightPercentageChange_${userId}`);
    const savedImageAnalysisData = localStorage.getItem(`imageAnalysisData_${userId}`);
    const savedImageStats = localStorage.getItem(`imageStats_${userId}`);
    const savedImageProgressAnalysis = localStorage.getItem(`imageProgressAnalysis_${userId}`);
    const savedCumulativeWeightChanges = localStorage.getItem(`cumulativeWeightChanges_${userId}`);
  
    if (savedProgressData) setProgressData(JSON.parse(savedProgressData));
    if (savedWeightChange) setWeightChange(JSON.parse(savedWeightChange));
    if (savedBodyCompositionChanges) setBodyCompositionChanges(JSON.parse(savedBodyCompositionChanges));
    if (savedWeightProgressData) setWeightProgressData(JSON.parse(savedWeightProgressData));
    if (savedStartEntry) setStartEntry(JSON.parse(savedStartEntry));
    if (savedEndEntry) setEndEntry(JSON.parse(savedEndEntry));
    if (savedWeightPercentageChange) setWeightPercentageChange(JSON.parse(savedWeightPercentageChange));
    if (savedImageAnalysisData) setImageAnalysisData(JSON.parse(savedImageAnalysisData));
    if (savedImageStats) setImageStats(JSON.parse(savedImageStats));
    if (savedImageProgressAnalysis) setImageProgressAnalysis(JSON.parse(savedImageProgressAnalysis));
    if (savedCumulativeWeightChanges) setCumulativeWeightChanges(JSON.parse(savedCumulativeWeightChanges));
  }, []);

  const fetchProgressEntries = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = getUserId();
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const response = await axios.get(
        "http://localhost:4000/body-progress/user",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { userId } // Add userId to query params
        }
      );
      setProgressEntries(response.data);
      setAnalysisData(response.data);
    } catch (error) {
      console.error("Error fetching progress entries:", error);
      if (error.message === "User not authenticated") {
        navigate("/login");
      }
    }
  };

  const fetchProgressByDateRange = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      const userId = getUserId();
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const response = await axios.get(
        "http://localhost:4000/body-progress/progress-by-date",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { startDate, endDate, userId }
        }
      );
  
      // Get all entries within the date range
      const entriesInRange = response.data.progressData.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= new Date(startDate) && entryDate <= new Date(endDate);
      });

      if (entriesInRange.length < 2) {
        toast.error("Not enough entries in the selected date range");
        return;
      }

      // Sort entries by date and get the first and last entries
      const sortedEntries = entriesInRange.sort((a, b) => new Date(a.date) - new Date(b.date));
      const startEntry = sortedEntries[0];
      const endEntry = sortedEntries[sortedEntries.length - 1];

      // Calculate weight change between the selected dates
      const weightChange = endEntry.weight - startEntry.weight;
      const weightPercentageChange = ((weightChange / startEntry.weight) * 100).toFixed(1);

      // Calculate body composition changes between the selected dates
      const bodyCompositionChanges = [
        { part: 'chest', initial: startEntry.chest, final: endEntry.chest },
        { part: 'waist', initial: startEntry.waist, final: endEntry.waist },
        { part: 'hips', initial: startEntry.hips, final: endEntry.hips },
        { part: 'thighs', initial: startEntry.thighs, final: endEntry.thighs },
        { part: 'arms', initial: startEntry.arms, final: endEntry.arms }
      ].map(item => ({
        ...item,
        change: item.final - item.initial,
        percentageChange: ((item.final - item.initial) / item.initial * 100).toFixed(1)
      }));

      // Save data in state
      setProgressData(response.data.progressData);
      setWeightChange(weightChange);
      setBodyCompositionChanges(bodyCompositionChanges);
      setWeightProgressData(response.data.weightProgressData);
      
      // Store start and end entries for display
      setStartEntry(startEntry);
      setEndEntry(endEntry);
      setWeightPercentageChange(weightPercentageChange);
      
      // Store image analysis data
      setImageAnalysisData(response.data.imageAnalysisData || []);
      setImageStats(response.data.imageStats || null);
      setImageProgressAnalysis(response.data.imageProgressAnalysis || []);
      setCumulativeWeightChanges(response.data.cumulativeWeightChanges || []);

      // Save data in localStorage with user-specific keys
      localStorage.setItem(`progressData_${userId}`, JSON.stringify(response.data.progressData));
      localStorage.setItem(`weightChange_${userId}`, JSON.stringify(weightChange));
      localStorage.setItem(`bodyCompositionChanges_${userId}`, JSON.stringify(bodyCompositionChanges));
      localStorage.setItem(`weightProgressData_${userId}`, JSON.stringify(response.data.weightProgressData));
      localStorage.setItem(`startEntry_${userId}`, JSON.stringify(startEntry));
      localStorage.setItem(`endEntry_${userId}`, JSON.stringify(endEntry));
      localStorage.setItem(`weightPercentageChange_${userId}`, JSON.stringify(weightPercentageChange));
      localStorage.setItem(`imageAnalysisData_${userId}`, JSON.stringify(response.data.imageAnalysisData || []));
      localStorage.setItem(`imageStats_${userId}`, JSON.stringify(response.data.imageStats || null));
      localStorage.setItem(`imageProgressAnalysis_${userId}`, JSON.stringify(response.data.imageProgressAnalysis || []));
      localStorage.setItem(`cumulativeWeightChanges_${userId}`, JSON.stringify(response.data.cumulativeWeightChanges || []));
    } catch (error) {
      console.error("Error fetching progress data:", error);
      toast.error("Failed to fetch progress data.");
      if (error.message === "User not authenticated") {
        navigate("/login");
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const weightChartData = {
    labels: weightProgressData.map((entry) => {
      const date = new Date(entry.date);
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: "Weight (kg)",
        data: weightProgressData.map((entry) => entry.weight),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        pointBorderColor: "rgb(59, 130, 246)",
        pointBackgroundColor: "white",
        pointBorderWidth: 2,
        pointRadius: 4,
        tension: 0.3,
      },
    ],
  };

  const weightChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Weight: ${context.parsed.y} kg`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Weight (kg)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      }
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpload = async () => {
    if (!image || Object.values(formData).some((field) => field === "")) {
      setError("All fields are required");
      return;
    }
    setError("");

    const token = localStorage.getItem("token");
    const userId = getUserId();
    if (!userId) {
      setError("User not authenticated. Please log in.");
      navigate("/login");
      return;
    }

    const data = new FormData();
    data.append("photo", image);
    data.append("userId", userId); // Add userId to form data
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      await axios.post("http://localhost:4000/body-progress/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Image uploaded successfully!");
      setIsModalOpen(false);
      resetForm();
      fetchProgressEntries();
    } catch (error) {
      setError(error.response?.data?.message || "Error uploading image");
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleDeletePhoto = async (id) => {
    // if (!window.confirm("Are you sure you want to delete this photo?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4000/body-progress/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Photo deleted successfully");
      setSelectedEntry(false);
      setProgressEntries(progressEntries.filter((entry) => entry._id !== id));
    } catch (error) {
      console.error("Error deleting photo:", error);
      alert("Failed to delete photo. Please try again.");
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [adviceOpen, setAdviceOpen] = useState(false);

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

  const resetForm = () => {
    setFormData({
      date: "",
      weight: "",
      chest: "",
      waist: "",
      hips: "",
      thighs: "",
      arms: "",
      notes: "",
    });
    setImage(null);
    setPreview(null);
  };

  useEffect(() => {
    return () => {
      const userId = getUserId();
      if (userId) {
        localStorage.removeItem(`progressData_${userId}`);
        localStorage.removeItem(`weightChange_${userId}`);
        localStorage.removeItem(`bodyCompositionChanges_${userId}`);
        localStorage.removeItem(`weightProgressData_${userId}`);
        localStorage.removeItem(`startEntry_${userId}`);
        localStorage.removeItem(`endEntry_${userId}`);
        localStorage.removeItem(`weightPercentageChange_${userId}`);
        localStorage.removeItem(`imageAnalysisData_${userId}`);
        localStorage.removeItem(`imageStats_${userId}`);
        localStorage.removeItem(`imageProgressAnalysis_${userId}`);
        localStorage.removeItem(`cumulativeWeightChanges_${userId}`);
      }
    };
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token' && !e.newValue) {
        setProgressEntries([]);
        setAnalysisData(null);
        setProgressData(null);
        setWeightChange(0);
        setBodyCompositionChanges([]);
        setWeightProgressData([]);
        setStartEntry(null);
        setEndEntry(null);
        setWeightPercentageChange(0);
        setImageAnalysisData([]);
        setImageStats(null);
        setImageProgressAnalysis([]);
        setCumulativeWeightChanges([]);
        navigate("/login");
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    // <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">

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
              community
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

      <div className="p-6 mt-1 bg-slate-900 min-h-screen">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Body Progress</h1>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="bg-white p-1 rounded-full flex">
              <button
                className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                  activeTab === "photos"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-400"
                }`}
                onClick={() => setActiveTab("photos")}
              >
                <Camera size={16} /> Photos
              </button>
              <button
                className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                  activeTab === "analysis"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-400"
                }`}
                onClick={() => setActiveTab("analysis")}
              >
                <BarChart size={16} /> Analysis
              </button>
            </div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md"
              onClick={() => setIsModalOpen(true)}
            >
              <Upload size={16} /> Upload
            </button>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 overflow-auto z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Upload Progress Photo</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <XCircle size={24} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Weight (kg)</label>
                  <input
                    type="text"
                    name="weight"
                    placeholder="Enter weight"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.weight}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Chest (cm)</label>
                  <input
                    type="text"
                    name="chest"
                    placeholder="Enter chest measurement"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.chest}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Waist (cm)</label>
                  <input
                    type="text"
                    name="waist"
                    placeholder="Enter waist measurement"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.waist}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Hips (cm)</label>
                  <input
                    type="text"
                    name="hips"
                    placeholder="Enter hips measurement"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.hips}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Thighs (cm)</label>
                  <input
                    type="text"
                    name="thighs"
                    placeholder="Enter thighs measurement"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.thighs}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Arms (cm)</label>
                  <input
                    type="text"
                    name="arms"
                    placeholder="Enter arms measurement"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.arms}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">Notes</label>
                <textarea
                  name="notes"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add any notes about your progress..."
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                ></textarea>
              </div>
              {preview ? (
                <div className="relative mt-4">
                  <div className="relative w-full h-[400px] overflow-hidden rounded-lg bg-gray-900">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <button
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    onClick={handleDeleteImage}
                  >
                    <XCircle size={20} />
                  </button>
                </div>
              ) : (
                <div
                  className="mt-4 border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <Camera size={40} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-400">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PNG, JPG or JPEG (max. 5MB)</p>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              )}
              {error && (
                <p className="mt-2 text-red-500 text-sm text-center">{error}</p>
              )}
              <div className="mt-6 flex gap-4">
                <button
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  onClick={handleUpload}
                >
                  <Upload size={20} />
                  Upload
                </button>
                <button
                  className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 w-full max-w-8xl">
          {activeTab === "photos" && progressEntries.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {progressEntries.map((entry) => (
                <div
                  onClick={() => setSelectedEntry(entry)}
                  key={entry._id}
                  className="bg-gray-800 p-4 shadow-lg rounded-lg cursor-pointer hover:bg-gray-700 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <div className="relative w-full h-[300px] overflow-hidden rounded-lg bg-gray-900">
                    <img
                      src={entry.photo}
                      alt="Progress"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="mt-4 space-y-2">
                    <p className="text-gray-300">
                      <span className="text-blue-400 font-medium">Date:</span>{" "}
                      {new Date(entry.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-blue-400 font-medium">Weight:</span> {entry.weight} kg
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Responsive grid for analysis data
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded shadow">
              {/* Period Selection */}
              <div className="p-4 border rounded">
                <h2 className="font-semibold text-xl text-center">Period</h2>
                <p className="text-center">Progress timeframe</p>
                <input
                  type="date"
                  className="border p-2 rounded-lg w-full"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="date"
                  className="border p-2 rounded-lg w-full mt-2"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <button
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
                  onClick={fetchProgressByDateRange}
                >
                  Apply
                </button>
              </div>

              {/* Weight Change */}
              <div className="p-4 border rounded">
                <h2 className="font-semibold">Weight Change</h2>
                <p>Overall progress</p>
                {startEntry && endEntry ? (
                  <>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        From: {new Date(startEntry.date).toLocaleDateString()} ({startEntry.weight} kg)
                      </p>
                      <p className="text-sm text-gray-500">
                        To: {new Date(endEntry.date).toLocaleDateString()} ({endEntry.weight} kg)
                      </p>
                    </div>
                    <p className="mt-2">
                      Total{" "}
                      <span
                        className={`text-${weightChange < 0 ? "green" : "red"}-500`}
                      >
                        {weightChange.toFixed(1)} kg
                      </span>
                      {" "}
                      <span
                        className={`text-${weightChange < 0 ? "green" : "red"}-500`}
                      >
                        ({weightPercentageChange > 0 ? "+" : ""}{weightPercentageChange}%)
                      </span>
                    </p>
                  </>
                ) : (
                  <p className="text-gray-500">No data available</p>
                )}
              </div>

              {/* Body Composition */}
              <div className="p-4 border rounded">
                <h2 className="font-semibold">Body Composition</h2>
                <p>Measurement changes</p>
                {bodyCompositionChanges.length > 0 ? (
                  <ul className="mt-2">
                    {bodyCompositionChanges.map((item) => (
                      <li key={item.part} className="mb-1">
                        <div className="flex justify-between">
                          <span>{item.part.charAt(0).toUpperCase() + item.part.slice(1)}</span>
                          <span
                            className={`text-${item.change < 0 ? "green" : "red"}-500`}
                          >
                            {item.change > 0 ? "+" : ""}{item.change.toFixed(1)} cm
                            {" "}
                            <span className="text-xs">
                              ({item.percentageChange > 0 ? "+" : ""}{item.percentageChange}%)
                            </span>
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.initial.toFixed(1)} cm → {item.final.toFixed(1)} cm
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No data available</p>
                )}
              </div>
              </div>
          )}
           {activeTab === "analysis" && progressEntries.length > 0 && (
              <>
              {/* Full-Width Weight Progress Chart */}
              <div className="p-4 mt-5 border rounded w-full">
                <h2 className="text-xl font-bold">Weight Progress</h2>
                <p className="text-gray-600">
                  Track your weight changes over time
                </p>
                {weightProgressData.length > 0 ? (
                  <div className="w-full h-80">
                    <Line
                      data={weightChartData}
                      options={weightChartOptions}
                    />
                  </div>
                ) : (
                  <p className="text-gray-400">
                    No weight data available for selected range.
                  </p>
                )}
              </div>

              {/* Cumulative Weight Changes */}
              {cumulativeWeightChanges.length > 0 && (
                <div className="p-4 mt-5 border rounded w-full">
                  <h2 className="text-xl font-bold">Cumulative Weight Changes</h2>
                  <p className="text-gray-600">
                    Track your weight changes from the start date
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {cumulativeWeightChanges.map((change, index) => (
                      <div key={index} className="bg-gray-800 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-semibold">Progress</h3>
                          <span className="text-sm text-gray-400">{change.daysBetween} days</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="relative w-full h-[200px] overflow-hidden rounded-lg bg-gray-900">
                              <img 
                                src={change.fromImage} 
                                alt={`Start - ${change.fromDate}`} 
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <p className="text-center text-sm mt-1">Start</p>
                          </div>
                          <div>
                            <div className="relative w-full h-[200px] overflow-hidden rounded-lg bg-gray-900">
                              <img 
                                src={change.toImage} 
                                alt={`Current - ${change.toDate}`} 
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <p className="text-center text-sm mt-1">Current</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="flex justify-between">
                            <span>Weight Change:</span>
                            <span className={change.weightChange.value > 0 ? "text-green-500" : "text-red-500"}>
                              {change.weightChange.value > 0 ? "+" : ""}{change.weightChange.value} kg
                              ({change.weightChange.percentage > 0 ? "+" : ""}{change.weightChange.percentage}%)
                            </span>
                          </div>
                          <div className="text-sm text-gray-400 mt-2">
                            {new Date(change.fromDate).toLocaleDateString()} - {new Date(change.toDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Image Analysis Section */}
              {imageAnalysisData.length > 0 && (
                <div className="p-4 mt-5 border rounded w-full">
                  <h2 className="text-xl font-bold">Image Analysis</h2>
                  <p className="text-gray-600">
                    Visual progress tracking
                  </p>
                  
                  {/* Image Statistics */}
                  {imageStats && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="bg-gray-800 p-4 rounded-lg text-center">
                        <h3 className="text-lg font-semibold text-blue-400">Total Images</h3>
                        <p className="text-2xl font-bold">{imageStats.totalImages}</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg text-center">
                        <h3 className="text-lg font-semibold text-blue-400">Date Range</h3>
                        <p className="text-sm">
                          {new Date(imageStats.dateRange.start).toLocaleDateString()} - {new Date(imageStats.dateRange.end).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg text-center">
                        <h3 className="text-lg font-semibold text-blue-400">Images Per Week</h3>
                        <p className="text-2xl font-bold">{imageStats.imagesPerWeek}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Image Gallery */}
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4 text-white">Progress Images</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {imageAnalysisData.map((image) => (
                        <div 
                          key={image.id} 
                          className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-all duration-300 transform hover:scale-[1.02]"
                          onClick={() => setSelectedEntry(image)}
                        >
                          <div className="relative w-full h-[250px] overflow-hidden rounded-lg bg-gray-900">
                            <img 
                              src={image.photo} 
                              alt={`Progress on ${image.date}`} 
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="mt-4 space-y-2">
                            <p className="text-gray-300 font-semibold">
                              {new Date(image.date).toLocaleDateString()}
                            </p>
                            <p className="text-gray-300">
                              <span className="text-blue-400">Weight:</span> {image.weight} kg
                            </p>
                            {image.notes && (
                              <p className="text-gray-400 text-sm truncate">
                                {image.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Detailed Progress Analysis Between Images */}
                  {imageProgressAnalysis.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-4 text-white">Detailed Progress Analysis</h3>
                      <div className="space-y-6">
                        {imageProgressAnalysis.map((analysis, index) => (
                          <div key={index} className="bg-gray-800 p-6 rounded-lg">
                            <div className="flex justify-between items-center mb-6">
                              <h4 className="text-md font-semibold text-white">
                                {new Date(analysis.fromDate).toLocaleDateString()} - {new Date(analysis.toDate).toLocaleDateString()}
                              </h4>
                              <span className="text-sm text-gray-400">{analysis.daysBetween} days</span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                              <div className="space-y-2">
                                <div className="relative w-full h-[300px] overflow-hidden rounded-lg bg-gray-900">
                                  <img 
                                    src={analysis.fromImage} 
                                    alt={`Before - ${analysis.fromDate}`} 
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <p className="text-center text-sm text-gray-300">Before</p>
                              </div>
                              <div className="space-y-2">
                                <div className="relative w-full h-[300px] overflow-hidden rounded-lg bg-gray-900">
                                  <img 
                                    src={analysis.toImage} 
                                    alt={`After - ${analysis.toDate}`} 
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <p className="text-center text-sm text-gray-300">After</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="bg-gray-700 p-4 rounded-lg">
                                <h5 className="font-semibold text-white mb-3">Weight Change</h5>
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Value:</span>
                                    <span className={analysis.weightChange.value > 0 ? "text-green-500" : "text-red-500"}>
                                      {analysis.weightChange.value > 0 ? "+" : ""}{analysis.weightChange.value} kg
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-300">Percentage:</span>
                                    <span className={analysis.weightChange.percentage > 0 ? "text-green-500" : "text-red-500"}>
                                      {analysis.weightChange.percentage > 0 ? "+" : ""}{analysis.weightChange.percentage}%
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="bg-gray-700 p-4 rounded-lg">
                                <h5 className="font-semibold text-white mb-3">Measurement Changes</h5>
                                <div className="space-y-2">
                                  {Object.entries(analysis.measurementChanges).map(([part, data]) => (
                                    <div key={part} className="flex justify-between items-center">
                                      <span className="text-gray-300 capitalize">{part}:</span>
                                      <span className={data.change > 0 ? "text-green-500" : "text-red-500"}>
                                        {data.change > 0 ? "+" : ""}{data.change} cm ({data.percentageChange}%)
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Comparison View */}
              {startEntry && endEntry && startEntry._id !== endEntry._id && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">Start Date</h3>
                    <p className="text-gray-400 mb-6">{new Date(startEntry.date).toLocaleDateString()}</p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-700 p-3 rounded">
                        <p className="text-gray-400">Weight</p>
                        <p className="text-white font-semibold">{startEntry.weight} kg</p>
                      </div>
                      <div className="bg-gray-700 p-3 rounded">
                        <p className="text-gray-400">Chest</p>
                        <p className="text-white font-semibold">{startEntry.chest} cm</p>
                      </div>
                      <div className="bg-gray-700 p-3 rounded">
                        <p className="text-gray-400">Waist</p>
                        <p className="text-white font-semibold">{startEntry.waist} cm</p>
                      </div>
                      <div className="bg-gray-700 p-3 rounded">
                        <p className="text-gray-400">Hips</p>
                        <p className="text-white font-semibold">{startEntry.hips} cm</p>
                      </div>
                      <div className="bg-gray-700 p-3 rounded">
                        <p className="text-gray-400">Thighs</p>
                        <p className="text-white font-semibold">{startEntry.thighs} cm</p>
                      </div>
                      <div className="bg-gray-700 p-3 rounded">
                        <p className="text-gray-400">Arms</p>
                        <p className="text-white font-semibold">{startEntry.arms} cm</p>
                      </div>
                    </div>
                    {startEntry.photo && (
                      <div className="relative w-full h-[400px] overflow-hidden rounded-lg bg-gray-900">
                        <img 
                          src={startEntry.photo} 
                          alt="Start Progress" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-white mb-4">End Date</h3>
                    <p className="text-gray-400 mb-6">{new Date(endEntry.date).toLocaleDateString()}</p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-700 p-3 rounded">
                        <p className="text-gray-400">Weight</p>
                        <p className="text-white font-semibold">{endEntry.weight} kg</p>
                      </div>
                      <div className="bg-gray-700 p-3 rounded">
                        <p className="text-gray-400">Chest</p>
                        <p className="text-white font-semibold">{endEntry.chest} cm</p>
                      </div>
                      <div className="bg-gray-700 p-3 rounded">
                        <p className="text-gray-400">Waist</p>
                        <p className="text-white font-semibold">{endEntry.waist} cm</p>
                      </div>
                      <div className="bg-gray-700 p-3 rounded">
                        <p className="text-gray-400">Hips</p>
                        <p className="text-white font-semibold">{endEntry.hips} cm</p>
                      </div>
                      <div className="bg-gray-700 p-3 rounded">
                        <p className="text-gray-400">Thighs</p>
                        <p className="text-white font-semibold">{endEntry.thighs} cm</p>
                      </div>
                      <div className="bg-gray-700 p-3 rounded">
                        <p className="text-gray-400">Arms</p>
                        <p className="text-white font-semibold">{endEntry.arms} cm</p>
                      </div>
                    </div>
                    {endEntry.photo && (
                      <div className="relative w-full h-[400px] overflow-hidden rounded-lg bg-gray-900">
                        <img 
                          src={endEntry.photo} 
                          alt="End Progress" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
              </>
            )}
        </div>

        {selectedEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-xl w-full max-h-[90vh] overflow-y-auto relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
                onClick={() => setSelectedEntry(null)}
              >
                <XCircle size={24} />
              </button>
              <h2 className="text-xl font-bold text-white mb-2">
                Progress Photo - {new Date(selectedEntry.date).toLocaleDateString()}
              </h2>
              <p className="text-sm text-gray-400 mb-4">
                View and analyze your progress photo
              </p>
              <div className="relative mb-6">
                <img
                  src={selectedEntry.photo}
                  alt="Progress"
                  className="rounded-lg w-full h-[500px] object-contain bg-gray-900"
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-400">Weight</p>
                  <p className="text-lg font-semibold text-white">{selectedEntry.weight} kg</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-400">Chest</p>
                  <p className="text-lg font-semibold text-white">{selectedEntry.chest} cm</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-400">Waist</p>
                  <p className="text-lg font-semibold text-white">{selectedEntry.waist} cm</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-400">Hips</p>
                  <p className="text-lg font-semibold text-white">{selectedEntry.hips} cm</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-400">Thighs</p>
                  <p className="text-lg font-semibold text-white">{selectedEntry.thighs} cm</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-400">Arms</p>
                  <p className="text-lg font-semibold text-white">{selectedEntry.arms} cm</p>
                </div>
              </div>
              {selectedEntry.notes && (
                <div className="mt-4 bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-400">Notes</p>
                  <p className="text-white">{selectedEntry.notes}</p>
                </div>
              )}
              <button
                onClick={() => handleDeletePhoto(selectedEntry._id)}
                className="mt-6 w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
              >
                <XCircle size={20} />
                Delete Photo
              </button>
            </div>
          </div>
        )}
        <div className="mt-12">
        <Footer/>
        </div>
      </div>
    </>
  );
}
