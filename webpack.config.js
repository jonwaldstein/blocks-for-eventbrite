const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
	...defaultConfig,
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /^(?!.*?\.module).*\.css$/,
				use: [
					{
						loader: 'style-loader',
						options: {
							injectType: 'singletonStyleTag',
							attributes: { id: 'blocks-for-eventbrite-css' },
						},
					},
					{
						loader: 'css-loader',
						options: { importLoaders: 1 },
					},
					{
						loader: 'postcss-loader',
					},
				],
			},
			{
				test: /\.module\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
						},
					},
					{
						loader: 'postcss-loader',
					},
				],
			},
		],
	},
};
