/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class", // Enables class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: "#008080", // Teal for both themes
        light: {
          background: "#f8f9fa",
          foreground: "#2d2d2d",
          secondary: "#757575",
          card: "#ffffff",
          border: "#e0e0e0",
        },
        dark: {
          background: "#121212",
          foreground: "#e0e0e0",
          secondary: "#757575",
          card: "#1e1e1e",
          border: "#333333",
          active: "#00b3b3",
        },
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        emoji: [
          "Noto Color Emoji",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [require("daisyui")],
};
