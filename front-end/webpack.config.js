const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: ["babel-polyfill", "./src/menu/index.js"],
  output: {
    path: path.resolve("../back-end/dist/menu"),
    filename: "js/index.js",
  },
  devServer: {
    contentBase: "../back-end/dist/menu",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/menu/index.html",
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
