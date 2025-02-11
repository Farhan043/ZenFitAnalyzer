import React from 'react';
import { UserDataContext } from '../../Context/UserContext';
import { Link } from 'react-router-dom';

const Welcome = () => {
  const { user } = React.useContext(UserDataContext);

  return (
      <div className=" flex items-center justify-center h-screen rounded-lg p-5 glass ">
        <div className="flex flex-col items-center text-center">

          <h1 className="text-3xl text-white font-bold">
            Welcome, {user?.name || 'Guest'}!
          </h1>
          <p className="text-gray-200 mt-4">
            You are all set now, let’s reach  your goals together with us
          </p>

          <Link to='/home' className="mt-48 glass  text-white w-full font-semibold py-6 px-8 text-xl rounded-lg">
            Go To Home
          </Link>

        </div>
      </div>
  );
};

export default Welcome;
