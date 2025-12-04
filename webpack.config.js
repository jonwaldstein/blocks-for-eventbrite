const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

// Filter out the default CSS rules from @wordpress/scripts
const filteredRules = defaultConfig.module.rules.filter( ( rule ) => {
	// Keep rules that don't match CSS files
	if ( ! rule.test ) {
		return true;
	}
	const testString = rule.test.toString();
	// Remove default CSS/SCSS rules (we'll add our own)
	if ( testString.includes( '\\.css' ) || testString.includes( '\\.s[ac]ss' ) ) {
		return false;
	}
	return true;
} );

module.exports = {
	...defaultConfig,
	module: {
		...defaultConfig.module,
		rules: [
			...filteredRules,
			// Non-module CSS (including tippy.js, base.css, etc.)
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
			// CSS Modules
			{
				test: /\.module\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: {
								localIdentName: '[local]',
							},
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
