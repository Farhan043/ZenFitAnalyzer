import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserDataContext } from '../../Context/UserContext';

const Bmi = () => {
  const [bmiData, setBmiData] = useState(null);
  const [weight, setWeight] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [error, setError] = useState('');
  const [showResult, setShowResult] = useState(false);
  const { user } = useContext(UserDataContext);

  const fetchBMI = async () => {
    try {
      setError('');
      if (!weight || !heightFeet || heightFeet <= 0 || heightInches < 0) {
        setError('Invalid weight or height data');
        return;
      }

      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/bmi`,
        { weight, feet: heightFeet, inches: heightInches },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBmiData(response.data);
      setShowResult(true);
      setWeight('');
      setHeightFeet('');
      setHeightInches('');
    } catch (error) {
      console.error('Error fetching BMI data:', error);
      setError('Invalid weight or height data');
    }
  };

  const handleWeightChange = (e) => {
    let value = Number(e.target.value);
    if (value < 1) value = "";
    setWeight(value);
  };

  const handleHeightFeetChange = (e) => {
    let value = Number(e.target.value);
    if (value < 1) value = "";
    setHeightFeet(value);
  };

  const handleHeightInchesChange = (e) => {
    let value = Number(e.target.value);
    if (value < 1) value = "";
    setHeightInches(value);
  };

  // Function to determine BMI category color
  const getBmiCategoryColor = () => {
    if (!bmiData?.bmi) return 'bg-gray-500';
    
    const bmi = bmiData.bmi;
    if (bmi < 18.5) return 'bg-blue-500'; // Underweight
    if (bmi < 25) return 'bg-green-500';  // Normal
    if (bmi < 30) return 'bg-yellow-500'; // Overweight
    return 'bg-red-500';                  // Obese
  };

  return (
    <div className="w-full mt-8 mx-auto px-2 max-w-full">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 md:p-8 rounded-xl shadow-2xl border border-red-500/30">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            BMI <span className="text-red-500">Calculator</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base mt-2">Track your body mass index easily</p>
        </div>

        {/* Logo Badge */}
        <div className="flex justify-center mb-6">
          <div className="px-4 py-2 rounded-full bg-gradient-to-r from-red-900/40 to-red-600/40 border border-red-500/50 inline-flex items-center gap-2">
            <img src="/public/logo.gif" alt="ZenFitAnalyZer" className="w-6 h-6" />
            <span className="text-white font-semibold text-sm">ZenFitAnalyZer <span className="text-red-500">RED</span></span>
          </div>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-center text-red-400">
            {error}
          </div>
        )}

        {!showResult ? (
          <div className="space-y-4">
            <div className="relative">
              <input
                type="number"
                placeholder="Weight (kg)"
                value={weight}
                onChange={handleWeightChange}
                className="w-full px-4 py-3 pl-10 rounded-lg text-white bg-slate-800/80 border border-slate-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
              </svg>
            </div>
            
            <div className="flex space-x-3">
              <div className="relative w-1/2">
                <input
                  type="number"
                  placeholder="Height (ft)"
                  value={heightFeet}
                  onChange={handleHeightFeetChange}
                  className="w-full px-4 py-3 pl-10 rounded-lg text-white bg-slate-800/80 border border-slate-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="relative w-1/2">
                <input
                  type="number"
                  placeholder="Height (in)"
                  value={heightInches}
                  onChange={handleHeightInchesChange}
                  className="w-full px-4 py-3 pl-10 rounded-lg text-white bg-slate-800/80 border border-slate-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <button
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-red-700 to-red-500 text-white font-semibold hover:from-red-600 hover:to-red-400 transition-all duration-300 shadow-lg shadow-red-600/30 mt-6"
              onClick={fetchBMI}
            >
              Calculate BMI
            </button>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className={`w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center ${getBmiCategoryColor()} bg-opacity-20 border-4 border-red-500 transition-all duration-500`}>
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center bg-slate-900/80 shadow-inner">
                    <span className="text-3xl md:text-4xl text-white font-bold">{parseFloat(bmiData?.bmi).toFixed(1)}</span>
                  </div>
                </div>
                
                {/* Animated ring */}
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(#ef4444 ${(bmiData?.bmi / 40) * 360}deg, transparent 0deg)`,
                    animation: 'pulse 2s infinite'
                  }}
                ></div>
              </div>
            </div>
            
            <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white">Status</h3>
              <p className={`text-xl font-bold ${
                bmiData?.status.includes('Underweight') ? 'text-blue-400' : 
                bmiData?.status.includes('Normal') ? 'text-green-400' :
                bmiData?.status.includes('Overweight') ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {bmiData?.status}
              </p>
            </div>
            
            <button
              className="px-6 py-3 rounded-lg border-2 border-red-500 text-red-400 font-semibold hover:bg-red-500 hover:text-white transition-all duration-300"
              onClick={() => setShowResult(false)}
            >
              Recalculate BMI
            </button>
          </div>
        )}
        
        {/* Health tips section */}
        <div className="mt-6 pt-6 border-t border-slate-700/50 text-gray-400 text-sm">
          <p className="font-medium text-center">
            BMI is just one metric. For a complete health assessment, consult with a healthcare professional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bmi;
