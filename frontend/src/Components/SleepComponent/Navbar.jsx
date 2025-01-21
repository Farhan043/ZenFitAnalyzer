import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center  p-4 bg-white ">
      {/* Back Button */}
      <button className="p-2  rounded-full
      " onClick={() => navigate('/home')}>
        <i className="ri-arrow-left-s-line text-4xl text-gray-700"></i>
      </button>

      {/* Title */}
      <h1 className="text-xl text-center ml-24 font-bold text-gray-800">Sleep Tracker</h1>

      {/* Options Button
      <button className="p-2  rounded-full ">
        <i className="ri-more-2-line text-3xl text-gray-700"></i>
      </button> */}
    </div>
  );
};


export default Navbar