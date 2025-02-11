import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between mt-5 px-3  ">
      {/* Back Button */}
      <button className="  rounded-full
      " onClick={() => navigate('/alarm')}>
        <i className="ri-arrow-left-s-line text-4xl  text-gray-300"></i>
      </button>

      {/* Title */}
      <h1 className="text-xl text-center font-bold text-gray-300">Sleep Tracker</h1>
      <Link to="/alarm"><i className="ri-arrow-right-s-line text-4xl  text-gray-200"></i> </Link> 
    </div>
  );
};


export default Navbar