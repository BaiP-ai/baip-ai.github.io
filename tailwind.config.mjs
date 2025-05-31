/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB', // Vibrant Blue (Adjusted slightly)
        secondary: '#7C3AED', // Purple Accent
        dark: '#050816',    // Very Dark Blue/Black
        light: '#F8FAFC',   // Light Text (White)
        'light-muted': '#A0A0A0' // Muted Gray Text (Re-added)
      },
      fontFamily: {
        // Keep Inter and Lexend for now, adjust if needed after visual review
        sans: ['Inter', 'sans-serif'],
        display: ['Lexend', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
        xl: '24px', // Added for more blur options
      },
      borderRadius: {
        'sharp': '0px', // Example if needed globally
      },
      boxShadow: {
        'glow-primary': '0 0 15px 5px rgba(0, 255, 163, 0.4)', // Adjust color and spread as needed
        'glow-secondary': '0 0 15px 5px rgba(128, 0, 128, 0.4)', // Example for a secondary glow if needed
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
