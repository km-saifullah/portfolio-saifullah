/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1180px",
      },
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
        blogsBg: "rgba(47, 58, 69, 0.6)",
        bannerBg: "#ECF6FF",
        navLink: "#181818",
        buttonColor: "#232D39",
        buttonText: "#EEF5FF",
        whatsApp: "#4DC85A",
        serviceBg: "rgba(1, 136, 255, 0.2)",
        footerBg: "#232D39",
        contactBg: "#0189ffcc",
        inputFieldBg: "#2f3a45b3",
      },
      dropShadow: {
        imgShadow: "0 0 1em #0189FF",
      },
    },
  },
  plugins: [],
};
