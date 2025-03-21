

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    fetchProgressEntries();
  }, []);

  const fetchProgressEntries = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:4000/body-progress/user",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProgressEntries(response.data);
      setAnalysisData(response.data);
    } catch (error) {
      console.error("Error fetching progress entries:", error);
    }
  };
  const fetchProgressByDateRange = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:4000/body-progress/progress-by-date",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { startDate, endDate },
        }
      );
  
      // Save data in state
      setProgressData(response.data.progressData);
      setWeightChange(response.data.weightChange);
      setBodyCompositionChanges(response.data.bodyCompositionChanges);
      setWeightProgressData(response.data.weightProgressData);
  
      // Save data in localStorage for persistence
      localStorage.setItem("progressData", JSON.stringify(response.data.progressData));
      localStorage.setItem("weightChange", JSON.stringify(response.data.weightChange));
      localStorage.setItem("bodyCompositionChanges", JSON.stringify(response.data.bodyCompositionChanges));
      localStorage.setItem("weightProgressData", JSON.stringify(response.data.weightProgressData));
    } catch (error) {
      console.error("Error fetching progress data:", error);
      toast.error("Failed to fetch progress data.");
    }
  };
  

  useEffect(() => {
    // Retrieve data from localStorage if available
    const savedProgressData = localStorage.getItem("progressData");
    const savedWeightChange = localStorage.getItem("weightChange");
    const savedBodyCompositionChanges = localStorage.getItem("bodyCompositionChanges");
    const savedWeightProgressData = localStorage.getItem("weightProgressData");
  
    if (savedProgressData) setProgressData(JSON.parse(savedProgressData));
    if (savedWeightChange) setWeightChange(JSON.parse(savedWeightChange));
    if (savedBodyCompositionChanges) setBodyCompositionChanges(JSON.parse(savedBodyCompositionChanges));
    if (savedWeightProgressData) setWeightProgressData(JSON.parse(savedWeightProgressData));
  }, []);
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };


  const weightChartData = {
    labels: weightProgressData.map((entry) => entry.date), // Dates from backend
    datasets: [
      {
        label: "Weight Progress",
        data: weightProgressData.map((entry) => entry.weight), // Weight values
        borderColor: "blue",
        backgroundColor: "rgba(59, 130, 246, 0.2)", // Light blue fill
        pointBorderColor: "blue",
        pointBackgroundColor: "white",
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
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
    if (!token) {
      setError("User not authenticated. Please log in.");
      return;
    }

    const data = new FormData();
    data.append("photo", image);
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
      fetchProgressEntries(); // Refresh progress entries
    } catch (error) {
      setError(error.response?.data?.message || "Error uploading image");
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
            <Link to="/profile" className="hover:text-blue-400 transition">
              Profile
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
              to="/profile"
              className="py-2 px-4 hover:bg-gray-700 rounded-md"
            >
              Profile
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 overflow-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  name="date"
                  className="border p-2 rounded-lg w-full"
                  value={formData.date}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="weight"
                  placeholder="Weight (kg)"
                  className="border p-2 rounded-lg w-full"
                  value={formData.weight}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="chest"
                  placeholder="Chest (cm)"
                  className="border p-2 rounded-lg w-full"
                  value={formData.chest}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="waist"
                  placeholder="Waist (cm)"
                  className="border p-2 rounded-lg w-full"
                  value={formData.waist}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="hips"
                  placeholder="Hips (cm)"
                  className="border p-2 rounded-lg w-full"
                  value={formData.hips}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="thighs"
                  placeholder="Thighs (cm)"
                  className="border p-2 rounded-lg w-full"
                  value={formData.thighs}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="arms"
                  placeholder="Arms (cm)"
                  className="border p-2 rounded-lg w-full"
                  value={formData.arms}
                  onChange={handleInputChange}
                />
              </div>
              <textarea
                name="notes"
                className="border p-2 rounded-lg w-full mt-4"
                placeholder="Add notes..."
                value={formData.notes}
                onChange={handleInputChange}
              ></textarea>
              {preview ? (
                <div className="relative mt-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-4 rounded-lg w-full max-h-64 object-cover"
                  />
                  <button
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    onClick={handleDeleteImage}
                  >
                    <XCircle size={24} />
                  </button>
                </div>
              ) : (
                <div
                  className="border-dashed border-2 border-gray-300 p-6 flex flex-col items-center text-gray-500 w-full mt-4 cursor-pointer"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <Camera size={40} />
                  <p>Drag and drop or click to browse</p>
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
                <p className="text-red-500 mt-2 text-center">{error}</p>
              )}
              <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
                onClick={handleUpload}
              >
                Upload
              </button>
              <button
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg w-full"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 w-full max-w-8xl">
          {activeTab === "photos" && progressEntries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {progressEntries.map((entry) => (
                <div
                  onClick={() => setSelectedEntry(entry)}
                  key={entry._id}
                  className="bg-gray-600 p-4 shadow-lg rounded-lg cursor-pointer"
                >
                  <img
                    src={entry.photo}
                    alt="Progress"
                    className="w-full h-40 object-contain mx-auto rounded-md"
                  />
                  <p className="text-gray-50 mt-2">
                    <strong>Date:</strong>{" "}
                    {new Date(entry.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-50">
                    <strong>Weight:</strong> {entry.weight} kg
                  </p>
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
                <p>
                  Total{" "}
                  <span
                    className={`text-${weightChange < 0 ? "green" : "red"}-500`}
                  >
                    {weightChange.toFixed(1)} kg
                  </span>
                </p>
              </div>

              {/* Body Composition */}
              <div className="p-4 border rounded">
                <h2 className="font-semibold">Body Composition</h2>
                <p>Measurement changes</p>
                <ul>
                  {bodyCompositionChanges.map((item) => (
                    <li key={item.part}>
                      {item.part.charAt(0).toUpperCase() + item.part.slice(1)}{" "}
                      <span
                        className={`text-${
                          item.change < 0 ? "green" : "red"
                        }-500`}
                      >
                        {item.change.toFixed(1)} cm
                      </span>
                    </li>
                  ))}
                </ul>
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
                  <div className="w-full">
                    <Line
                      data={weightChartData}
                      options={{ responsive: true, maintainAspectRatio: false }}
                    />
                  </div>
                ) : (
                  <p className="text-gray-400">
                    No weight data available for selected range.
                  </p>
                )}
              </div>
              </>
            )}
        </div>

        {selectedEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-gray-600 p-6 rounded-lg shadow-lg max-w-xl w-full max-h-[90vh] overflow-y-auto relative">
              <button
                className="absolute top-2 right-2"
                onClick={() => setSelectedEntry(null)}
              >
                <XCircle
                  size={24}
                  className="text-gray-50 hover:text-gray-50"
                />
              </button>
              <h2 className="text-xl text-blue-400 font-bold">
                Progress Photo - {selectedEntry.date}
              </h2>
              <p className="text-sm text-gray-50">
                View and analyze your progress photo
              </p>
              <div className="relative mt-4">
                <img
                  src={selectedEntry.photo}
                  alt="Progress"
                  className="rounded-lg w-full max-h-64 object-contain"
                />
              </div>
              <div className="mt-4">
                <p className="text-blue-400">
                  <strong>Date:</strong> {selectedEntry.date}
                </p>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-black bg-opacity-100 border-2 border-blue-400 p-2 rounded text-center">
                    <p className="text-xs text-blue-400">Weight</p>
                    <p className="font-semibold">{selectedEntry.weight} kg</p>
                  </div>
                  <div className="bg-black bg-opacity-100 p-2 border-2 border-blue-400 rounded text-center">
                    <p className="text-xs text-blue-400">Chest</p>
                    <p className="font-semibold">{selectedEntry.chest} cm</p>
                  </div>

                  <div className="bg-black bg-opacity-100 border-2 border-blue-400 p-2 rounded text-center">
                    <p className="text-xs text-blue-400">Waist</p>
                    <p className="font-semibold">{selectedEntry.waist} cm</p>
                  </div>
                  <div className="bg-black bg-opacity-100 border-2 border-blue-400 p-2 rounded text-center">
                    <p className="text-xs text-blue-400">Hips</p>
                    <p className="font-semibold">{selectedEntry.hips} cm</p>
                  </div>
                  <div className="bg-black bg-opacity-100 border-2 border-blue-400 p-2 rounded text-center">
                    <p className="text-xs text-blue-400">Thighs</p>
                    <p className="font-semibold">{selectedEntry.thighs} cm</p>
                  </div>
                  <div className="bg-black bg-opacity-100 border-2 border-blue-400 p-2 rounded text-center">
                    <p className="text-xs text-blue-400">Arms</p>
                    <p className="font-semibold">{selectedEntry.arms} cm</p>
                  </div>
                </div>
                {/* <p className="mt-4"><strong>Notes:</strong> {selectedEntry.notes}</p> */}
                <div className="bg-black mt-2 bg-opacity-100 border-2 border-blue-400 p-2 rounded flex items-center gap-1">
                  <p className="text-xl text-blue-400">Notes:</p>
                  <p className="font-semibold">{selectedEntry.notes}</p>
                </div>
              </div>
              <button
                onClick={() => handleDeletePhoto(selectedEntry._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg w-full"
              >
                Delete Photo
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
