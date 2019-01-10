var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin")
var CleanWebpackPlugin = require("clean-webpack-plugin")
var ExtractTextPlugin = require("extract-text-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var extractPlugin = new ExtractTextPlugin({
	filename: "main.css"
})

module.exports = {
	entry: "./src/js/app.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js"
		// publicPath: "/dist"
	},
	module: {
	    rules: [
	        {
		        test:/\.css$/,
	            use: 
	            	[
	            		'style-loader',
          				MiniCssExtractPlugin.loader, // evtl sinnlos ? funktioniert auch ohne
  		                'css-loader'
	            	]
	        },
	        {
	        	test: /\.(jpg|png)$/,
	        	use: [
	        		{
	        			loader: "file-loader",
	        			options: {
	        				name: '[name].[ext]',
	        				outputPath: 'img/',
	        				publicPath: 'img/'
	        			}
	        		}
	        	]
	        },
	        {
	        	test: /\.html$/,
	        	use: ["html-loader"]
	        },
  	        {
	          test: /\.(woff(2)?|ttf|eot|svg)$/,
	          use: [
	            {
	              loader: 'file-loader',
                  options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                  },
	            },
	          ]
	        },
	        {
	        	test: /\.js$/,
	        	use: [
	        		{
	        			loader: "babel-loader",
	        			options: {
	        				presets: ["@babel/preset-env"]
	        			}
	        		}
	        	]
	        },
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		}),
		// new webpack.ProvidePlugin({
		// 	dt: "datatables.net"
		// }),
		new HtmlWebpackPlugin({
			template: "src/index.html"
		}),
	    new MiniCssExtractPlugin({  // Evtl sinnlos ? funktioniert auch ohne
	      filename: "[name].css",
    	  chunkFilename: "[id].css"
    	})
		//, new CleanWebpackPlugin(["dist"])
	]
};
