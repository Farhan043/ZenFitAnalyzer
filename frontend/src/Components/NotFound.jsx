import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <img src="/public/404.png" alt="404 Not Found" className="w-1/2" />
      <button
        onClick={() => navigate("/home")}
        className="mt-4 bg-indigo-600 px-6 py-2 rounded-lg text-white hover:bg-indigo-500 transition-all"
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;