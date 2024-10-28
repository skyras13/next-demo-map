import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Merriweather', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: '#006400', // Dark Green
        text: '#F5F5F5', // Off-White
        background: '#F0F0F0', // Light Gray
        accent: '#FFD700', // Gold
        secondaryAccent: '#4682B4', // Muted Blue
      },
      backgroundImage: {
        'hero-pattern': "url('/stockFarmer1.jpg')", // Retain the background image
      },
    },
  },
  plugins: [
    require('daisyui'), // Add DaisyUI as a plugin
  ],
}

export default config
