/**
 * Webpack Configuration
 *
 * Working of a Webpack can be very simple or complex. This is an intenally simple
 * build configuration.
 *
 * Webpack basics — If you are new the Webpack here's all you need to know:
 *     1. Webpack is a module bundler. It bundles different JS modules together.
 *     2. It needs and entry point and an ouput to process file(s) and bundle them.
 *     3. By default it only understands common JavaScript but you can make it
 *        understand other formats by way of adding a Webpack loader.
 *     4. In the file below you will find an entry point, an ouput, and a babel-loader
 *        that tests all .js files excluding the ones in node_modules to process the
 *        ESNext and make it compatible with older browsers i.e. it converts the
 *        ESNext (new standards of JavaScript) into old JavaScript through a loader
 *        by Babel.
 *
 * TODO: Instructions.
 *
 * @since 1.0.0
 */

const paths = require( './paths' );
const autoprefixer = require( 'autoprefixer' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const webpack = require('webpack');

// Extract style.css for both editor and frontend styles.
const blocksCSSPlugin = new ExtractTextPlugin( {
	filename: './dist/blocks.style.build.css',
} );

// Extract style.css for frontend styles only.
const resultBlocksCSSPlugin = new ExtractTextPlugin( {
	filename: './dist/blocks.result.build.css',
} );

// Extract editor.css for editor styles.
const editBlocksCSSPlugin = new ExtractTextPlugin( {
	filename: './dist/blocks.editor.build.css',
} );

// Configuration for the ExtractTextPlugin — DRY rule.
const extractConfig = {
	use: [
		// "postcss" loader applies autoprefixer to our CSS.
		{ loader: 'raw-loader' },
		{
			loader: 'postcss-loader',
			options: {
				ident: 'postcss',
				plugins: [
					autoprefixer( {
						browsers: [
							'>1%',
							'last 4 versions',
							'Firefox ESR',
							'not ie < 9', // React doesn't support IE8 anyway
						],
						flexbox: 'no-2009',
					} ),
				],
			},
		},
		// "sass" loader converst SCSS to CSS.
		{
			loader: 'sass-loader',
			options: {
				// Add common CSS file for variables and mixins.
				//data: '@import "./src/common.scss";\n',
				//outputStyle: 'nested',
				includePaths: [
      		'node_modules', 'bower_components', 'src', '.'
    		]
			},
		},

	],
};

// Export configuration.
module.exports = {
	entry: {
		'./dist/blocks.build': paths.pluginBlocksJs, // 'name' : 'path/file.ext'.
		'./dist/result.build': paths.pluginResultJS,
	},
	output: {
		// Add /* filename */ comments to generated require()s in the output.
		pathinfo: true,
		// The dist folder.
		path: paths.pluginDist,
		filename: '[name].js', // [name] = './dist/blocks.build' as defined above.
	},
	// You may want 'eval' instead if you prefer to see the compiled output in DevTools.
	devtool: 'cheap-eval-source-map',
	module: {
		rules: [
			{
				test: /\.(js|jsx|mjs)$/,
				exclude: /bower_components/,
				use: {
					loader: 'babel-loader',
					options: {

						// This is a feature of `babel-loader` for webpack (not Babel itself).
						// It enables caching results in ./node_modules/.cache/babel-loader/
						// directory for faster rebuilds.
						cacheDirectory: true,
						plugins: ['lodash'],
						presets: [['env', { 'targets': { 'node': 6 } }]]
					},
				},
			},
		/*	{
				test: /style\.s?css$/,
				exclude: /(node_modules|bower_components)/,
				use: blocksCSSPlugin.extract( extractConfig ),
			},
			{
				test: /editor\.s?css$/,
				exclude: /(node_modules|bower_components)/,
				use: editBlocksCSSPlugin.extract( extractConfig ),
			},*/
			{
				test: /\.scss$/,
				exclude: /bower_components/,
			 	oneOf: [ {
            resourceQuery: /editor/, // foo.css?editor
            use: editBlocksCSSPlugin.extract( extractConfig )
          },
					{
						resourceQuery: /result/, // foo.css?editor
            use: resultBlocksCSSPlugin.extract( extractConfig )
        	},
          {
			//			resourceQuery: /^$/, // foo.css?editor
            use: blocksCSSPlugin.extract( extractConfig )
        	},
					]
			}
		],
	},
	// Add plugins.
	plugins: [ blocksCSSPlugin, editBlocksCSSPlugin, resultBlocksCSSPlugin,  new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }) ],
	stats: 'minimal',
	// stats: 'errors-only',
	// Add externals.
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
		ga: 'ga', // Old Google Analytics.
		gtag: 'gtag', // New Google Analytics.
	//	jquery: 'jQuery', // import $ from 'jquery' // Use the WordPress version.
	},
};
