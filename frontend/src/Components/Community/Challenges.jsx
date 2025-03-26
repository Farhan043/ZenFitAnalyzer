import { Home, Trophy, Users, User, CalendarDays, Menu, X, Calendar, Check, Trash2 } from "lucide-react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FaTrophy } from 'react-icons/fa';
import { UserDataContext } from "../../Context/UserContext";
import axios from "axios"; // Import axios for API calls
import ProfileImage from '../Common/ProfileImage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = "http://localhost:4000"; // Replace with your backend's base URL

export default function Challenges() {
  const { user } = useContext(UserDataContext); // Access user data from context
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Discover");
  const tabs = ["Discover", "Joined", "Created by You"];

  const [step, setStep] = useState(1);
  const [challengeData, setChallengeData] = useState({
    title: '',
    description: '',
    category: '',
    duration: '',
    startDate: '',
    invitees: '',
  });
  const [createdChallenges, setCreatedChallenges] = useState([]);
  const [discoverChallenges, setDiscoverChallenges] = useState([]);
  const [joinedChallenges, setJoinedChallenges] = useState([]); // State for joined challenges

  useEffect(() => {
    fetchChallenges();
  }, [activeTab]);

  const fetchChallenges = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Fetch created challenges
      const createdResponse = await axios.get(`${API_BASE_URL}/challenge/my-challenges`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCreatedChallenges(createdResponse.data);

      // Fetch all challenges for discover tab
      const discoverResponse = await axios.get(`${API_BASE_URL}/challenge`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDiscoverChallenges(discoverResponse.data);

      // Fetch joined challenges
      const joinedResponse = await axios.get(`${API_BASE_URL}/challenge/joined`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJoinedChallenges(joinedResponse.data);
    } catch (error) {
      console.error("Error fetching challenges:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setStep(1);
    setChallengeData({
      title: '',
      description: '',
      category: '',
      duration: '',
      startDate: '',
      invitees: '',
    });
  };

  const openModal = () => setIsModalOpen(true);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleCreateChallenge = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to create a challenge.");
        return;
      }

      // Ensure all required fields are provided
      if (!challengeData.title || !challengeData.category || !challengeData.duration || !challengeData.startDate) {
        alert("Please fill in all required fields.");
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/challenge/create`,
        challengeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newChallenge = response.data.challenge;
      
      // Make sure the new challenge is explicitly marked as not joined
      newChallenge.isJoined = false;
      
      // Initialize participants to 0 (creator is not auto-joined)
      newChallenge.participants = 0;
      
      // Add the challenge to appropriate lists
      setCreatedChallenges(prev => [...prev, newChallenge]);
      setDiscoverChallenges(prev => [...prev, newChallenge]);
      
      closeModal();
      
      // Alert user about successful creation with prompt to join
      // alert("Challenge created successfully! You can now join your challenge.");
      
      // Switch to Discover tab to show the newly created challenge
      setActiveTab("Discover");
    } catch (error) {
      console.error("Error creating challenge:", error);
      alert(error.response?.data?.error || "Failed to create challenge. Please try again.");
    }
  };

  // Update handleJoinChallenge to properly handle joining and updating all relevant lists

  const handleJoinChallenge = async (challengeId) => {
    try {
      if (!challengeId) {
        alert("Invalid challenge ID.");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to join a challenge.");
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/challenge/${challengeId}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    toast.success(response.data.message || "Successfully joined the challenge!");

      // Get the joined challenge from the response
      const joinedChallenge = response.data.challenge;

      // Update discover challenges to show as joined
      setDiscoverChallenges(prev =>
        prev.map(c =>
          c._id === challengeId
            ? { ...c, participants: (c.participants || 0) + 1, isJoined: true }
            : c
        )
      );

      // Update created challenges to show updated participant count
      setCreatedChallenges(prev =>
        prev.map(c =>
          c._id === challengeId
            ? { ...c, participants: (c.participants || 0) + 1 }
            : c
        )
      );

      // Add to joined challenges if not already there
      setJoinedChallenges(prev => {
        if (!prev.some(c => c._id === challengeId)) {
          return [...prev, joinedChallenge || { 
            ...discoverChallenges.find(c => c._id === challengeId),
            isJoined: true,
            participants: (discoverChallenges.find(c => c._id === challengeId)?.participants || 0) + 1
          }];
        }
        return prev;
      });
    } catch (error) {
      console.error("Error joining challenge:", error);
      const errorMessage =
        error.response?.data?.error || "Failed to join the challenge.";
      // alert(errorMessage);
    }
  };

  // Add a new function to handle challenge deletion
  const handleDeleteChallenge = async (challengeId, event) => {
    // Prevent the click from bubbling up to parent elements
    event.stopPropagation();
    
    // Confirm deletion with the user
    // if (!window.confirm("Are you sure you want to delete this challenge? This action cannot be undone.")) {
    //   return;
    // }
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to delete a challenge.");
        return;
      }

      await axios.delete(`${API_BASE_URL}/challenge/${challengeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Challenge deleted successfully!");

      // Remove the challenge from all lists
      setCreatedChallenges(prev => prev.filter(c => c._id !== challengeId));
      setDiscoverChallenges(prev => prev.filter(c => c._id !== challengeId));
      setJoinedChallenges(prev => prev.filter(c => c._id !== challengeId));
      
    } catch (error) {
      console.error("Error deleting challenge:", error);
      toast.error(error.response?.data?.error || "Failed to delete challenge");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-400 flex flex-col items-center text-center">
      <ToastContainer position="top-center" autoClose={3000} />
      
      {/* Navbar */}
      <nav className="w-full max-w-7xl flex justify-between items-center py-4 px-6">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-lg">
          <Trophy className="w-6 h-6" />{" "}
          <span className="text-xl">FitSocial</span>
        </div>
        <div className="hidden md:flex gap-8  text-gray-700 text-base">
          <NavItem to="/social" icon={<Home size={18} />} text="Home" />
          <NavItem
            to="/challenges"
            icon={<Trophy size={18} />}
            text="Challenges"
            active={true}
          />
          <NavItem to="/socialfeed" icon={<Users size={18} />} text="Social" />
          <NavItem to="/profile" icon={<User size={18} />} text="Profile" />
        </div>
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </nav>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center bg-white shadow-md w-full py-4">
          <NavItem to="/social" icon={<Home size={18} />} text="Home" />
          <NavItem to="/challenges" icon={<Trophy size={18} />} text="Challenges" active={true} />
          <NavItem to="/socialfeed" icon={<Users size={18} />} text="Social" />
          <NavItem to="/profile" icon={<User size={18} />} text="Profile" />
        </div>
      )}

      <div className="max-w-7xl w-full mt-7 px-6 py-4 mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-lg">
              <Trophy className="w-7 h-7" />{" "}
              <span className="text-3xl text-black">Challenges</span>
            </div>
            <p className="text-gray-500">
              Create or join fitness challenges with your friends
            </p>
          </div>

          <button
            onClick={openModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            + Create Challenge
          </button>
        </div>

        {/* Tab Section */}
        <div className="flex space-x-6 border-b bg-gradient-to-b from-white to-blue-300 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-center rounded-lg ${
                activeTab === tab
                  ? "bg-gradient-to-r from-white to-blue-300 text-black font-semibold shadow-lg"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="mt-6 p-4 bg-gradient-to-b from-white to-blue-300 rounded-lg shadow">
          {activeTab === "Discover" && (
            <div className="flex flex-wrap gap-5 justify-center">
              {discoverChallenges.length > 0 ? (
                discoverChallenges.map((challenge) => (
                  <ChallengeCard
                    key={challenge._id}
                    challenge={challenge}
                    isCreatedByUser={challenge.createdBy?._id === user?._id} 
                    isJoined={joinedChallenges.some((c) => c._id === challenge._id)}
                    onJoin={handleJoinChallenge}
                    onDelete={handleDeleteChallenge}
                    userId={user?._id}
                  />
                ))
              ) : (
                <p className="text-gray-700 py-10">No challenges available to discover.</p>
              )}
            </div>
          )}
          {activeTab === "Joined" && (
            <div className="flex flex-wrap gap-5 justify-center">
              {joinedChallenges.length > 0 ? (
                joinedChallenges.map((challenge) => (
                  <ChallengeCard
                    key={challenge._id}
                    challenge={challenge}
                    isCreatedByUser={challenge.createdBy?._id === user?._id}
                    isJoined={true}
                    onDelete={handleDeleteChallenge}
                    userId={user?._id}
                  />
                ))
              ) : (
                <p className="text-gray-700 py-10">You haven't joined any challenges yet.</p>
              )}
            </div>
          )}
          {activeTab === "Created by You" && (
            <div className="flex flex-wrap gap-5 justify-center">
              {createdChallenges.length > 0 ? (
                createdChallenges.map((challenge) => (
                  <ChallengeCard
                    key={challenge._id}
                    challenge={challenge}
                    isCreatedByUser={true}
                    isJoined={joinedChallenges.some((c) => c._id === challenge._id)}
                    onJoin={handleJoinChallenge}
                    onDelete={handleDeleteChallenge}
                    userId={user?._id}
                  />
                ))
              ) : (
                <p className="text-gray-700 py-10">You haven't created any challenges yet.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div className="fixed inset-0 bg-black bg-opacity-25" />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center border-b pb-4">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 flex items-center"
                    >
                      <FaTrophy className="text-blue-500 mr-2" /> Create New Challenge
                    </Dialog.Title>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">Step {step} of 3</span>
                      <button onClick={closeModal}>
                        <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                      </button>
                    </div>
                  </div>

                  {/* Step 1: Details */}
                  {step === 1 && (
                    <div className="mt-4">
                      <label className="block text-sm font-bold text-gray-700">Challenge Title <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={challengeData.title}
                        onChange={(e) =>
                          setChallengeData({ ...challengeData, title: e.target.value })
                        }
                        placeholder="e.g., 30-Day Running Challenge"
                        className="w-full px-3 py-2 border rounded-lg mt-1"
                      />

                      <label className="block text-sm font-bold text-gray-700 mt-4">Description</label>
                      <textarea
                        rows="3"
                        value={challengeData.description}
                        onChange={(e) =>
                          setChallengeData({ ...challengeData, description: e.target.value })
                        }
                        placeholder="Describe your challenge..."
                        className="w-full px-3 py-2 border rounded-lg mt-1"
                      ></textarea>

                      <label className="block text-sm font-bold text-gray-700 mt-4">Category <span className="text-red-500">*</span></label>
                      <select
                        value={challengeData.category}
                        onChange={(e) =>
                          setChallengeData({ ...challengeData, category: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg mt-1"
                      >
                        <option value="">Select category</option>
                        <option value="Running">Running</option>
                        <option value="Cycling">Cycling</option>
                        <option value="Walking">Walking</option>
                        <option value="Yoga">Yoga</option>
                        <option value="Strength">Strength</option>
                        <option value="Wellness">Wellness</option>
                      </select>

                      <button
                        onClick={handleNext}
                        disabled={!challengeData.title || !challengeData.category}
                        className={`mt-4 px-4 py-2 rounded-lg ${
                          !challengeData.title || !challengeData.category
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                      >
                        Continue
                      </button>
                    </div>
                  )}

                  {/* Step 2: Schedule */}
                  {step === 2 && (
                    <div className="mt-4">
                      <label className="block text-sm font-bold text-gray-700">Challenge Duration <span className="text-red-500">*</span></label>
                      <select
                        value={challengeData.duration}
                        onChange={(e) =>
                          setChallengeData({ ...challengeData, duration: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg mt-1"
                      >
                        <option value="">Select duration</option>
                        <option value="7 Days">7 Days</option>
                        <option value="14 Days">14 Days</option>
                        <option value="30 Days">30 Days</option>
                        <option value="60 Days">60 Days</option>
                        <option value="90 Days">90 Days</option>
                      </select>

                      <label className="block text-sm font-bold text-gray-700 mt-4">Start Date <span className="text-red-500">*</span></label>
                      <input
                        type="date"
                        value={challengeData.startDate}
                        min={new Date().toISOString().split('T')[0]} // Set minimum date to today
                        onChange={(e) =>
                          setChallengeData({ ...challengeData, startDate: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg mt-1"
                      />

                      <div className="flex justify-between mt-4">
                        <button
                          onClick={handleBack}
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleNext}
                          disabled={!challengeData.duration || !challengeData.startDate}
                          className={`px-4 py-2 rounded-lg ${
                            !challengeData.duration || !challengeData.startDate
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-blue-500 text-white hover:bg-blue-600'
                          }`}
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Invite */}
                  {step === 3 && (
                    <div className="mt-4">
                      <label className="block text-sm font-bold text-gray-700">Invite Friends (Optional)</label>
                      <textarea
                        rows="3"
                        value={challengeData.invitees}
                        onChange={(e) =>
                          setChallengeData({ ...challengeData, invitees: e.target.value })
                        }
                        placeholder="Enter email addresses separated by commas..."
                        className="w-full px-3 py-2 border rounded-lg mt-1"
                      ></textarea>

                      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                        <h4 className="text-sm font-bold mb-2 flex items-center">
                          <FaTrophy className="text-blue-500 mr-2" /> Challenge Summary
                        </h4>
                        <p className="text-sm"> <strong>Title:</strong> {challengeData.title || 'Not specified'}</p>
                        <p className="text-sm"> <strong>Category:</strong> {challengeData.category || 'Not specified'}</p>
                        <p className="text-sm"> <strong>Duration:</strong> {challengeData.duration || 'Not specified'}</p>
                        <p className="text-sm"> <strong>Start Date:</strong> {challengeData.startDate || 'Not specified'}</p>
                      </div>

                      <div className="flex justify-between mt-4">
                        <button
                          onClick={handleBack}
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleCreateChallenge}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                          Create Challenge
                        </button>
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

// Update the ChallengeCard component to include the delete icon for creators
function ChallengeCard({ challenge, isCreatedByUser, onJoin, isJoined, onDelete, userId }) {
  const categoryIcons = {
    Running: <FaTrophy />,
    Cycling: <FaTrophy />,
    Walking: <FaTrophy />,
    Yoga: <FaTrophy />,
    Strength: <FaTrophy />,
    Wellness: <FaTrophy />,
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Not specified";
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  // Get challenge status based on start date and duration
  const getChallengeStatus = () => {
    if (!challenge.startDate || !challenge.duration) return { status: 'Unknown', className: 'bg-gray-100 text-gray-800' };
    
    const now = new Date();
    const start = new Date(challenge.startDate);
    const durationDays = parseInt(challenge.duration.split(' ')[0]);
    
    const end = new Date(start);
    end.setDate(start.getDate() + durationDays);
    
    if (now < start) {
      return { status: 'Upcoming', className: 'bg-yellow-100 text-yellow-800' };
    } else if (now >= start && now <= end) {
      return { status: 'Active', className: 'bg-green-100 text-green-800' };
    } else {
      return { status: 'Completed', className: 'bg-gray-100 text-gray-800' };
    }
  };

  const { status, className } = getChallengeStatus();
  
  // Check if the current user is the creator of the challenge
  const isCreator = challenge.createdBy?._id === userId;

  return (
    <div className="w-full sm:w-96 border rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-gradient-to-b from-white to-blue-200">
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${className}`}>
            {status}
          </span>
          <div className="flex items-center gap-2">
            {isCreatedByUser && (
              <span className="text-xs font-semibold text-white bg-green-500 px-2 py-1 rounded-full">
                Your Challenge
              </span>
            )}
            {/* Only show delete icon if the user created this challenge */}
            {isCreator && (
              <button 
                onClick={(e) => onDelete(challenge._id, e)}
                className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-50"
                title="Delete challenge"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>
        
        <h3 className="text-lg font-semibold line-clamp-1 mt-2">{challenge.title}</h3>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            {categoryIcons[challenge.category] || <FaTrophy />}
            {challenge.category}
          </span>
        </div>
        
        <p className="text-sm text-gray-500 line-clamp-2">{challenge.description || "No description provided."}</p>
        
        <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />
            <span>{challenge.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{challenge.participants || 0} participants</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm border-t pt-3 mt-3">
          <div>
            <p className="text-gray-600 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Starts {formatDate(challenge.startDate)}
            </p>
          </div>
          
          {!isJoined && onJoin && (
            <button
              onClick={() => onJoin(challenge._id)}
              className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Join Challenge
            </button>
          )}
          
          {isJoined && (
            <span className="text-green-600 flex items-center gap-1 font-medium">
              <Check size={16} className="text-green-600" />
              Joined
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, text, to, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-300 
        ${active 
          ? "bg-blue-50 text-blue-600 font-semibold" 
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`}
    >
      {icon}
      {text}
    </Link>
  );
}


















