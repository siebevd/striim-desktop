const { resolve } 	= require('path');
const baseConfig 		= require('./webpack.config.base.js');
const webpackMerge	= require('webpack-merge');
const webpack 			= require('webpack');

module.exports = webpackMerge(baseConfig, {
	entry: [
		'react-hot-loader/patch',
		// activate HMR for React

		'webpack-dev-server/client?http://localhost:8080',
		// bundle the client for webpack-dev-server
		// and connect to the provided endpoint

		'webpack/hot/only-dev-server',
		// bundle the client for hot reloading
		// only- means to only hot reload for successful updates

		'./index.js',
		// the entry point of our app
	],
	output: {
		publicPath: 'http://localhost:8080/'
		// necessary for HMR to know where to load the hot update chunks
	},


	devtool: 'inline-source-map',

	devServer: {
		hot: true,
		// enable HMR on the server

		contentBase: resolve(__dirname,'../dist'),
		// match the output path

		publicPath: '/'
		// match the output `publicPath`
	},

	// target: 'electron-renderer',

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		// enable HMR globally

		new webpack.NamedModulesPlugin(),
		// prints more readable module names in the browser console on HMR updates,
		//
		new webpack.ExternalsPlugin('commonjs', ['electron'])

	],
});
