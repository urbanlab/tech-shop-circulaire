/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    customTheme: {
      colors: {
        "primary": "#0E8388", 
        "secondary": "#CBE4DE",
        "accent": "#2C3333",
        "neutral": "#2E4F4F",
        "base-100": "#FFFFFF",
        "info": "#0284c7",
        "success": "#18A600",
        "warning": "#FF6B00",
        "error": "#dc2626",
      },
    },
  },
  plugins: [require("daisyui")],
}

