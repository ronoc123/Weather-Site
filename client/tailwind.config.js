/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#59516E",
        "mid-purple": "#7A748B",
        "light-purple": "#E5DEE2",
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      gridTemplateColumns: {
        main: "2fr 1fr",
      },
      width: {
        90: "90%",
      },
      height: {
        80: "80%",
      },
      minWidth: {
        10: "10rem",
      },
      spacing: {
        17: "4.25rem",
      },
    },
  },
  plugins: [],
};
