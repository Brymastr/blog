module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    container: {
      screens: {
        sm: '100%',
        md: '768px',
        lg: '768px',
      },
    },
    extend: {
      colors: {
        gray: {
          900: '#0f1218',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
