module.exports = {
	important: true,
	purge: [ './src/**/*.js', './src/**/*.jsx' ],
	theme: {
		extend: {
			colors: {
				orange: {
					eventbrite: '#d6472b',
				},
			},
			opacity: {
				'90': '.9',
			},
		},
	},
	variants: {
		textColor: [ 'responsive', 'hover', 'focus', 'active' ],
	},
};
