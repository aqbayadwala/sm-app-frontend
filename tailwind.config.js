/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/preline/preline.js",
  ],
  theme: {
    extend: {},
    screens: {
      ssm: "376px",
      stm: "390px",
      sum: "430px",
      md: "768px",
      mde: "820px",
    },
  },
  plugins: [
    require("@tailwindcss/container-queries"),
    require("preline/plugin"),
  ],
};
