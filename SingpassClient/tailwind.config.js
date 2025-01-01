/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      minHeight: {
        '3.6': '3.6rem'
      },
      backgroundImage: {
        "primary-background": "url('../src/assets/wallpaper.jpg')",
        "second-background": "url('../src/assets/background.png') !important",
        "primary-gradient": `linear-gradient(
          86.88deg,
          #7d6aff 1.38%,
          #ffb86c 64.35%,
          #fc2872 119.91%
        )`
      },
      boxShadow: {
        "custom": "0 3px 6px rgba(0,0,0,.16);",
      },
    },
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [require("tailwindcss-animated")],
};
