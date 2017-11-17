const { resolve } 	= require('path');
const baseConfig 		= require('./webpack.config.base.js');
const webpack 			= require('webpack');
const webpackMerge 	= require('webpack-merge');

module.exports = webpackMerge(baseConfig, {
  entry: [
    './index.js',
  ],
  output: {
    publicPath: '/'
  },
  context: resolve(__dirname, '../app'),
  devtool: 'cheap-source-map',
	target: 'electron-renderer',
  plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			mangle: {
				 screw_ie8: true,
				 keep_fnames: true
			},
			compress: {
				 screw_ie8: true,
				 warnings: false
			},
			comments: false
		})
  ]
});
