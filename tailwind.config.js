/** @type {import('tailwindcss').Config} */
export default {
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      screens:{
        'xs':'360px'
      },
      borderWidth: {
        '1': '1px',
      },
      borderStyle: {
        'small-dashed': 'dashed',
      },
      keyframes: {
        borderPulse: {
          '50%': { borderColor: '#808080' },   // Grey
          '0%, 100%': { borderColor: '#000' }, // Black
          '75%': { borderColor: '#fff' },      // White
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        }
      },
      animation: {
        borderPulse: 'borderPulse 2s infinite',
        scroll:
        "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite"
      },
    },
  },
  plugins: [],
}

