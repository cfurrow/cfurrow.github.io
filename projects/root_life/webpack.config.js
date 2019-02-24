"use strict";

var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
//var BrowserSyncPlugin = require("browser-sync-webpack-plugin");

// Phaser webpack config
var phaserModule = path.join(__dirname, "/node_modules/phaser/");
var phaser = path.join(phaserModule, "src/phaser.js");

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || "true")),
  WEBGL_RENDERER: true, // I did this to make webpack work, but I'm not really sure it should always be true
  CANVAS_RENDERER: true // I did this to make webpack work, but I'm not really sure it should always be true
});

module.exports = {
  entry: {
    app: ["babel-polyfill", path.resolve(__dirname, "src/main.js")],
    vendor: ["phaser", path.resolve(__dirname, "vendor/datgui.js")]
  },
  mode: 'development',
  devtool: "cheap-source-map",
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, "dist"),
    publicPath: "./dist/",
    filename: "[name].js" //"[name].[contenthash].js"
  },
  watch: true,
  plugins: [
    definePlugin,
    new HtmlWebpackPlugin({
      filename: "../index.html",
      template: "./src/index.html",
      chunks: ["vendor", "app"],
      chunksSortMode: "manual",
      hash: true,
      cache: false,
      minify: {
        removeAttributeQuotes: false,
        collapseWhitespace: false,
        html5: false,
        minifyCSS: false,
        minifyJS: false,
        minifyURLs: false,
        removeComments: false,
        removeEmptyAttributes: false
      }
    }),
    // new BrowserSyncPlugin({
    //   host: process.env.IP || "localhost",
    //   port: process.env.PORT || 3000,
    //   server: {
    //     baseDir: ["./", "./build"]
    //   }
    // })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        include: path.join(__dirname, "src")
      },
      { test: /phaser-split\.js$/, use: ["expose-loader?Phaser"] },
      { test: [/\.vert$/, /\.frag$/], use: "raw-loader" }
    ]
  },
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty"
  },
  resolve: {
    alias: {
      phaser: phaser
    }
  }
};
