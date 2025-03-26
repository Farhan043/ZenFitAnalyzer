

 import { useState } from 'react';
 import { FaEnvelope, FaCommentDots } from 'react-icons/fa';
 import axios from 'axios';
 import { Link, useNavigate } from "react-router-dom";
 import { FaBars, FaTimes } from "react-icons/fa";
 import Footer from './Footer';
import FloatingButton from '../Pages/FloatingButton';

 export default function Contact() {
   const [formData, setFormData] = useState({ email: '', message: '' });
   const [error, setError] = useState('');
   const [success, setSuccess] = useState('');
     const [isOpen, setIsOpen] = useState(false);
     const [adviceOpen, setAdviceOpen] = useState(false);
     const navigate = useNavigate();

   const handleChange = (e) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
     e.preventDefault();
     setError('');
     setSuccess('');

    if (!formData.email || !formData.message) {
      setError('All fields are required');
      return;
    }

     try {
       const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/contact`, formData, {
         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
       });
       setSuccess(response.data.message);
       setFormData({ email: '', message: '' });
     } catch (err) {
       setError(err.response?.data?.error || 'Something went wrong');
     }
   };
    const handleLogout = () => {
       const token = localStorage.getItem('token');
       axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       })
         .then((response) => {
           if (response.status === 200) {
             localStorage.removeItem('token');
             navigate('/login');
           }
         })
         .catch((error) => {
           console.error('Logout failed:', error);
         });
     };
  

  return (
    <>
           <div className="p-3 bg-black min-h-screen">
            <div className="bg-black text-white p-5 shadow-blue-500 shadow-md">
              <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl flex items-center gap-2 font-bold">
                  <img src="/public/logo.gif" alt="" />
                  <span className="text-blue-400">ZenFit</span> AnalyZer
                </div> 
                <div className="hidden md:flex space-x-6 text-lg">
                  <Link to='/home' className="hover:text-blue-400 transition">Home</Link>
                  <Link to='/meal' className="hover:text-blue-400 transition">Meal</Link>
                  <Link to='/workout' className="hover:text-blue-400 transition">Workout</Link>
                  <Link to='/social' className="hover:text-blue-400 transition">community</Link>               
                  <div 
                    className="relative"
                    onMouseEnter={() => setAdviceOpen(true)}
                    onMouseLeave={() => setAdviceOpen(false)}
                  >
                    <div className=" hover:text-blue-400 transition">
                    <button className="hover:text-blue-400 transition">Advice</button>
                    {adviceOpen && (
                      <div className="absolute left-0  w-40 bg-gray-900 text-white shadow-lg rounded-lg">
                        <Link to='/fitness' className="block px-4 py-2 hover:bg-gray-700">Fitness</Link>
                        <Link to='/nutrition' className="block px-4 py-2 hover:bg-gray-700">Nutrition</Link>
                        <Link to='/selfcare' className="block px-4 py-2 hover:bg-gray-700">Self-Care</Link>
                        <Link to='/wellness' className="block px-4 py-2 hover:bg-gray-700">Wellness</Link>
                      </div>
                    )}
                    </div>
                  </div>
                </div> 
                <div className="flex gap-4 items-center">
                  <Link to='/notification'>
                    <i className="ri-notification-3-line text-2xl text-blue-400"></i>
                  </Link>
                  <div className="hidden md:block">
                    <button onClick={handleLogout} className="p-2 bg-black bg-opacity-50 rounded-full">
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
                  <Link to='/home' className="py-2 px-4 hover:bg-gray-700 rounded-md">Home</Link>
                  <Link to='/meal' className="py-2 px-4 hover:bg-gray-700 rounded-md">Meal</Link>
                  <Link to='/workout' className="py-2 px-4 hover:bg-gray-700 rounded-md">Workout</Link>
                  <Link to='/social' className="py-2 px-4 hover:bg-gray-700 rounded-md">community</Link>
                  <div className="flex flex-col">
                    <button className="py-2 px-4 hover:bg-gray-700  rounded-md">Advice</button>
                    <div className="ml-4 space-y-2">
                      <Link to='/fitness' className="block py-2 px-4 hover:bg-gray-600 rounded-md">Fitness</Link>
                      <Link to='/nutrition' className="block py-2 px-4 hover:bg-gray-600 rounded-md">Nutrition</Link>
                      <Link to='/selfcare' className="block py-2 px-4 hover:bg-gray-600 rounded-md">Self-Care</Link>
                      <Link to='/wellness' className="block py-2 px-4 hover:bg-gray-600 rounded-md">Wellness</Link>
                    </div>
                  </div>
                  <button onClick={handleLogout} className="p-2 mt-4 bg-gray-800 hover:bg-gray-700 rounded-md text-blue-400 text-lg w-full">
                    Logout
                  </button>
                </div>
              )}
            </div>
    

        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen gap-20 ">
          <div className="hidden md:block w-1/2 max-w-md">
            <img 
              src="/public/track.png" 
              alt="Fitness Inspiration" 
              className="rounded-lg w-72 ml-20 h-96 shadow-lg "
            />
            <p className="text-white text-lg font-bold mt-4 text-center">Stay motivated and keep pushing your limits. Reach out to us for any fitness guidance!</p>
          </div>
          <div className=" bg-blue-900  p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-3xl font-bold text-gray-200 text-center mb-6">Send us a message</h2>
         {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-2 text-center">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-100">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              value={formData.email} 
              onChange={handleChange} 
              className="w-full bg-transparent outline-none text-gray-700" 
            />
          </div>
          <div className="flex items-start border rounded-lg px-3 py-2 bg-gray-100">
            <FaCommentDots className="text-gray-500 mt-1 mr-2" />
            <textarea 
              name="message" 
              placeholder="Your Message" 
              value={formData.message} 
              onChange={handleChange} 
              className="w-full bg-transparent outline-none text-gray-700 h-24"
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Send Message
          </button>
        </form>
       </div>
     </div>
        <Footer />
        <FloatingButton/>
      </div>
    </>
  );
}