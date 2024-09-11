const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin } = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
  const platform = process.env.PLATFORM || 'lg';
  const environment = process.env.ENVIRONMENT || 'development';

  return {
    mode: environment,
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist', platform),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    'tailwindcss',
                    'autoprefixer',
                  ],
                },
                sourceMap: true,
              },
            },
            'resolve-url-loader',
            'sass-loader'
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader'],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'dist', platform)],
      }),
      new DefinePlugin({
        'process.env.PLATFORM': JSON.stringify(platform),
      }),
      new Dotenv({
        path: './.env',
      }),
      new HtmlWebpackPlugin({
        template: `./src/platform/${platform}/index.html`,
        filename: 'index.html',
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist', platform),
      },
      compress: true,
      port: 9000,
    },
  };
};
