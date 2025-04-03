/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enables dark mode toggling
  theme: {
    extend: {
      animation: {
        'fadeIn': 'fadeIn 0.8s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [
    require('daisyui'),
    function({ addBase, addUtilities }) {
      addBase({
        'html, body': { 
          margin: '0',
          padding: '0',
          height: '100%',
          width: '100%',
          maxWidth: '100%'
        },
        'body': {
          overflowY: 'auto',
          overflowX: 'hidden',
          position: 'relative'
        },
        '#root': {
          minHeight: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }
      });
      
      // Add custom utilities for scrolling
      addUtilities({
        '.scrollable': {
          'overflow-y': 'auto',
          '-webkit-overflow-scrolling': 'touch'
        },
        '.no-scrollbar': {
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      });
    }
  ],
}