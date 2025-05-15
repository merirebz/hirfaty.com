/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  mode: "jit",
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      screens: {
        "1300px": "1300px",
        "1100px": "1110px",
        "1000px": "1050px",
        "800px": "800px",
        "400px": "400px",
      },
      colors: {
        main: "#F1634C",
        secondery: "#191C1F",
        primary: {
          50: "#FEF4F2",
          100: "#FEE6E2",
          200: "#FED1CA",
          300: "#FDB0A4",
          400: "#F98370",
          500: "#F1634C",
          600: "#E8533a",
        },
      },
      fontSize: {
        14: "14px",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
