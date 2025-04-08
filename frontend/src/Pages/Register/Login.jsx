import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../../Context/UserContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, { email, password });
      if (response.status === 200) {
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful! Redirecting...");
        setTimeout(() => navigate("/welcome"), 1000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          className="absolute min-w-full min-h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://media.istockphoto.com/id/1723566466/video/purple-technology-background.mp4?s=mp4-480x480-is&k=20&c=auuSGjnkkGQl7XN0v1n9qVRgfjGHCrAmXrJiXDdYdMk=" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-4 sm:px-0">
        <div className="bg-black/50 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-2xl border border-purple-500/30">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
              ENERGY FITNESS
            </h2>
            <p className="text-purple-200 mt-2 opacity-80 text-sm">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-purple-200 block mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full p-3 pr-10 border border-purple-700/50 rounded-xl bg-purple-900/30 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300/50 text-sm"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <svg className="w-5 h-5 absolute right-3 top-3 text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
              </div>
            </div>
            
            <div>
              <label className="text-xs font-medium text-purple-200 block mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full p-3 pr-10 border border-purple-700/50 rounded-xl bg-purple-900/30 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-purple-300/50 text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <svg className="w-5 h-5 absolute right-3 top-3 text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full mt-2 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-500 text-white p-3 rounded-xl hover:opacity-90 transition duration-300 font-medium shadow-lg shadow-purple-700/30 text-sm"
            >
              Sign In
            </button>
            
            <div className="relative flex items-center justify-center mt-6">
              <div className="h-px bg-purple-700/30 w-full"></div>
              <p className="text-xs text-purple-300 bg-transparent px-3 absolute">or continue with</p>
            </div>
            
            <div className="flex items-center justify-center gap-6 mt-6">
              <button type="button" className="bg-purple-900/40 p-2 rounded-full border border-purple-700/30 hover:bg-purple-800/40 transition">
                <svg className="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.5 8.8v1.7h3.1c-.3 1.4-1.4 2.4-3.1 2.4-1.9 0-3.4-1.5-3.4-3.4s1.5-3.4 3.4-3.4c.8 0 1.5.3 2.1.8l1.3-1.3C14.7 4.7 13.7 4.3 12.5 4.3c-2.9 0-5.3 2.4-5.3 5.3s2.4 5.3 5.3 5.3c4.2 0 5.1-3.9 4.7-5.8h-4.7V8.8z" clipRule="evenodd"/>
                </svg>
              </button>
              <button type="button" className="bg-purple-900/40 p-2 rounded-full border border-purple-700/30 hover:bg-purple-800/40 transition">
                <svg className="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M13.1 6H15V3h-1.9A4.1 4.1 0 0 0 9 7.1V9H7v3h2v10h3V12h2l.6-3H12V7.1c0-.6.3-1.1 1.1-1.1Z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
            
            <p className="text-center text-xs text-purple-300 mt-6">
              Don't have an account? <Link to="/register" className="text-blue-400 hover:text-purple-300 font-medium">Register now</Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" theme="dark" />
    </div>
  );
};

export default Login;





