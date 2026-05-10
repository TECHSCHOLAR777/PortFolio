/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'Courier New', 'monospace'],
        body: ['var(--font-body)', 'Georgia', 'serif'],
      },
      colors: {
        void: '#080808',
        surface: '#0f0f0f',
        panel: '#141414',
        border: '#1e1e1e',
        'border-bright': '#2e2e2e',
        amber: {
          DEFAULT: '#f5a623',
          dim: '#a36f14',
          glow: '#f5a62330',
        },
        signal: {
          green: '#00ff88',
          red: '#ff3b3b',
          blue: '#4da6ff',
        },
        text: {
          primary: '#e8e4dc',
          secondary: '#7a7670',
          muted: '#3d3b38',
          accent: '#f5a623',
        },
      },
      animation: {
        'cursor-pulse': 'cursorPulse 0.3s ease-out forwards',
        'flicker': 'flicker 0.15s ease-in-out infinite',
        'scanline': 'scanline 4s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        cursorPulse: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(2.5)', opacity: '0.4' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px #f5a62330' },
          '50%': { boxShadow: '0 0 25px #f5a62360, 0 0 50px #f5a62320' },
        },
      },
    },
  },
  plugins: [],
}
