

import React from 'react'
import { useNavigate } from 'react-router-dom'

const Music = () => {
  const navigate = useNavigate();
  return (
    <>
   <div className=' mockup-phone border-primary mt-5'>
         <div className="flex flex-col items-center justify-center w-full  md:w-5/5  p-6   mt-3 mb-3  rounded-md shadow-lg text-white">
        <div className='p-10 rounded-lg  flex items-center justify-center flex-col'>
          {/* <h1 className=' '><i className="ri-spotify-fill text-5xl text-green-600 "></i></h1> */}
          <img src="/public/spotify.gif" alt="" className='w-36 h-32' />
          <p className='text-2xl font-bold mb-12 text-gray-100'>Discover  And  Enjoy <br /> <span className='text-green-600 font-bold'>Your  Favorite Tunes</span> </p>
          
          <button 
            className='text-xl text-white rounded-lg bg-slate-900 mt-28  px-6 py-3' 
            onClick={() => navigate('/musichome')}
          >
            Go to Music Home
          </button>
        </div>

  <div className="mockup-phone-camera"></div>
  {/* <div className="mockup-phone-display">
    <img alt="wallpaper" src="https://www.iclarified.com/images/news/94911/453966/453966.jpg" />
  </div> */}
</div>
        
      </div>
    </>
  )
}

export default Music













