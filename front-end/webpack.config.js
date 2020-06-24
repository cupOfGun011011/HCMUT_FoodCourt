const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: ["babel-polyfill", "./src/login/index.js"],
  output: {
    path: path.resolve("../back-end/dist/login"),
    filename: "js/index.js",
  },
  devServer: {
    contentBase: "../back-end/dist/login",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/login/index.html",
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
