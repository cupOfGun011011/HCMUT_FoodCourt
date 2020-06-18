const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: ["babel-polyfill", "./src/js/login.js"],
  output: {
    path: path.resolve("../back-end/dist"),
    filename: "js/login.js",
  },
  devServer: {
    contentBase: "../back-end/dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
