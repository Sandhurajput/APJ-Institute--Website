export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f7fa',
          100: '#e4ecf3',
          200: '#c8d9e7',
          300: '#9dbcd5',
          400: '#6c9cbf',
          500: '#4680a9',
          600: '#356796',
          700: '#2b5279',
          800: '#244565',
          900: '#1f3a53',
          950: '#132537',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 45px -20px rgba(15, 23, 42, 0.35)',
      },
      backgroundImage: {
        'medical-grid': 'linear-gradient(rgba(255,255,255,0.94), rgba(255,255,255,0.94)), radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.09) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
}
