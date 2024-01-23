const config = {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],

  plugins: [require('flowbite/plugin')],

  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#030917'
        },
        accent: {
          50: '#ECF3FE',
          100: '#C6DAFB',
          200: '#A0C2F8',
          300: '#7AA9F5',
          400: '#3A80F0',
          500: '#1B6CEE',
          600: '#0E52BE',
          700: '#0A3985',
          800: '#06214C',
          900: '#031026'
        },
        ink: {
          light: '#000',
          dark: '#fff',
        }
      }
    }
  }
};

module.exports = config;
