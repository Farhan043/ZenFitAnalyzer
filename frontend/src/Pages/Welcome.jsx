import React from 'react';
import { UserDataContext } from '../Context/UserContext';
import { Link } from 'react-router-dom';

const Welcome = () => {
  const { user } = React.useContext(UserDataContext);

  return (
    <div className="flex pt-8   h-screen ">
      <div className=" rounded-lg  p-8 w-96">
        <div className="flex flex-col items-center h-full text-center">
          <div className="w-96  h-96 mb-3">
            {/* Placeholder for Illustration */}
            <img
              src="https://th.bing.com/th/id/OIP.FKoMTnky6E2ny2biIMByLQHaHa?w=197&h=197&c=7&r=0&o=5&pid=1.7"
              alt="Illustration"
              className="w-full h-full object-contain"
            />
          </div>

          <h1 className="text-3xl  font-bold">
            Welcome, {user?.name || 'Guest'}!
          </h1>
          <p className="text-gray-600 mt-4">
            You are all set now, let’s reach  your goals together with us
          </p>

          <Link to='/home' className="mt-48 bg-gradient-to-r from-blue-300 to-blue-500  text-white w-full font-semibold py-6 px-8 text-xl ml-3 rounded-lg">
            Go To Home
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Welcome;
