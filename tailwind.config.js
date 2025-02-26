/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "480px",
      tablet : "600px",
      sm: "640px",
      md: "770px",
      desktop: "900px",
      lg: "1280px",
      xl: "1536px",
      "2xl": "1536px",
  },
    extend: {
      fontFamily: {
        sans: ['Open Sans'],
      },
      fontWeight: {
        bold: '700',
      },
      backgroundImage: {
        bodywhite: 'linear-gradient(180deg, #6E5ED009  0%, #6E5ED04F 100%);',
        bodydark: 'linear-gradient(to bottom, #262F3B   0%, #262F3B   100%);',
      },
      colors: {
        'tw-primary': '#4AA3A2',
        'primary-darker': '#5C4CBB',
        bgdark: '#1C232C',
        'custom-green': 'rgba(55, 171, 101, 0.13)',
        'secondary-dark': '#2F354E',
        'secondary-dark-7': '#222739',
        'secondary-light': '#FBFBFD',
        'tw-secondary': '#9DA4B1',
        'tw-white': '#FFFFFF',
        'tw-black': '#000000',
        grey: '#BABABA',
        darkgrey: '#808080',
        lightgrey: '#dadada',
        shadow: '#00000059',
        orange: '#f5b544',
        't-orange': '#f5b5441a',
        blue: '#5390EB',
        't-blue': '#5390EB1a',
        red: '#F7332B',
        'red-600': 'rgb(220 38 38);',
        't-red': '#F7332B1a',
        green: '#4B9F47',
        't-green': '#4B9F471a',
        't-noir': '#0000001a',
      },
      fontSize: {
        'tw-h1': '20px',
        'tw-title': '30px',
        'tw-h2': '1.875rem',
      },
      boxShadow: {
        'md-center': '0 0 6px -1px rgb(0 0 0 / 0.2)',
        'lg-center': '0 0 15px -2px rgb(0 0 0 / 0.3)',
        'lg-center-white':
          '0 0 10px -3px rgb(255 255 255 / 0.05)',
      },
      borderRadius: {
        max: '16px',
      },
    },
  },
  plugins: [],
};
