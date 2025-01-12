import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className='bg-cover bg-center bg-[url(https://img.freepik.com/premium-photo/strong-young-sports-woman-standing-with-ball_171337-31948.jpg)] h-screen pt-9 w-full flex justify-between flex-col '>

      <div className="flex justify-between items-center w-full px-6 py-4">
        <h1 className="text-white text-2xl font-bold">FITANALYZER</h1>
        <Link to='/login' className="text-white text-2xl">Skip</Link>
      </div>

      <div className='flex flex-col items-center '>
        <h1 className="text-white text-3xl font-bold mt-6"></h1>

      </div>

      <div className='bg-gradient-to-r from-blue-300 to-red-400 pb-7 py-4 px-4 ' >
        <h2 className='text-3xl font-bold'>DAILY WORKOUT</h2>
        <p className="text-black  text-base font-bold mt-3">
          Workout plans designed to help you achieve your everyday fitness goals
          and plan.
        </p>
        <Link to='/start2' className='flex items-center justify-center w-full bg-black text-white gap-2 py-3 rounded-md mt-5'>Next <span>&#x2794;</span></Link>
      </div>
    </div>
  )
}

export default Start




