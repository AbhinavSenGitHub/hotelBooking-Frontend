/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'custom': "546px",
        'custom-919': "919px",
        'custom1032': '1032px',
        'custom-1033': {'min': '1033px'},
        'custom-706': '706px',   // For screens 706px and up
        'custom-1010': '1010px', // For screens 1010px and up
        'custom-1314': '1314px', // For screens 1314px and up
        'custom-1427': '1427px', // discrition section
        'smm': '568px',   // Custom breakpoint for 484px
        'mdd': '960px',   // Custom breakpoint for 960px
        'size1': '1235px',   // Custom breakpoint for 960px
      }
    },
  },
  plugins: [],
}

