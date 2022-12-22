const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    // "./**/*.{js,ts,jsx,tsx}",
    // Add more here
  ],
  theme: {
    extend: {
      fontFamily: {
        sf: ["SF Pro Display", "SF Pro Text"],
        sfb: ["SF Pro Display Bold"],
      },
      boxShadow: {
        bottom:
          "0 5px 6px -7px rgba(0, 0, 0, 0.6), 0 2px 4px -5px rgba(0, 0, 0, 0.06)",
      },
    },
    colors: {
      primary: "#000000",
      secondary: "#4CD964",
      success: "#4CD964",
      redletter: "#c01a22",
      danger: "#FF2D55",
      black: colors.black,
      red: colors.red,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      blue: colors.blue,
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: colors.green,
    },
  },
};
