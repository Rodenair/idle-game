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
        critFloatUp: {
          '0%':   { opacity: '1', transform: 'translateY(0) scale(1.4)' },
          '20%':  { opacity: '1', transform: 'translateY(-24px) scale(1.9)' },
          '100%': { opacity: '0', transform: 'translateY(-110px) scale(1.2)' },
        },
        botAttackLeft: {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '35%':      { transform: 'translateX(10px) rotate(12deg)' },
          '55%':      { transform: 'translateX(16px) rotate(18deg)' },
          '75%':      { transform: 'translateX(6px) rotate(8deg)' },
        },
        botAttackRight: {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '35%':      { transform: 'translateX(-10px) rotate(-12deg)' },
          '55%':      { transform: 'translateX(-16px) rotate(-18deg)' },
          '75%':      { transform: 'translateX(-6px) rotate(-8deg)' },
        },
        buildingPulse: {
          '0%, 100%': { opacity: '0.85' },
          '50%':      { opacity: '1' },
        },
        smokeRise: {
          '0%':   { opacity: '0', transform: 'translateY(0) scale(0.5)' },
          '30%':  { opacity: '0.5' },
          '100%': { opacity: '0', transform: 'translateY(-20px) scale(1.5)' },
        },
        upgradeGlow: {
          'from': { boxShadow: '0 0 0 0 rgba(34,211,238,0)' },
          'to':   { boxShadow: '0 0 8px 2px rgba(34,211,238,0.3)' },
        },
      },
      animation: {
        'float-up':        'floatUp 0.9s ease-out forwards',
        'crit-float-up':   'critFloatUp 1.1s ease-out forwards',
        'monster-shake':   'monsterShake 0.3s ease-in-out',
        'monster-bounce':  'monsterBounce 2s ease-in-out infinite',
        'bot-attack-l':    'botAttackLeft 1s ease-in-out infinite',
        'bot-attack-r':    'botAttackRight 1s ease-in-out infinite',
        'map-building':    'buildingPulse 3s ease-in-out infinite',
        'smoke':           'smokeRise 2s ease-out infinite',
        'upgrade-glow':    'upgradeGlow 2s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}
