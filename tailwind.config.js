module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      screens: {
        sm: '100%',
        md: '768px',
        lg: '768px',
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
