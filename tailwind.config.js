/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#FBF7EE',
        surface: '#FFFFFF',
        'surface-muted': '#F3ECDA',
        primary: {
          DEFAULT: '#E8A93A',
          dark: '#C9861F',
          light: '#F6C453',
        },
        secondary: {
          DEFAULT: '#3C6E52',
          dark: '#2A4E3A',
          light: '#5B8F6E',
        },
        accent: '#2F5D9F',
        'text-primary': '#241A0D',
        'text-secondary': '#6B5A3F',
        'text-inverse': '#FFFFFF',
        success: '#3C8A5E',
        warning: '#D98E2A',
        danger: '#C2483A',
        border: '#E4D8BE',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '20px',
        xl: '28px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
    },
  },
  plugins: [],
};
