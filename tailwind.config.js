/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        moodora: {
          bg: '#11101D',
          card: '#181628',
          cardHover: '#1F1B36',
          border: 'rgba(139, 92, 246, 0.18)',
          borderHover: 'rgba(139, 92, 246, 0.45)',
          violet: '#8B5CF6',
          lavender: '#C4B5FD',
          coral: '#FF8066',
          cyan: '#5EDCF5',
          text: '#F8F7FF',
          muted: '#A5A1B8',
        }
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at 50% 30%, rgba(139, 92, 246, 0.22) 0%, rgba(94, 220, 245, 0.12) 35%, rgba(255, 128, 102, 0.08) 55%, transparent 75%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      boxShadow: {
        'glow-violet': '0 0 35px -5px rgba(139, 92, 246, 0.45)',
        'glow-cyan': '0 0 35px -5px rgba(94, 220, 245, 0.45)',
        'glow-coral': '0 0 35px -5px rgba(255, 128, 102, 0.45)',
        'orb-inner': 'inset 0 0 60px 15px rgba(139, 92, 246, 0.6), inset -20px -20px 50px 10px rgba(94, 220, 245, 0.5), inset 20px 20px 50px 10px rgba(255, 128, 102, 0.4)',
      },
      animation: {
        'spin-slow': 'spin 22s linear infinite',
        'reverse-spin': 'reverseSpin 28s linear infinite',
        'pulse-glow': 'pulseGlow 5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        reverseSpin: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.06)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
