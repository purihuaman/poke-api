
const path 		 = require('path'),
			basePath = __dirname,
			publicPath = 'public',
			HtmlWebpackPlugin = require('html-webpack-plugin'),
			MiniCssExtractPlugin = require('mini-css-extract-plugin'),
			CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.pug$/i,
				use: [ { loader: "pug-loader", } ],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					"sass-loader",
				],
			},
			{
				test: /\.(png|jpe?g|gif|webp|svg)$/,
				use: [ 'file-loader', ]
			}
		],
	},
	optimization: {},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.pug",
			filename: "./index.html",
			scriptLoading: "blocking",
		}),
		new MiniCssExtractPlugin({
			filename: 'css/styles.css'
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: './src/assets/icons', to: 'assets/icons' },
				{ from: './src/assets/image', to: 'assets/image' }
      ],
		}),
	],
	// Output point
	output: {
		clean: false,
		path: path.join( basePath, publicPath),
		filename: 'js/script.js'
	}
}

