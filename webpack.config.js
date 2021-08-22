const MODE = "development";
const enabledSourceMap = MODE === "development";

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

module.exports = {
  mode: MODE,
  entry: path.join(srcPath, 'assets/ts/main.ts'),
  output: {
    path: distPath,
    filename: "bundle.js"
  },
  devServer: {
    compress: true,
    port: 3000,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: enabledSourceMap,
              importLoaders: 2,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: enabledSourceMap,
            }
          }
        ]
      },
      {
        test: /.(ts|tsx|js)$/,
        use: 'ts-loader',
        include: [srcPath],
        exclude: /node_modules/
      },
      {
        test: /.(vert|frag)$/,
        use: 'raw-loader',
        include: [srcPath],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  },
  target: ['web', 'es5'],
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html')
    })
  ],
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
};