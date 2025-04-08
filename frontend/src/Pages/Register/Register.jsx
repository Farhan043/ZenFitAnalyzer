import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../../Context/UserContext';
import { toast, ToastContainer } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const { setUser } = React.useContext(UserDataContext);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!name || !email || !password || !gender || !dob || !weight || !height) {
      toast.error('All fields are required.', { position: 'top-right', theme: 'dark' });
      return false;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.', { position: 'top-right', theme: 'dark' });
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newUser = { name, email, password, gender, dob, weight, height };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        toast.success('Registration successful!', { position: 'top-right', theme: 'dark' });
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.', { position: 'top-right', theme: 'dark' });
    }
    
     setName('')
     setEmail('')
     setPassword('')
     setGender('')
     setDob('')
     setWeight('')
     setHeight('')
   }
   const handleHeightChange = (e) => {
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




