// iot-platform-frontend/postcss.config.js
export default {
  plugins: {
    // CRITICAL FIX: Use the specific package Vite is complaining about
    '@tailwindcss/postcss': {}, 
    autoprefixer: {},
  },
}