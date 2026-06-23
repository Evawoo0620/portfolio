/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0a0a0a',
          secondary: '#111111',
          elevated: '#1a1a1a',
          card: '#151515',
          surface: '#1f1f1f',
        },
        text: {
          primary: '#fafafa',
          secondary: '#b3b3b3',
          muted: '#666666',
          light: '#888888',
          subtle: '#4a4a4a',
        },
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        accent: {
          primary: '#22c55e',
          cyan: '#06b6d4',
          purple: '#a855f7',
          pink: '#ec4899',
          orange: '#f97316',
          blue: '#3b82f6',
        },
        border: '#2a2a2a',
        line: '#333333',
      },
      fontFamily: {
        heading: ['"Alibaba Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
        body: ['"Alibaba Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
        numbers: ['"Bebas Neue"', '"DIN Alternate"', 'sans-serif'],
      },
      maxWidth: {
        container: '1700px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
