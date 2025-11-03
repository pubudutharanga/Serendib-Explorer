module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#2f855a', // tea-green
        'secondary': '#0e7490', // sea-blue
        'accent': '#F6C85F', // sun-gold
        'neutral': '#065666', // deep-teal
        'background': '#ffffff',
        'foreground': '#111827',
        'muted': '#6b7280',
        'muted-foreground': '#9ca3af',
        'card': '#ffffff',
        'card-foreground': '#111827',
        'ring': '#2f855a'
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { transform: 'translateY(20px)', opacity: 0 }, '100%': { transform: 'translateY(0)', opacity: 1 } },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideUp: 'slideUp 0.5s ease-out',
      },
    }
  },
  plugins: [require('@tailwindcss/forms')],
}