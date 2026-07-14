export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f8f8f8',
          100: '#f0f0f0',
          200: '#e4e4e4',
          300: '#d0d0d0',
          400: '#a8a8a8',
          500: '#777777',
          600: '#4d4d4d',
          700: '#333333',
          800: '#222222',
          900: '#111111',
          950: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -18px rgba(17, 17, 17, 0.22)',
      },
      backgroundImage: {
        'medical-grid': 'linear-gradient(rgba(255,255,255,0.96), rgba(255,255,255,0.96)), radial-gradient(circle at 1px 1px, rgba(17,17,17,0.06) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
}
