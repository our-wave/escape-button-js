/**
 * Requires
 */

// Modules
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv').config();

// Package
const Package = require('./package.json');

/**
 * Environment
 */

dotenv.parsed.PACKAGE_VERSION = Package.version;
const isEnvDevelopment = process.env.NODE_ENV === 'development';

/**
 * Options
 */

const htmlMinificationOptions = {
	removeComments: true,
	collapseWhitespace: true,
	useShortDoctype: true,
	removeRedundantAttributes: false,
	removeEmptyAttributes: true,
	removeStyleLinkTypeAttributes: true,
	keepClosingSlash: true,
	minifyJS: true,
	minifyCSS: true,
	minifyURLs: true,
	processScripts: ['application/ld+json']
};

/**
 * Configuration
 */

module.exports = function () {

	// Build configuration
	const configuration = {
		mode: isEnvDevelopment ? 'development' : 'production',
		entry: {
			index: `${__dirname}/src/js/index.js`,
		},
		output: {
			path: `${__dirname}/dist/`,
			filename: (isEnvDevelopment) ? '[name].js' : '[name].js',
			publicPath: '/public/',
			libraryTarget: 'commonjs2'
		},
		...(!isEnvDevelopment ? {
			devtool: 'source-map',
		} : undefined),
		module: {
			rules: [
				{
					test: /\.css$/,
					use: ['style-loader',
						'css-loader']
				},
				{
					test: /\.(gif|png|jpg|ico)$/,
					use: {
						loader: 'url-loader'
					}
				},
				{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								['@babel/preset-env',
									{
										useBuiltIns: 'usage',
										corejs: 3,
										modules: 'commonjs',
									}
								]
							]
						},
					},
				},
			],
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env': JSON.stringify({
					PACKAGE_VERSION: Package.version
				}),
			}),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: 'src/views/index.html',
				inject: false,
				minify: !isEnvDevelopment ? htmlMinificationOptions : false
			})
		].filter(Boolean),
		resolve: {
			fallback: {
				fs: false,
				tls: false,
				net: false,
				path: false,
				zlib: false,
				http: false,
				https: false,
				stream: false,
				crypto: false,
				util: require.resolve('util/'),
				os: require.resolve('os-browserify/browser'),
				'crypto-browserify': require.resolve('crypto-browserify')
			}
		}
	};

	// Return config
	return configuration;
};
