/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        arkyn: {
          50: '#f7fbfa',
          100: '#edf7f5',
          500: '#0F766E',
          700: '#063B36'
        }
      },
      boxShadow: {
        soft: "0 6px 20px rgba(14,14,35,0.06)"
      },
      borderRadius: {
        xl2: "14px"
      }
    }
  },
  plugins: []
}
