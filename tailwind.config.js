/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        './resources/js/**/*.js',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Mulish', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            colors: {
                primary: '#3564C4',
                'primary-light': '#E8EEF8',
                secondary: '#119CFF',
                background: '#F0F7FF',
                success: '#10B981',
                warning: '#F59E0B',
                danger: '#EF4444',
            },
        },
    },
    plugins: [],
};
