// import { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { UserDataContext } from '../../Context/UserContext';
// import { useTranslation } from 'react-i18next';
// import LanguageModal from '../../Pages/Translater/LanguageModal';
// import { translateText } from '../../Pages/Translater/118n';

// const Bmi = () => {
//   const [bmiData, setBmiData] = useState(null);
//   const [weight, setWeight] = useState('');
//   const [heightFeet, setHeightFeet] = useState('');
//   const [heightInches, setHeightInches] = useState('');
//   const [error, setError] = useState('');
//   const [showResult, setShowResult] = useState(false);
//   const { user } = useContext(UserDataContext);
//   const { t, i18n } = useTranslation();
//   const [translatedTitles, setTranslatedTitles] = useState({});



//    useEffect(() => {
//       const updateTranslations = async () => {
//         const translations = {
//           bmiCalculator: await translateText('Bmi Calculator', i18n.language),
//           calculateBmi: await translateText('Calculate BMI', i18n.language),
//           recalculatebmi: await translateText('Recalculate BMI', i18n.language),

//         };
//         setTranslatedTitles(translations);
//       };
  
//       updateTranslations();
//     }, [i18n.language]);


//   const fetchBMI = async () => {
//     try {
//       setError('');
//       if (!weight || !heightFeet || heightFeet <= 0 || heightInches < 0) {
//         setError('Invalid weight or height data');
//         return;
//       }

//       const token = localStorage.getItem('token');
//       const response = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/users/bmi`,
//         { weight, feet: heightFeet, inches: heightInches },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setBmiData(response.data);
//       setShowResult(true);
//       setWeight('');
//       setHeightFeet('');
//       setHeightInches('');
//     } catch (error) {
//       console.error('Error fetching BMI data:', error);
//       setError('Invalid weight or height data');
//     }
//   };


//   const handleWeightChange = (e) => {
//     let value = Number(e.target.value);
//     if (value < 1) value = ""; // Prevent negative or zero values
//     setWeight(value);
//   };
  
//   const handleHeightFeetChange = (e) => {
//     let value = Number(e.target.value);
//     if (value < 1) value = ""; // Prevent negative or zero values
//     setHeightFeet(value);
//   };


//   const handleHeightInchesChange = (e) => {
//     let value = Number(e.target.value);
//     if (value < 1) value = ""; // Prevent negative or zero values
//     setHeightInches(value);
//   };

//   return (
//     <div className="bg-black bg-opacity-50 text-blue-400 px-6 py-4 rounded-lg  mt-10 shadow-lg">
//       <h2 className="text-2xl font-bold text-center">{ translatedTitles.bmiCalculator}</h2>
//       {error && <p className="text-red-500 text-center mt-2">{error}</p>}
//       {!showResult ? (
//         <div className="mt-6 space-y-4">
//           <input
//             type="number"
//             placeholder="Weight (kg)"
//             value={weight}
//             onChange={handleWeightChange}
//             className="glass w-full px-4 py-2 rounded-lg text-black border border-blue-300 placeholder:text-gray-100"
//           />
//           <div className="flex space-x-2">
//             <input
//               type="number"
//               placeholder="Height (ft)"
//               value={heightFeet}
//               onChange={handleHeightFeetChange}
//               className="glass w-1/2 px-4 py-2 rounded-lg text-black border border-blue-300 placeholder:text-gray-100"
//             />
//             <input
//               type="number"
//               placeholder="Height (in)"
//               value={heightInches}
//               onChange={handleHeightInchesChange}
//               className="glass w-1/2 px-4 py-2 rounded-lg text-black border border-blue-300 placeholder:text-gray-100"
//             />
//           </div>
//           <button
//             className="glass w-full px-6 py-2 rounded-lg text-blue-400 font-semibold "
//             onClick={fetchBMI}
//           >
//             {translatedTitles.calculateBmi}
//           </button>
//         </div>
//       ) : (
//         <div className="mt-6 text-center">
//           <p className="text-lg font-bold text-blue-500">{bmiData?.status}</p>
//           <div className="flex justify-center mt-4">
//             <div
//               className="w-24 h-24 rounded-full glass flex items-center justify-center border-4 border-blue-300"
//               style={{
//                 background: `conic-gradient(${(bmiData?.bmi / 40) * 360}deg, #93c5fd 0deg)`,
//               }}
//             >
//               <span className="text-2xl text-black font-bold">{bmiData?.bmi}</span>
//             </div>
//           </div>
//           <button
//             className="mt-4 px-6 py-2 rounded-lg text-blue-400 border-2 border-blue-400 font-semibold "
//             onClick={() => setShowResult(false)}
//           >
//             {translatedTitles.recalculatebmi}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Bmi;



















// import { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { UserDataContext } from '../../Context/UserContext';

// const Bmi = () => {
//   const [bmiData, setBmiData] = useState(null);
//   const [weight, setWeight] = useState('');
//   const [heightFeet, setHeightFeet] = useState('');
//   const [heightInches, setHeightInches] = useState('');
//   const [error, setError] = useState('');
//   const [showResult, setShowResult] = useState(false);
//   const { user } = useContext(UserDataContext);

//   const fetchBMI = async () => {
//     try {
//       setError('');
//       if (!weight || !heightFeet || heightFeet <= 0 || heightInches < 0) {
//         setError('Invalid weight or height data');
//         return;
//       }

