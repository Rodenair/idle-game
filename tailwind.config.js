/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        scrap: '#f59e0b',
        parts: '#06b6d4',
      },
      keyframes: {
        floatUp: {
          '0%':   { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(-80px) scale(1.4)' },
        },
        monsterShake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%':      { transform: 'translateX(-6px)' },
          '75%':      { transform: 'translateX(6px)' },
        },
        monsterBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'float-up':        'floatUp 0.9s ease-out forwards',
        'monster-shake':   'monsterShake 0.3s ease-in-out',
        'monster-bounce':  'monsterBounce 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
