/**
 * Requires
 */

// Modules
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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

const buildConfiguration = function (target, modifier, separateCSS) {

	// Create file name
	const fileName = modifier != null ? `${target}.${modifier}` : target;

	// Build configuration
	const configuration = {
		mode: isEnvDevelopment ? 'development' : 'production',
		entry: {
			index: `${__dirname}/src/js/index.js`,
		},
		output: {
			path: `${__dirname}/dist/`,
			filename: (isEnvDevelopment) ? `[name].${fileName}.min.js` : `[name].${fileName}.min.js`,
			publicPath: '/public/',
			library: {
				name: 'EscapeButton',
				type: target
			}
		},
		...(!isEnvDevelopment ? {
			devtool: 'source-map',
		} : undefined),
		...(separateCSS ? {
			optimization: {
				minimize: false
			}
		} : undefined),
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
						separateCSS && {
							loader: MiniCssExtractPlugin.loader,
							options: {}
						},
						!separateCSS && 'style-loader',
						'css-loader'
					].filter(Boolean)
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
			separateCSS && new MiniCssExtractPlugin({
				filename: isEnvDevelopment ? `css/[name].${fileName}.bundle.css` : `css/[name].${fileName}.bundle.css`,
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

/**
 * Exports
 */

module.exports = [
	buildConfiguration('var', null, false),
	buildConfiguration('commonjs2', null, false),
	buildConfiguration('var', 'solo', true),
];
