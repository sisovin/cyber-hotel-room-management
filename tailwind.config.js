/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        neon: '#8A2BE2',
        teal: '#00CED1',
        flame: '#FF4500',
        cyber: {
          dark: '#0a0a0a',
          darker: '#050505',
          gray: '#1a1a1a',
          light: '#2a2a2a'
        }
      },
      boxShadow: {
        neon: '0 0 10px #8A2BE2, 0 0 20px #8A2BE2, 0 0 30px #8A2BE2',
        'neon-sm': '0 0 5px #8A2BE2',
        teal: '0 0 10px #00CED1, 0 0 20px #00CED1',
        flame: '0 0 10px #FF4500, 0 0 20px #FF4500'
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(138, 43, 226, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(138, 43, 226, 0.1) 1px, transparent 1px)',
        'cyber-noise': 'radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.1) 0%, transparent 50%)'
      },
      backgroundSize: {
        'grid': '20px 20px'
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite'
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 5px #8A2BE2, 0 0 10px #8A2BE2, 0 0 15px #8A2BE2'
          },
          '50%': {
            opacity: '.8',
            boxShadow: '0 0 2px #8A2BE2, 0 0 5px #8A2BE2, 0 0 8px #8A2BE2'
          }
        },
        glow: {
          from: { boxShadow: '0 0 5px #00CED1' },
          to: { boxShadow: '0 0 20px #00CED1, 0 0 30px #00CED1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [],
};
