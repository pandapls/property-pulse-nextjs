import type { Config } from "tailwindcss";

export default {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins', 'sans-serif'],
			},
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
			},
			gridTemplateColumns: {
				'70/30': '70% 28%',
			},
		},
	},
	plugins: [],
} satisfies Config;
