const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: {
		admin: './public/src/admin.js',
		home: './public/src/home.js',
		login: './public/src/login.js'
	},
	output: {
		path: path.join(__dirname, 'public/dist'),
		filename: '[name].build.js'
	},
	plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        })
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: ['babel-loader']
			},
			{
				test: /iview.src.*?js$/,
				use: ['babel-loader']
			},
			{
				test: /\.vue$/,
				use: ['vue-loader']
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
				use: ['file-loader']
			}
		]
	},
	watch: true
};