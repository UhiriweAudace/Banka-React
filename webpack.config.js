const path = require('path');
const HtmlWP = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: path.join(__dirname, "/src","/index.js"),
  output: {
    filename: 'build.js',
    path: path.join(__dirname, '/dist')
  },
  module: {
    rules: [
      {
      test: /.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /.(css|scss)$/,
      use: [MiniCssExtractPlugin.loader, "css-loader",]
    },
    {
      test: /.(jpg|jpeg|png|gif|mp3|svg)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[path][name]-[hash:8].[ext]"
          }
        }
      ]
    }
  ]
  },
  plugins: [
    new HtmlWP ({
      filename: "index.html",
      template: path.join(__dirname, "/src","/index.html")
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
}