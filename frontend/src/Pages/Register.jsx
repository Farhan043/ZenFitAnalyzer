import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { UserDataContext } from '../Context/userContext';

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})
  const { user, setUser } = React.useContext(UserDataContext)

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      name: name,
      email: email,
      password: password,
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
    if (response.status === 201) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }

    setName('')
    setEmail('')
    setPassword('')
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
          <h3 className='text-xl font-medium mt-8 mb-2'>What's your name</h3>
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

          <div className='flex items-center gap-4'>
            <input className='w-9 h-9 text-blue-600 bg-gray-100 border-gray-300 rounded ' type="checkbox" />
            <p>By continuing you accept our Privacy Policy and Term of Use</p>
          </div>

          <div className='mt-28 '>
            <button className='bg-gradient-to-r from-blue-200 to-blue-500 text-white font-semibold rounded-xl mb-3 px-4 py-5  w-full text-lg '>Register</button>

            <div className='flex justify-center items-center mt-2'>
              <span className='px-3'>----------------------</span>
              <span className='text-3xl '>or</span>
              <span className=' px-3'>----------------------</span>
            </div>

            <div className='flex justify-center items-center gap-4 mt-5'>
              <button className='bg-white border-2 border-black  font-semibold rounded-xl mb-3 px-3 py-3 '><i className="text-2xl text-blue-700 ri-google-fill"></i></button>

              <button className='bg-white border-2 border-black  font-semibold rounded-xl mb-3 px-3 py-3 '><i className="text-2xl text-blue-700 ri-facebook-fill"></i></button>
            </div>
          </div>
        </form>
        <p className='text-center text-lg  font-semibold'> Already have an account? <Link to='/login' className='text-blue-600 text-xl cursor-pointer'>Login here</Link></p>
      </div>

      <div>

      </div>
    </div>
  )
}

export default Register