/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    // add this lines
    './pages/**/*.{js,ts,jsx,tsx}',
    // if you have other folder, add its path too, like this:
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
