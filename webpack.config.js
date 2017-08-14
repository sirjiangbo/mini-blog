const path = require('path');

module.exports = {
	entry: './public/admin/src/js/admin.js',
	output: {
		path: path.join(__dirname, 'public/admin/dist'),
		filename: 'admin.build.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015', 'stage-0']
					}
				}
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