import { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
// import { getStackGroupsByAxisId } from "recharts/types/util/ChartUtils";

const themeIcons = {
  light: <MoonIcon className="w-6 h-6 text-blue-400" />,
  dark: <SunIcon className="w-6 h-6 text-yellow-500" />,
  red: <SunIcon className="w-6 h-6 text-red-500" />,
  green: <SunIcon className="w-6 h-6 text-green-500" />,
  blue: <SunIcon className="w-6 h-6 text-blue-500" />,
  purple: <SunIcon className="w-6 h-6 text-purple-500" />,
  orange: <SunIcon className="w-6 h-6 text-orange-500" />,
  yellow: <SunIcon className="w-6 h-6 text-yellow-500" />,
  pink: <SunIcon className="w-6 h-6 text-pink-500" />,
  cyan: <SunIcon className="w-6 h-6 text-cyan-500" />,
  lime: <SunIcon className="w-6 h-6 text-lime-500" />,
  teal: <SunIcon className="w-6 h-6 text-teal-500" />,
  indigo: <SunIcon className="w-6 h-6 text-indigo-500" />,
  violet: <SunIcon className="w-6 h-6 text-violet-500" />,
  fuchsia: <SunIcon className="w-6 h-6 text-fuchsia-500" />,
  rose: <SunIcon className="w-6 h-6 text-rose-500" />,
  slate: <SunIcon className="w-6 h-6 text-slate-500" />,
  zinc: <SunIcon className="w-6 h-6 text-zinc-500" />,
  neutral: <SunIcon className="w-6 h-6 text-neutral-500" />,
  stone: <SunIcon className="w-6 h-6 text-stone-500" />,
  amber: <SunIcon className="w-6 h-6 text-amber-500" />,
  sky: <SunIcon className="w-6 h-6 text-sky-500" />,
  emerald: <SunIcon className="w-6 h-6 text-emerald-500" />,
  grass: <SunIcon className="w-6 h-6 text-grass-500" />,
  forest: <SunIcon className="w-6 h-6 text-forest-500" />,
  cobalt: <SunIcon className="w-6 h-6 text-cobalt-500" />,
  warm: <SunIcon className="w-6 h-6 text-warm-500" />,
  cool: <SunIcon className="w-6 h-6 text-cool-500" />,
};

const themeNames = {
  light: "Light Mode",
  dark: "Dark Mode",
  red: "Red Mode",
  green: "Green Mode",
  blue: "Blue Mode",
  purple: "Purple Mode",
  orange: "Orange Mode",
  yellow: "Yellow Mode",
  pink: "Pink Mode",
  cyan: "Cyan Mode",
  lime: "Lime Mode",
  teal: "Teal Mode",
  indigo: "Indigo Mode",
  violet: "Violet Mode",
  fuchsia: "Fuchsia Mode",
  rose: "Rose Mode",
  slate: "Slate Mode",
  zinc: "Zinc Mode",
  neutral: "Neutral Mode",
  stone: "Stone Mode",
  amber: "Amber Mode",
  sky: "Sky Mode",
  emerald: "Emerald Mode",
  grass: "Grass Mode",
  forest: "Forest Mode",
  cobalt: "Cobalt Mode",
  warm: "Warm Mode",
  cool: "Cool Mode",
};

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    
      
      <div className="flex items-center space-x-2">
        <button
          onClick={toggleTheme}
          className="p-3 rounded-lg bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 transition duration-300"
        >
          {themeIcons[theme]} {/* Dynamic icon */}
        </button>
        
        <span className="text-lg font-semibold text-gray-900 dark:text-white">
          {themeNames[theme]} {/* Display current theme name */}
        </span>
      </div>
  );
};

export default Settings;
