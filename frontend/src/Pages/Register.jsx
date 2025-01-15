import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { UserDataContext } from '../Context/userContext';
import { toast, ToastContainer } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [dob, setDob] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')

  const [userData, setUserData] = useState({})
  const { user, setUser } = React.useContext(UserDataContext)
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
    if (!validateForm()) return true;
    const newUser = {
      name: name,
      email: email,
      password: password,
      gender: gender,
      dob: dob,
      weight: weight,
      height: height
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
      if (response.status === 201) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        toast.success('Registration successful!', {
          position: 'top-right',
          theme: "dark",
        });
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.', {
        position: 'top-right',
        theme: "dark",
      });
    }

    setName('')
    setEmail('')
    setPassword('')
    setGender('')
    setDob('')
    setWeight('')
    setHeight('')
  }
  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <h1 className='text-center text-xl'>Hey there,</h1>
        <h1 className='text-3xl text-center mt-2 font-bold'>Create an Account</h1>

        <form onSubmit={(e) => {
          submitHandler(e);
        }}
        >
          <h3 className='text-xl font-medium mt-3 mb-2'>What's your name</h3>
          <div className='flex gap-4'>
            <i className="bg-white  flex gap-2 w-full rounded-lg mb-5 px-4 py-2  border-2 border-black text-2xl placeholder:text-base ri-map-pin-user-line">
              <input className='w-full outline-none' type="text" required placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)} />
            </i>
          </div>


          <h3 className='text-xl font-medium mb-2'>What's your email</h3>
          <div className='flex gap-4'>
            <i className="bg-white  flex gap-2 w-full rounded-lg mb-5 px-4 py-2  border-2 border-black text-2xl placeholder:text-base ri-mail-ai-line">
              <input className='w-full outline-none' required type="email" placeholder='email@example.com' value={email} onChange={(e) => setEmail(e.target.value)} />
            </i>
          </div>

          <h1 className='text-xl font-medium mb-2'>What's your Password</h1>
          <div className='flex gap-4'>
            <i className="bg-white  flex gap-2 w-full rounded-lg mb-5 px-4 py-2  border-2 border-black text-2xl placeholder:text-base ri-lock-2-line">
              <input className='w-full outline-none' required type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </i>
          </div>

          <div className="mb-2 ">
            <label htmlFor="gender" className="block mb-2   font-semibold text-black text-xl">
              Choose Gender
            </label>
            <select
              name="gender"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 block w-full px-4 py-2 text-gray-400  rounded-md border-2 border-black font-semibold text-xl"
              required
            >
              <option value=""> Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>


          <div className="mb-2">
            <label htmlFor="dob" className="block text-xl font-semibold text-black">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="mt-1 block text-xl px-3 py-4 w-full rounded-md border-2 border-black "
              required
            />
          </div>



          <div className="mb-4">
            <label htmlFor="weight" className="block text-xl font-semibold text-black">
              Your Weight (kg)
            </label>
            <input
              type="number"
              name="weight"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Weight in KG"
              className="mt-1 block px-3 py-4 text-xl w-full rounded-md border-2 border-black  font-semibold  "
              required
            />
          </div>


          <div className="mb-4">
            <label htmlFor="height" className="block text-xl font-semibold text-black">
              Your Height (cm)
            </label>
            <input
              type="number"
              name="height"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Height in CM"
              className="mt-1 block px-3 py-4  w-full rounded-md border-2 border-black  placeholder:font-semibold text-xl   "
              required
            />
          </div>


          {/* <div className='flex items-center gap-4'>
            <input className='w-9 h-9 text-blue-600 bg-gray-100 border-gray-300 rounded ' type="checkbox" />
            <p>By continuing you accept our Privacy Policy and Term of Use</p>
          </div> */}

          <div className='mt-5 '>
            <button className='bg-gradient-to-r from-blue-200 to-blue-500 text-white font-semibold rounded-xl mb-3 px-4 py-5  w-full text-lg '>Register</button>

            <div className='flex justify-center items-center'>
              <span className='px-3'>----------------------</span>
              <span className='text-3xl '>or</span>
              <span className=' px-3'>----------------------</span>
            </div>

            <div className='flex justify-center items-center gap-4 mt-3'>
              <button className='bg-white border-2 border-black  font-semibold rounded-xl mb-3 px-3 py-3 '><i className="text-2xl text-blue-700 ri-google-fill"></i></button>

              <button className='bg-white border-2 border-black  font-semibold rounded-xl mb-3 px-3 py-3 '><i className="text-2xl text-blue-700 ri-facebook-fill"></i></button>
            </div>
          </div>
        </form>
        <p className='text-center text-lg  font-semibold'> Already have an account? <Link to='/login' className='text-blue-600 text-xl cursor-pointer'>Login here</Link></p>
      </div>

      <div>

        <ToastContainer></ToastContainer>

      </div>
    </div>
  )
}

export default Register