const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
	mode: "development",
	entry: {
		main: ["./main.ts"],
	},
	output: {
		filename: "[name].js",
		path: `${__dirname}/dist`,
	},

	devServer: {
		hot: true,
		static: path.join(__dirname, "dist"),
		compress: true,
		port: 9000
	},

	resolve: {
		extensions: [".ts", ".js", ".json"],
	},

	module: {
		rules: [
			{ test: /\.ts(x)?$/, loader: "ts-loader" },

			{ enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
		],
	},

	plugins: [
		new HotModuleReplacementPlugin()
	],

	target: "electron-renderer",
};
