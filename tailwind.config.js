module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        bitcoin: '#F7931A',
        dark: {
          800: '#0F172A',
          900: '#0A1E3D'
        }
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}