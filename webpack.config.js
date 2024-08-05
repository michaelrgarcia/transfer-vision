/* eslint-disable no-dupe-keys */
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: ["./src/index.js"],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "imgs/[name].[ext]",
    // eslint-disable-next-line no-dupe-keys
    assetModuleFilename: "svgs/[name].[ext]",
    assetModuleFilename: "fonts/[name].[ext]",
  },
  plugins: [new Dotenv()],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(mp3)$/i,
        type: "asset/resource",
      },
    ],
  },
};
