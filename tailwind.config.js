/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          bg: '#09090B',
          surface: '#111114',
          card: '#141417',
          border: '#232329',
        },
        accent: {
          purple: '#8B5CF6',
          violet: '#A78BFA',
          blue: '#3B82F6',
          cyan: '#38BDF8',
        },
        ink: {
          100: '#F4F4F6',
          300: '#C7C7CF',
          500: '#8E8E98',
          700: '#5A5A63',
        },
      },
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #3B82F6 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(59,130,246,0.15) 100%)',
        'seam-gradient': 'linear-gradient(180deg, transparent 0%, #8B5CF6 20%, #3B82F6 80%, transparent 100%)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(139,92,246,0.15), 0 8px 40px -8px rgba(139,92,246,0.35)',
        'glow-blue': '0 0 0 1px rgba(59,130,246,0.15), 0 8px 40px -8px rgba(59,130,246,0.35)',
        card: '0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 60px -20px rgba(0,0,0,0.6)',
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        shimmer: 'shimmer 1.8s ease-in-out infinite',
        'pulse-seam': 'pulse-seam 2.2s ease-in-out infinite',
        'float-up': 'float-up 0.5s cubic-bezier(0.16,1,0.3,1) both',
        ripple: 'ripple 0.6s ease-out',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: 1 },
          '50%, 100%': { opacity: 0 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-seam': {
          '0%, 100%': { opacity: 0.4, transform: 'scaleY(0.9)' },
          '50%': { opacity: 1, transform: 'scaleY(1)' },
        },
        'float-up': {
          '0%': { opacity: 0, transform: 'translateY(18px) scale(0.98)' },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: 0.45 },
          '100%': { transform: 'scale(2.5)', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}
