// import { createContext, useEffect, useState } from "react";

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const themes = [  "red", "green", "blue", "purple", "pink", "orange", "yellow", "cyan", "lime", "teal", "indigo", "violet", "fuchsia", "rose", "slate", "zinc", "neutral", "stone",  "amber", "sky", "emerald", "grass", "forest", "cobalt", "warm", "cool", ]; 
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "purple");

//   useEffect(() => {
//     document.documentElement.classList.remove(...themes);
//     document.documentElement.classList.add(theme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     const currentIndex = themes.indexOf(theme);
//     const nextTheme = themes[(currentIndex + 1) % themes.length]; // Switch to next theme
//     setTheme(nextTheme);
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };