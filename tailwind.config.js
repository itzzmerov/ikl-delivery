/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: ["Montserrat", "serif"],
        OpenSans: ["Open Sans", "serif"],
      },
      backgroundImage: {
        'peraPadala': "url('/src/images/pera-padala.jpg')",
        'foodDelivery': "url('/src/images/food-delivery.jpg')",
        'hatidSundo': "url('/src/images/hatid-sundo.jpg')",
      }
    },
  },
  plugins: [],
}

