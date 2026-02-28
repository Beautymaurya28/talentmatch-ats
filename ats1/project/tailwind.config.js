/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#f0f4ff',
          100: '#dbe4ff',
          200: '#bfd1ff',
          300: '#93b4ff',
          400: '#608cff',
          500: '#3b6eff',
          600: '#1e40af',
          700: '#1e3a8a',
          800: '#1e3566',
          900: '#1e2f4d',
        },
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'bounce-slow': 'bounce 3s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
};