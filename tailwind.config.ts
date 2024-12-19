import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#13652f", // Light blue
          DEFAULT: "#13652f", // Default blue
          dark: "#0369a1", // Dark blue
        },
        secondary: {
          // light: "#d97706", // Light orange
          light: "#e5b26f", // Light orange
          DEFAULT: "#e5b26f", // Default orange
          dark: "#d97706", // Dark orange
        },
        customGray: "#1f2937", // A custom gray color
      },
      backgroundImage: {
        "hero-pattern": "url('/image/bg.png')",
        // 'footer-texture': "url('/img/footer-texture.png')",
      },
      fontFamily: {
        hind: ["var(--font-hind)", "sans-serif"], // Gunakan font "Hind" dari variabel
        poppins: ["var(--font-poppins)", "sans-serif"], // Gunakan font "Poppins" dari variabel
      },
    },
  },
  plugins: [],
} satisfies Config;
