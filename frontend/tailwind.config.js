/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#F8C365',
        'secondary':"#FDEDD1",
        'secondary-black':"#333134",
        'grey':'#DCDCDC',
        'dark-grey':"#6B6B6B"
      },
      fontFamily: {
        'montserrat':['Montserrat', 'sans-serif']
      },
      boxShadow:{
        'norm':  '0px 4px 4px rgba(0, 0, 0, 0.25)'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}