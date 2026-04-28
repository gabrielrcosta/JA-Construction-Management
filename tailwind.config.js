/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        amber: {
          DEFAULT: "#f59e0b",
          dim: "#d97706",
        },
        surface: "#1a1c1f",
        dark: "#0f1012",
      },
    },
  },
  plugins: [],
};
