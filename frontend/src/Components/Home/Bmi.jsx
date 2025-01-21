import { useEffect, useState } from 'react';
import axios from 'axios';

const Bmi = () => {
  const [bmiData, setBmiData] = useState({ bmi: null, status: '' });

  useEffect(() => {
    const fetchBMI = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/bmi`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBmiData(response.data); // this line means that the response data will be stored in the bmiData state
      } catch (error) {
        console.error('Error fetching BMI data:', error);
      }
    };

    fetchBMI();
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-lg shadow-md max-w-sm">
      <h2 className="text-xl font-bold">BMI (Body Mass Index)</h2>
      {bmiData.bmi ? (
        <>
          <p className="mt-2 text-xl">You have a {bmiData.status}</p>
          <div className="flex items-center justify-between mt-4">
            <div
              className="w-24 h-24 rounded-full bg-white flex items-center justify-center"
              style={{
                background: `conic-gradient(#93c5fd ${(bmiData.bmi / 40) * 360
                  }deg, #93c5fd 0deg)`,
              }}
            >
              <span className="text-2xl text-white font-bold">
                {bmiData.bmi}
              </span>
            </div>
            <button className="bg-gradient-to-t from-blue-300 to-blue-600 px-6 py-5 rounded-lg text-sm font-semibold">
              View More
            </button>
          </div>
        </>
      ) : (
        // <p className="mt-2">Loading...</p>
        <div className='flex justify-center items-center h-screen bg-black'>
          <div className='w-16 h-16  border-4 border-green-500 border-solid border-t-transparent rounded-full animate-spin'></div>
        </div>
      )}
    </div>
  );
};

export default Bmi;
