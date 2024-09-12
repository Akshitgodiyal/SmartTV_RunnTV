const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin } = require('webpack');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin'); // For minification

module.exports = (env) => {
  const platform = process.env.PLATFORM || 'lg';
  const environment = process.env.ENVIRONMENT || 'development';

  return {
    mode: environment,
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist', platform),
      filename: 'bundle.[contenthash].js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/, // For regular CSS files
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: ['tailwindcss', 'autoprefixer'],
                },
                sourceMap: false,
              },
            },
          ],
        },
        {
          test: /\.scss$/, // For SCSS files
          oneOf: [
            {
              resourceQuery: /raw/, // If the query includes '?raw', it will copy the raw SCSS file.
              type: 'asset/resource',
              generator: {
                filename: 'assets/styles/[name].[hash].scss', // Output raw SCSS files (with hash for cache-busting)
              },
            },
            {
              use: [
                MiniCssExtractPlugin.loader, // Extract CSS into files
                'css-loader', // Translates CSS into CommonJS
                {
                  loader: 'postcss-loader', // Processes Tailwind CSS
                  options: {
                    postcssOptions: {
                      plugins: ['tailwindcss', 'autoprefixer'],
                    },
                    sourceMap: false,
                  },
                },
                'sass-loader', // Compiles SCSS to CSS
              ],
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/i, // For images
          type: 'asset/resource',
          generator: {
            filename: 'images/[name].[hash][ext]', // Store images in the 'images/' folder
          },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'assets/styles/[name].[contenthash].css', // Output compiled CSS files
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
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist', platform),
      },
      compress: true,
      port: 9000,
      hot: true,
    },
    optimization: {
      minimize: true, // Minify everything including SCSS if needed
      minimizer: [
        new TerserPlugin({ // Minify JS and other assets
          extractComments: false,
        }),
      ],
      splitChunks: {
        chunks: 'all',
      },
    },
  };
};
