/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
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
      fontSize: {
        xs: ["12px", { lineHeight: "1.4" }],
        sm: ["14px", { lineHeight: "1.5" }],
        base: ["16px", { lineHeight: "1.6" }],
        lg: ["18px", { lineHeight: "1.6" }],
        xl: ["20px", { lineHeight: "1.7" }],
        "2xl": ["24px", { lineHeight: "1.7" }],
        "3xl": ["30px", { lineHeight: "1.8" }],
        "4xl": ["36px", { lineHeight: "1.8" }],
        "5xl": ["48px", { lineHeight: "1.8" }],
        "6xl": ["60px", { lineHeight: "1.8" }],
        "7xl": ["72px", { lineHeight: "1.2" }],
      },
    },
  },
  plugins: [],
};
