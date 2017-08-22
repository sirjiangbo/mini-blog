const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const langs = require('highlight.js-async-webpack/src/file.lang.hljs.js');

let entry = {
	admin: './public/src/admin.js',
	home: './public/src/home.js',
	login: './public/src/login.js'
};

langs.forEach(lang => {
	entry[lang] = ['mavon-editor/dist/js/' + lang + '.js'];
});

module.exports = {
	entry,
	output: {
		path: path.join(__dirname, 'public/dist'),
		filename: '[name].build.js'
	},
	plugins: [
    new webpack.optimize.CommonsChunkPlugin({
    	name: 'common'
    }),
		new ExtractTextPlugin('muse.css')
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: ['babel-loader']
			},
			{
				test: /\.vue$/,
				use: ['vue-loader']
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
			},
			{
				test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
				use: ['file-loader']
			}
		]
	},
	watch: true
};