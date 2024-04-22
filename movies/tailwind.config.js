/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js}', './src/components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		colors: {},
		extend: {
			fontSize: {
				'2xs': ['0.5rem', '0.75rem'],
			},
			gridTemplateColumns: {
				'pins': 'repeat(auto-fit, minmax(10rem, 1fr))',
				'dashboard': 'repeat(auto-fit, minmax(16rem, 1fr))',
				'2-350': 'repeat(2, minmax(0,350px))',
				'form': 'repeat(auto-fit, minmax(150px, 1fr))',
			},
			zIndex: {
				1400: '1400',
			},
			screens: {
				'xxs': '320px',
				'ssm': '412px',
				'lg-xl': '1200px',
				'tall': { raw: '(min-height: 800px)' },
				'wide': '1366px',
				// => @media (min-height: 800px) { ... }
			},
		},
	},
	plugins: [],
};
