/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },

    fontFamily: {
      robotoFlex: 'Roboto Flex, sans-serif',
    },
  },
  plugins: [
    nextui({
      layout: {
        radius: {
          small: '2px', // rounded-small
          medium: '4px', // rounded-medium
          large: '6px', // rounded-large
        },
        borderWidth: {
          small: '1px', // border-small
          medium: '1px', // border-medium
          large: '2px', // border-large
        },
      },
      themes: {
        light: {
          colors: {
            foreground: '#141013',
            background: '#ffffff',
            primary: '#c0cec4',
            secondary: '#ebefee',
            accent: '#7f9778',
          },
        },
        dark: {
          colors: {
            foreground: '#efebee',
            background: '#000000',
            primary: '#313f35',
            secondary: '#101413',
            accent: '#708768',
          },
        },
      },
    }),
  ],
};
