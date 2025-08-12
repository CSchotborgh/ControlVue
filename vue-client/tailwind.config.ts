import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // EDGERACK Industrial color palette
        edgerack: {
          dark: "hsl(245, 55%, 4%)",
          darker: "hsl(245, 55%, 4%)",
          blue: "hsl(245, 55%, 4%)",
          green: "hsl(142, 76%, 36%)",
          slate: "hsl(215, 20%, 65%)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
} satisfies Config;
