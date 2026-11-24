/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#14263D', 800: '#1B324E', 900: '#0F1D30', 950: '#0B1622' },
        gold: { DEFAULT: '#C6A66B', light: '#D9BE8A', dark: '#A98A52' },
        ivory: '#F5F3EF',
        slate: { DEFAULT: '#566579', light: '#7A8799' },
      },
      fontFamily: {
        heading: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 24px 60px -24px rgba(20,38,61,0.35)',
        card: '0 10px 30px -12px rgba(20,38,61,0.18)',
      },
    },
  },
  plugins: [],
}
