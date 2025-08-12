import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        /* ===== COMPREHENSIVE COLOR SELECTOR EXTENSIONS ===== */
        
        /* Primary Color Spectrum Extensions */
        "primary-50": "var(--color-primary-50)",
        "primary-100": "var(--color-primary-100)",
        "primary-200": "var(--color-primary-200)",
        "primary-300": "var(--color-primary-300)",
        "primary-400": "var(--color-primary-400)",
        "primary-500": "var(--color-primary-500)",
        "primary-600": "var(--color-primary-600)",
        "primary-700": "var(--color-primary-700)",
        "primary-800": "var(--color-primary-800)",
        "primary-900": "var(--color-primary-900)",
        
        /* Secondary Color Spectrum Extensions */
        "secondary-50": "var(--color-secondary-50)",
        "secondary-100": "var(--color-secondary-100)",
        "secondary-200": "var(--color-secondary-200)",
        "secondary-300": "var(--color-secondary-300)",
        "secondary-400": "var(--color-secondary-400)",
        "secondary-500": "var(--color-secondary-500)",
        "secondary-600": "var(--color-secondary-600)",
        "secondary-700": "var(--color-secondary-700)",
        "secondary-800": "var(--color-secondary-800)",
        "secondary-900": "var(--color-secondary-900)",
        
        /* Warning Color Spectrum Extensions */
        "warning-50": "var(--color-warning-50)",
        "warning-100": "var(--color-warning-100)",
        "warning-200": "var(--color-warning-200)",
        "warning-300": "var(--color-warning-300)",
        "warning-400": "var(--color-warning-400)",
        "warning-500": "var(--color-warning-500)",
        "warning-600": "var(--color-warning-600)",
        "warning-700": "var(--color-warning-700)",
        "warning-800": "var(--color-warning-800)",
        "warning-900": "var(--color-warning-900)",
        
        /* Error Color Spectrum Extensions */
        "error-50": "var(--color-error-50)",
        "error-100": "var(--color-error-100)",
        "error-200": "var(--color-error-200)",
        "error-300": "var(--color-error-300)",
        "error-400": "var(--color-error-400)",
        "error-500": "var(--color-error-500)",
        "error-600": "var(--color-error-600)",
        "error-700": "var(--color-error-700)",
        "error-800": "var(--color-error-800)",
        "error-900": "var(--color-error-900)",
        
        /* Industrial Status Colors */
        "online": "var(--color-online)",
        "offline": "var(--color-offline)",
        "warning-status": "var(--color-warning-status)",
        "maintenance": "var(--color-maintenance)",
        "inactive": "var(--color-inactive)",
        
        /* Industrial Background Colors */
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-tertiary": "var(--bg-tertiary)",
        "bg-surface": "var(--bg-surface)",
        "bg-overlay": "var(--bg-overlay)",
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
