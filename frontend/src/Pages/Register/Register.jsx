import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { UserDataContext } from '../../Context/userContext';
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
  const handleHeightChange = (e) => {
    let value = Number(e.target.value);
    if (value < 1) value = ""; // Prevent negative or zero values
    setHeight(value);
  };

  const handleWeightChange = (e) => {
    let value = Number(e.target.value);
    if (value < 1) value = ""; // Prevent negative or zero values
    setWeight(value);
  };
  return (
    <div className='p-7 flex flex-col justify-between  min-h-screen'>
      <div>
        <h1 className='text-center text-xl'>Hey there,</h1>
        <h1 className='text-3xl text-center mt-2 font-bold'>Create an Account</h1>

        <form onSubmit={(e) => {
          submitHandler(e);
        }}
        >
          <h3 className='text-xl font-medium mt-5 mb-2'>What's your name?</h3>
          <div className='flex gap-4'>
            <i className="glass flex gap-2 w-full rounded-lg mb-5 px-4 py-3  text-2xl placeholder:text-base ri-map-pin-user-line">
              <input className='bg-transparent w-full outline-none text-lg' type="text" required placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)} />
            </i>
          </div>

          <h3 className='text-xl font-medium mb-2'>What's your email?</h3>
          <div className='flex gap-4'>
            <i className="glass flex gap-2 w-full rounded-lg mb-5 px-4 py-3  text-2xl placeholder:text-base ri-mail-ai-line">
              <input className=' bg-transparent w-full outline-none text-lg' required type="email" placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </i>
          </div>

          <h3 className='text-xl font-medium mb-2'>What's your Password?</h3>
          <div className='flex gap-4'>
            <i className="glass flex gap-2 w-full rounded-lg mb-5 px-4 py-3  text-2xl placeholder:text-base ri-lock-2-line">
              <input className='bg-transparent w-full outline-none text-lg' required type="password" placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </i>
          </div>

          <h3 className='text-xl font-medium mb-2'>What's your gender?</h3>
          <div className='flex gap-4'>
            <i className="glass flex gap-2 w-full rounded-lg mb-5 px-4 py-3 border-2 border-black text-2xl placeholder:text-base ri-user-heart-line">
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full outline-none text-lg bg-transparent"
                required
              >
                <option value="">Select Your Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </i>
          </div>

          <h3 className='text-xl font-medium mb-2'>What's your date of birth?</h3>
          <div className='flex gap-4'>
            <i className="glass flex gap-2 w-full rounded-lg mb-5 px-4 py-3 border-2 border-black text-2xl placeholder:text-base ri-calendar-line">
              <input
                type="date"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full outline-none text-lg bg-transparent"
                required
              />
            </i>
          </div>

          <h3 className='text-xl font-medium mb-2'>What's your weight?</h3>
          <div className='flex gap-4'>
            <i className="glass flex gap-2 w-full rounded-lg mb-5 px-4 py-3 border-2 border-black text-2xl placeholder:text-base ri-scales-3-line">
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={handleWeightChange}
                placeholder="Enter Your Weight in KG"
                className="w-full outline-none text-lg bg-transparent"
                required
              />
            </i>
          </div>

          <h3 className='text-xl font-medium mb-2'>What's your height?</h3>
          <div className='flex gap-4'>
            <i className="glass flex gap-2 w-full rounded-lg mb-5 px-4 py-3 border-2 border-black text-2xl placeholder:text-base ri-ruler-line">
              <input
                type="number"
                id="height"
                value={height}
                onChange={handleHeightChange}
                placeholder="Enter Your Height in Feet & Inches"
                className="w-full bg-black outline-none text-lg bg-transparent"
                required
              />
            </i>
          </div>

          <div className='mt-5 '>
            <button className='glass text-white font-semibold rounded-xl mb-3 px-4 py-5  w-full text-lg '>Register</button>

            <div className='flex justify-center items-center'>
              <span className='px-3'>----------------------</span>
              <span className='text-3xl '>or</span>
              <span className=' px-3'>----------------------</span>
            </div>

            <div className='flex justify-center items-center gap-4 mt-3'>
              <button className='glass font-semibold rounded-xl mb-3 px-3 py-3 '><i className="text-2xl text-blue-700 ri-google-fill"></i></button>

              <button className='glass font-semibold rounded-xl mb-3 px-3 py-3 '><i className="text-2xl text-blue-700 ri-facebook-fill"></i></button>
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