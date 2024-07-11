/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '320px',
        sm: '330px',
        sms: '386px',
        smm: '410px',
        sml: '500px',
        md: '667px',
        mdl: '768px',
        lg: '960px',
        lgl: '1024px',
        lgx: '1134px',
        xl: '1300px',
        xll: '1380px',
        xlx: '1400px',
        xxl: '1600px',
      },
      fontFamily: {
        barlow: ['Barlow Semi Condensed', 'sans-serif'],
        'poppins-bold': ['Poppins', 'sans-serif', '700'],
      },
      colors: {
        borderc: 'rgba(178, 178, 178, 1);',
      },
      boxShadow: {
        custom: '0px 0px 20px 0px #1A31501A',
        customWhite: '0px 2px 6px 0px #FFFFFF40',
        customShadow: '0px 5px 10px 0px #1A31500D',
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        10: '10',
        50: '50',
        100: '100',
      },
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
    }
  },
  plugins: [],
};