//       const token = localStorage.getItem('token');
//       const response = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/users/bmi`,
//         { weight, feet: heightFeet, inches: heightInches },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setBmiData(response.data);
//       setShowResult(true);
//       setWeight('');
//       setHeightFeet('');
//       setHeightInches('');
//     } catch (error) {
//       console.error('Error fetching BMI data:', error);
//       setError('Invalid weight or height data');
//     }
//   };

//   const handleWeightChange = (e) => {
//     let value = Number(e.target.value);
//     if (value < 1) value = "";
//     setWeight(value);
//   };

//   const handleHeightFeetChange = (e) => {
//     let value = Number(e.target.value);
//     if (value < 1) value = "";
//     setHeightFeet(value);
//   };

//   const handleHeightInchesChange = (e) => {
//     let value = Number(e.target.value);
//     if (value < 1) value = "";
//     setHeightInches(value);
//   };

//   return (
//     <div className="bg-gray-900 bg-opacity-50 text-white px-6 py-6 rounded-lg mt-10 shadow-xl max-w-lg mx-auto transition-all duration-500">
//       <h2 className="text-3xl font-bold text-center mb-4">BMI Calculator</h2>
//       {error && <p className="text-red-500 text-center mt-2">{error}</p>}
//       {!showResult ? (
//         <div className="space-y-4">
//           <input
//             type="number"
//             placeholder="Weight (kg)"
//             value={weight}
//             onChange={handleWeightChange}
//             className="w-full px-4 py-3 rounded-lg text-white border border-blue-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
//           />
//           <div className="flex space-x-2">
//             <input
//               type="number"
//               placeholder="Height (ft)"
//               value={heightFeet}
//               onChange={handleHeightFeetChange}
//               className="w-1/2 px-4 py-3 rounded-lg text-white border border-blue-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
//             />
//             <input
//               type="number"
//               placeholder="Height (in)"
//               value={heightInches}
//               onChange={handleHeightInchesChange}
//               className="w-1/2 px-4 py-3 rounded-lg text-white border border-blue-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
//             />
//           </div>
//           <button
//             className="w-full px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-300"
//             onClick={fetchBMI}
//           >
//             Calculate BMI
//           </button>
//         </div>
//       ) : (
//         <div className="text-center">
//           <p className="text-lg font-bold text-blue-400">{bmiData?.status}</p>
//           <div className="flex justify-center mt-4">
//             <div
//               className="w-24 h-24 rounded-full flex items-center justify-center border-4 border-blue-400 transition-all duration-500"
//               style={{
//                 background: `conic-gradient(${(bmiData?.bmi / 40) * 360}deg, #3b82f6 0deg)`,
//               }}
//             >
//               <span className="text-2xl text-white font-bold">{bmiData?.bmi}</span>
//             </div>
//           </div>
//           <button
//             className="mt-4 px-6 py-3 rounded-lg border-2 border-blue-400 text-blue-400 font-semibold hover:bg-blue-400 hover:text-white transition-all duration-300"
//             onClick={() => setShowResult(false)}
//           >
//             Recalculate BMI
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Bmi;














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

  return (
    <>
    <div className=" bg-slate-950  text-white p-8 rounded-lg mt-8 shadow-2xl w-full md:w-5/5 transition-all duration-500 border border-red-600 ">
      <h2 className="text-4xl font-extrabold text-white text-center mb-2">
        BMI <span className="text-red-600">Calculator</span>
      </h2>
      <p className="text-gray-400 text-center mb-6">Calculate your Body Mass Index (BMI) easily.</p>

       {/* CodeHelp RED Section */}
       <div className='flex justify-center'>
       <div className=" p-6 mb-5 w-64  shadow-red-500 shadow-inner rounded-lg text-center  border border-red-500">
        <img src="/public/logo.gif" alt="ZenFitAnalyZer RED" className="mx-auto mb-4" />
        <h3 className="text-xl font-bold text-red-500"> <span className='text-white text-base'>ZenFitAnalyZer</span> RED</h3>
      </div>
      </div>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      {!showResult ? (
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-3 rounded-lg text-white bg-gray-800 border  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
          />
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Height (ft)"
              value={heightFeet}
              onChange={(e) => setHeightFeet(e.target.value)}
              className="w-1/2 px-4 py-3 rounded-lg text-white bg-gray-800 border  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            />
            <input
              type="number"
              placeholder="Height (in)"
              value={heightInches}
              onChange={(e) => setHeightInches(e.target.value)}
              className="w-1/2 px-4 py-3 rounded-lg text-white bg-gray-800 border  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            />
          </div>
          <button
            className="w-full px-6 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-all duration-300"
            onClick={fetchBMI}
          >
            Calculate BMI
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg font-bold text-red-500">{bmiData?.status}</p>
          <div className="flex justify-center mt-4">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center border-4 border-red-500 transition-all duration-500"
              style={{
                background: `conic-gradient(${(bmiData?.bmi / 40) * 360}deg, #ef4444 0deg)`,
              }}
            >
              <span className="text-2xl text-white font-bold">{bmiData?.bmi}</span>
            </div>
          </div>
          <button
            className="mt-4 px-6 py-3 rounded-lg border-2 border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition-all duration-300"
            onClick={() => setShowResult(false)}
          >
            Recalculate BMI
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default Bmi;
