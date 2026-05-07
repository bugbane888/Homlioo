/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // <--- ADD THIS LINE
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0F172A",
          amber: "#F59E0B",
          purple: "#7C3AED",
          light: "#F8F7F4",
        },
      },
    },
  },
  plugins: [],
};
