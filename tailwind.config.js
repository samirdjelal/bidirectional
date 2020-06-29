module.exports = {
	purge: {
		enabled: true,
		content: [
			
			'./src/**/*.html',
			'./src/**/*.js',
			'./src/**/*.jsx',
		]
	},
	theme: {
		extend: {},
	},
	variants: {},
	plugins: [
		require('@tailwindcss/ui')
	],
}
