import { useNavigate } from "react-router-dom";

const Footer = () => {

  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 h-24 py-7  w-full   ">
      <div className="flex justify-around items-center ">
        {/* Home Icon */}
        <button onClick={() => {
          navigate('/');
        }
        } className="flex flex-col items-center text-gray-200">
          <i className="ri-home-3-line text-4xl"></i>
        </button>

        {/* Stats Icon */}
        <button className="flex flex-col items-center text-gray-200"
          onClick={() => { navigate('/meal'); }}
        >
          <i className="ri-cake-2-line text-4xl"></i>
        </button>

        {/* Search Button */}
        <button className="flex justify-center items-center h-16 w-16 glass text-gray-200 rounded-full"
        onClick={() => {
          navigate('/workout');
        }}>
          <i className="ri-run-fill text-4xl"></i>
        </button>

        {/* Camera Icon */}
        <button className="flex flex-col items-center text-gray-200"
          onClick={() => {
            navigate('/camera');
          }}
        >
          <i className="ri-camera-ai-fill text-4xl"></i>
        </button>

        {/* Profile Icon */}
        <button to='/profile' className="flex flex-col items-center text-gray-200"
          onClick={() => {
            navigate('/profile');
          }}
        >
          <i className="ri-user-line text-4xl"></i>
        </button>
      </div>
    </div>
  );
};

export default Footer;
