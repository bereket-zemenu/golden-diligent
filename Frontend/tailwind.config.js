/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "bottom-only": "0 4px 6px rgba(0, 0, 0, 0.1)", // Adjust values as needed
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      backgroundImage: {
        "footer-image": "url('./assets/images/ethio.png')",
      },
      screens: {
        phone: "320px",
        // => @media (min-width: 640px) { ... }
        mdphone: "400px",
        ptab: "500px",
        mtab: "650px",
        tablet: "768px",
        // => @media (min-width: 768px) { ... }
        btablet: "850px",

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1200px",
        // => @media (min-width: 1280px) { ... }

        bigdesktop: "1400px",
      },
    },
    plugins: [],
  },
};
