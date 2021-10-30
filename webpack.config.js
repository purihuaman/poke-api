
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
				test: /\.html$/i,
				use: {
					loader: 'html-loader',
					options: { minimize: true }
				}
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
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
			title: 'Mi webpack',
			template: './src/index.html',
			filename: './index.html',
			scriptLoading: 'blocking',
		}),
		new MiniCssExtractPlugin({
			// filename: 'css/styles.[fullhash].css'
			filename: 'css/styles.css'
		}),
		new CopyWebpackPlugin({
			patterns: [
        // { from: "src/assets/icons", to: "./icons" },
        // { from: "./src/assets/", to: "assets/" },
				{ from: './src/assets/icons', to: 'assets/icons' },
				{ from: './src/assets/image', to: 'assets/image' }
      ],
		}),
	],
	// Output point
	output: {
		clean: true,
		path: path.join( basePath, publicPath),
		filename: 'js/script.js'
	}
}

