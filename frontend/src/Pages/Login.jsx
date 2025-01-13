import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../Context/userContext'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()
  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault()
    const userData = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
    if (response.status === 200) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }
    setEmail('')
    setPassword('')
  }
  return (
    <div className='p-7 flex flex-col justify-between h-screen'>

      <div>

        <h1 className='text-center text-xl'>Hey there,</h1>
        <h1 className='text-3xl text-center mt-2 font-bold'>Welcome Back</h1>

        <form onSubmit={(e) => {
          submitHandler(e);
        }} >
          <h3 className='text-xl font-medium mt-16 mb-2'>What's your email</h3>
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

          <div className='mt-52 '>
            <button className='bg-gradient-to-r from-blue-200 to-blue-500 text-white font-semibold rounded-xl mb-3 px-4 py-5  w-full text-lg '>Login</button>

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
        <p className='text-center font-semibold'> Don't have an account yet? <Link to='/register' className='text-blue-600 text-xl cursor-pointer'>Register</Link></p>
      </div>


    </div>
  )
}

export default Login