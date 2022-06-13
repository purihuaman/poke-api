const path = require('path'),
	basePath = __dirname,
	publicPath = 'public',
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	MiniCssExtractPlugin = require('mini-css-extract-plugin'),
	CopyWebpackPlugin = require('copy-webpack-plugin'),
	CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin'),
	TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.js$/i,
				exclude: [/node_modules/],
				use: {
					loader: 'babel-loader',
					options: {presets: ['@babel/preset-env']},
				},
			},
			{
				test: /\.pug$/i,
				use: [{loader: 'pug-loader'}],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(png|jpe?g|gif|webp|svg)$/,
				use: ['file-loader'],
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},

	optimization: {
		minimize: true,
		minimizer: [new CssMinimizerWebpackPlugin(), new TerserWebpackPlugin()],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.pug',
			filename: './index.html',
			scriptLoading: 'blocking',
		}),
		new MiniCssExtractPlugin({
			filename: 'css/styles.css',
		}),
		new CopyWebpackPlugin({
			patterns: [
				{from: './src/assets/icons', to: 'assets/icons'},
				{from: './src/assets/images', to: 'assets/images'},
			],
		}),
	],
	// Output point
	output: {
		clean: true,
		path: path.join(basePath, publicPath),
		filename: 'js/script.js',
	},
};
