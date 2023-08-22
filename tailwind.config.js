const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,tsx,jsx}'],
	theme: {
		extend: {
			colors: {
				...colors,
				primary: '#26abff',
				secondary: '#8cd3ff',
			},
		},
	},
	plugins: [],
};
