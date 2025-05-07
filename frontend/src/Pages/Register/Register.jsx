import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../../Context/UserContext';
import { toast, ToastContainer } from 'react-toastify';

const Register = () => {
  // Declare state variables for each input field
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  // Get the setUser function from the UserDataContext
  const { setUser } = React.useContext(UserDataContext);
  // Get the navigate function from the useNavigate hook
  const navigate = useNavigate();

  // Function to validate the form
  const validateForm = () => {
    // Check if any of the input fields are empty
    if (!name || !email || !password || !gender || !dob || !weight || !height) {
      // If any of the input fields are empty, show an error message
      toast.error('All fields are required.', { position: 'top-right', theme: 'dark' });
      return false;
    }
    // Check if the password is at least 6 characters long
    if (password.length < 6) {
      // If the password is less than 6 characters, show an error message
      toast.error('Password must be at least 6 characters long.', { position: 'top-right', theme: 'dark' });
      return false;
    }
    // If all the input fields are valid, return true
    return true;
  };

  // Function to handle form submission
  const submitHandler = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    // Validate the form
    if (!validateForm()) return;

    // Create a new user object with the input values
    const newUser = { name, email, password, gender, dob, weight, height };

    try {
      // Send a POST request to the server to register the new user
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
      // If the response status is 201, the user was successfully registered
      if (response.status === 201) {
        // Get the user data from the response
        const data = response.data;
        // Set the user data in the UserDataContext
        setUser(data.user);
        // Store the token in local storage
        localStorage.setItem('token', data.token);
        // Show a success message
        toast.success('Registration successful!', { position: 'top-right', theme: 'dark' });
        // Redirect the user to the login page after 2 seconds
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (error) {
      // If there is an error, show an error message
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.', { position: 'top-right', theme: 'dark' });
    }
    
     // Reset the input fields
     setName('')
     setEmail('')
     setPassword('')
     setGender('')
     setDob('')
     setWeight('')
     setHeight('')
   }
   // Function to handle height input change
   const handleHeightChange = (e) => {
     // Get the value of the input field
     let value = Number(e.target.value);
     if (value < 1) value = ""; // Prevent negative or zero values
     setHeight(value);
   }
   const handleWeightChange = (e) => {
     let value = Number(e.target.value);
     if (value < 1) value = ""; // Prevent negative or zero values
     setWeight(value);
   };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      {/* Background video - using the iStock particles video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          className="absolute min-w-full min-h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://media.istockphoto.com/id/1937150599/video/blue-purple-particles-explode-into-energy-flowers.mp4?s=mp4-640x640-is&k=20&c=XZmx7x3EPKymG32dVStO3DBpTVwaSr6fHmJtGFZDj10=" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-4 sm:px-0 max-h-screen">
        <div className="bg-black/50 backdrop-blur-xl p-5 sm:p-6 rounded-3xl shadow-2xl border border-purple-500/20 overflow-y-auto max-h-[95vh]">
          <div className="mb-4 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
              ENERGY FITNESS
            </h1>
            <p className="text-purple-200 mt-1 opacity-80 text-sm">Transform your body with power</p>
          </div>
          
          <form onSubmit={submitHandler} className="mt-4 space-y-3">
            <div className="space-y-3">
              <div>
                <label htmlFor="name" className="text-xs font-medium text-purple-200 block mb-1">Full Name</label>
                <input 
                  id="name"
                  type="text" 
                  placeholder="John Doe" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 border border-purple-700/50 rounded-xl bg-purple-900/30 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300/50 text-sm"
                  required 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="email" className="text-xs font-medium text-purple-200 block mb-1">Email</label>
                  <input 
                    id="email"
                    type="email" 
                    placeholder="your@email.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 border border-purple-700/50 rounded-xl bg-purple-900/30 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300/50 text-sm"
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="text-xs font-medium text-purple-200 block mb-1">Password</label>
                  <input 
                    id="password"
                    type="password" 
                    placeholder="Min. 6 characters" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2.5 border border-purple-700/50 rounded-xl bg-purple-900/30 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300/50 text-sm"
                    required 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="gender" className="text-xs font-medium text-purple-200 block mb-1">Gender</label>
                  <select 
                    id="gender"
                    value={gender} 
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full p-2.5 border border-purple-700/50 rounded-xl bg-purple-900/30 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white text-sm"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="dob" className="text-xs font-medium text-purple-200 block mb-1">Date of Birth</label>
                  <input 
                    id="dob"
                    type="date" 
                    value={dob} 
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full p-2.5 border border-purple-700/50 rounded-xl bg-purple-900/30 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white text-sm"
                    required 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="weight" className="text-xs font-medium text-purple-200 block mb-1">Weight (kg)</label>
                  <input 
                    id="weight"
                    type="number" 
                    placeholder="Weight" 
                    value={weight} 
                    onChange={handleWeightChange}
                    className="w-full p-2.5 border border-purple-700/50 rounded-xl bg-purple-900/30 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300/50 text-sm"
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="height" className="text-xs font-medium text-purple-200 block mb-1">Height (ft)</label>
                  <input 
                    id="height"
                    type="number" 
                    placeholder="Height" 
                    value={height} 
                    onChange={handleHeightChange}
                    className="w-full p-2.5 border border-purple-700/50 rounded-xl bg-purple-900/30 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300/50 text-sm"
                    required 
                  />
                </div>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="w-full mt-5 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-500 text-white p-3 rounded-xl hover:opacity-90 transition duration-300 font-medium shadow-lg shadow-purple-700/30 text-sm"
            >
              Join Now
            </button>
          
            <p className="text-center mt-3 text-purple-200/80 text-xs">
              Already have an account? <Link to="/login" className="text-blue-400 hover:text-purple-300 font-medium">Log in</Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;




