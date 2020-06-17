const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: ["babel-polyfill", "./src/js/index.js"],
  output: {
    path: path.resolve("../back-end/dist"),
    filename: "js/bundle.js",
  },
  devServer: {
    contentBase: "../back-end/dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "test.html",
      template: "./src/test.html",
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
