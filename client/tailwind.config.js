/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: 'class', // Enables class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: '#008080', // Teal for both themes
        light: {
          background: '#f8f9fa',
          foreground: '#2d2d2d',
          card: '#ffffff',
          border: '#e0e0e0',
        },
        dark: {
          background: '#121212',
          foreground: '#e0e0e0',
          card: '#1e1e1e',
          border: '#333333',
        },
      },
    },
  },
  plugins: [],
}

