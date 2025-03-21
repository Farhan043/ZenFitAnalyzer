import { useNavigate } from "react-router-dom";

const FloatingButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/404")}
      className="fixed bottom-6 left-6 bg-indigo-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-indigo-600 transition-all"
    >
      <span>🤔 Facing an issue?</span>
    </button>
  );
};

export default FloatingButton;
