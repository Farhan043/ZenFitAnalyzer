import React from 'react';
import { Link } from 'react-router-dom';

const Goal = () => {

  const playVideoWithSound = () => {
    const videoElement = document.getElementById('goalVideo');
    if (videoElement) {
      videoElement.muted = true;
      videoElement.play();
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      <div className="w-96 p-6">
        <h1 className="text-2xl mt-4  font-bold text-center mb-2">What is your goal?</h1>
        <p className="text-center mt-4 text-xl text-gray-500 mb-6">
          It will help us to choose  the <br /> best program for you
        </p>

        <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg mt-5 p-4 mb-6"
          onClick={playVideoWithSound}
        >
          <div className="flex flex-col items-center">
            {/* Replace image with video */}
            <div className="w-full mb-4">
              <video
                id="goalVideo"
                className="w-full h-96 rounded-lg"
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                controls
              ></video>
            </div>

            <h2 className="text-white font-bold underline mt-3 text-lg mb-2">Improve Shape</h2>
            <p className="text-center text-white mt-8  text-base">
              I have a low amount of body fat and need/want to build more muscle
            </p>
          </div>
        </div>

        <div className='bg-gradient-to-r from-blue-400 to-purple-500 text-white text-center text-xl font-semibold rounded-lg mt-12 p-4 mb-6'>
          <Link to='/Goal2' >
            Confirm
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Goal;
