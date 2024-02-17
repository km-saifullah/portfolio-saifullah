/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        container: "1320px",
      },
      fontFamily: {
        roboto: '"Roboto", sans-serif',
        openSans: '"Open Sans", sans-serif',
      },
      colors: {
        primary: "#0189FF",
        heading: "#2F3A45",
        textColor: "rgba(47, 58, 69, 0.8)",
        bannerBg: "#ECF6FF",
        navLink: "#181818",
      },
    },
  },
  plugins: [],
};
