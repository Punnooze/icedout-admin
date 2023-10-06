module.exports = {
  // prefix: 'tw-',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      lightblue: '#58B6C3',
      darkblue: '#04122A',
      background: '#DEDEDE',
      navbg: '#082546',
      banner: '#58C6D4',
      grey: '#707070',
      lightgrey: '#aba2a23f',
      lightpurple: '#383d82',
      white:'#FFFFFF'
      // niceblue: '#9081e5',
      // darkbg: '#1f2937',
      // darkbgtext: '#b7b8ba',
    },
    extend: {
      fontFamily: {
        ARegular: ['ARegular', 'sans-serif'],
        ABold: ['ABold', 'sans-serif'],
        syne: ['syne', 'monospace'],
        melt: ['melt', 'sans-serif'],
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
