module.exports = {
  // prefix: 'tw-',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      //background: '#121212',
      background: '#1f1f1f',
      darkgrey: '#363535',
      darkergrey: '#4f4f4f',
      grey: '#707070',
      lightgrey: '#b7b8ba',
      violet: '#bb86fc',
      bluepurple: '#9081e5',
      lightpurple: '#383d82',
      teal: '#03dac6',
      white: '#ffffff',

      lightblue: '#58B6C3',
      darkblue: '#04122A',
      navbg: '#082546',
      banner: '#58C6D4',
      // grey: '#707070',
      // lightgrey: '#aba2a23f',
      // darkbg: '#1f2937',
    },
    extend: {
      fontFamily: {
        ARegular: ['ARegular', 'sans-serif'],
        ABold: ['ABold', 'sans-serif'],
        syne: ['syne', 'monospace'],
        melt: ['melt', 'sans-serif'],
        lato: ['lato', 'sans-serif'],
        poppins: ['poppins', 'sans-serif'],
      },

      fontSize: {
        'h1-xl': '3.75rem',
        'h2-xl': '2.5rem',
        'h3-xl': '3.3rem',
        'h4-xl': '1.5rem',
        'body-xl': '1.3rem',
        'footer-xl': '0.86rem',
        'h1-sm': '2.5rem',
        'h2-sm': '1.4rem',
        'body-sm': '0.85rem',
        'footer-sm': '0.6rem',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#58B6C3',
          secondary: '#383d82',
          neutral: '#aba2a23f',
          'base-100': '#DEDEDE',
          red: '#ff4646de',
        },
      },
    ],
  },
};
