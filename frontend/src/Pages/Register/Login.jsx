// import React, { useContext, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { UserDataContext } from '../../Context/UserContext'
// import axios from 'axios'
// import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState(1); // Step 1: Login, Step 2: OTP Verification
//   const { setUser } = useContext(UserDataContext);
//   const navigate = useNavigate();

//     // **1️⃣ Send OTP**
//     const sendOTP = async (e) => {
//       e.preventDefault();
//       try {
//         const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/send-otp`, { email });
//         console.log(response.data);
//         toast.success("OTP sent to your email.");
//         setStep(2);
//       } catch (error) {
//         console.error("Error sending OTP:", error.response?.data || error.message);
//         toast.error(error.response?.data?.message || "Error sending OTP.");
//       }
//     };
    
  
//     // **2️⃣ Verify OTP**
//     const verifyOTP = async (e) => {
//       e.preventDefault();
//       try {
//         const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/verify-otp`, { email, otp });
//         localStorage.setItem("token", res.data.token);
//         setUser(res.data.user);
//         toast.success("Login successful!");
//         setTimeout(() => navigate("/welcome"), 1000);
//       } catch (error) {
//         toast.error("Invalid OTP.");
//       }
//     };
  
//   const submitHandler = async (e) => {
//     e.preventDefault()
//     const userData = {
//       email: email,
//       password: password
//     }

//     try {
//       const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
//       if (response.status === 200) {
//         const data = response.data
//         setUser(data.user)
//         localStorage.setItem('token', data.token)
//         toast.success('Login successful! Redirecting...', {
//           position: 'top-right',
//           theme: "dark",
//         });
//         setTimeout(() => navigate('/welcome'), 1000);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.', {
//         position: 'top-right',
//         theme: "dark",
//       });
//     }
//     setEmail('')
//     setPassword('')
//   }
//   return (
//     <div className='p-7 flex flex-col justify-between glass min-h-screen'>

//       <div>

//         <h1 className='text-center text-xl'>Hey there,</h1>
//         <h1 className='text-3xl text-center mt-2 font-bold'>Welcome Back</h1>

//         <form onSubmit={submitHandler} >
//           <h3 className='text-xl font-medium mt-16 mb-2'>What's your email</h3>
//           <div className='flex gap-4'>
//             <i className="bg-white  flex gap-2 w-full rounded-lg mb-5 px-4 py-3  text-2xl placeholder:text-base ri-mail-ai-line">
//               <input className=' w-full outline-none' required type="email" placeholder='email@example.com' value={email} onChange={(e) => setEmail(e.target.value)} />
//             </i>
//           </div>

//           <h1 className='text-xl font-medium mb-2'>What's your Password</h1>
//           <div className='flex gap-4'>
//             <i className="bg-white flex gap-2 w-full rounded-lg mb-5 px-4 py-3   text-2xl placeholder:text-base ri-lock-2-line">
//               <input className=' w-full outline-none' required type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
//             </i>
//           </div>

//           <div className='mt-52 '>
//             <button className='glass text-white font-semibold rounded-xl mb-3 px-4 py-5  w-full text-lg '>Login</button>

//             <div className='flex justify-center items-center mt-2'>
//               <span className='px-3'>------------------</span>
//               <span className='text-3xl '>or</span>
//               <span className=' px-3'>------------------</span>
//             </div>

//             <div className='flex justify-center items-center gap-4 mt-5'>
//               <button className='glass   font-semibold rounded-xl mb-3 px-3 py-3 '><i className="text-2xl text-blue-700 ri-google-fill"></i></button>

//               <button className='glass   font-semibold rounded-xl mb-3 px-3 py-3 '><i className="text-2xl text-blue-700 ri-facebook-fill"></i></button>
//             </div>

//           </div>
//         </form>
//         <p className='text-center font-semibold'> Don't have an account yet? <Link to='/register' className='text-blue-600 text-xl cursor-pointer'>Register</Link></p>
//       </div>

//       <ToastContainer></ToastContainer>
//     </div>
//   )
// }

// export default Login



















import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../../Context/UserContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const sendOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/send-otp`, { email });
      toast.success("OTP sent to your email.");
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending OTP.");
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/verify-otp`, { email, otp });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      toast.success("Login successful!");
      setTimeout(() => navigate("/welcome"), 1000);
    } catch (error) {
      toast.error("Invalid OTP.");
    }
  };

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-slate-500 to-slate-800 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-gradient-to-t from-slate-800 to-gray-950 shadow-lg rounded-xl p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-center text-gray-300">Welcome Back</h2>
        <p className="text-gray-300 text-center mt-2">Login to continue</p>
        {step === 1 ? (
          <form onSubmit={submitHandler} className="mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-300">Email Address</label>
              <input
                type="email"
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white mt-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
            <p className="text-center text-sm text-gray-300 mt-4">
              Don't have an account? <Link to="/register" className="text-blue-600">Register</Link>
            </p>
          </form>
        ) : (
          <form onSubmit={verifyOTP} className="mt-6">
            <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white mt-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Verify OTP
            </button>
          </form>
        )}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button className="bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition">
            <i className="text-blue-600 ri-google-fill text-2xl"></i>
          </button>
          <button className="bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition">
            <i className="text-blue-600 ri-facebook-fill text-2xl"></i>
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" theme="dark" />
    </div>
  );
};

export default Login;





