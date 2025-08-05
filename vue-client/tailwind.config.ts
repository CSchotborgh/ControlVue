import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // EDGERACK Industrial color palette
        edgerack: {
          dark: 'hsl(215, 28%, 17%)',
          darker: 'hsl(215, 25%, 12%)',
          blue: 'hsl(217, 91%, 60%)',
          green: 'hsl(142, 76%, 36%)',
          slate: 'hsl(215, 20%, 65%)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
} satisfies Config