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
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        darkBlack: "#181818",
        lightBlack: "#383838",
        lightGreen: "#61AD4E",
        darkGreen: "#226710",
        lightWhite: "#F9F9F9",
        darkWhite: "#D6D6D6",
      },
    },
  },
  plugins: [],
}

