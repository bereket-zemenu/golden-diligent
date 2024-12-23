/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        smPhone: "100px",
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
