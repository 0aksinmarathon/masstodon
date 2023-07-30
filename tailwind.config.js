/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			dropShadow: {
				hard1: '0 3px 3px rgba(0, 0, 0, 0.5)',
				hard2: '0 2px 2px rgba(0, 0, 0, 0.8)',
			},
		},
	},
	plugins: [],
};
