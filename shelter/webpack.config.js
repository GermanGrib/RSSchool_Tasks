const path = require("path");
const mode = process.env.NODE_ENV || 'development';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = mode === 'development';
const CopyWebpackPlugin = require('copy-webpack-plugin');

const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
  mode,
  target,
  devtool,
  entry: {
    app: ["@babel/polyfill", path.resolve(__dirname, 'src', 'index.js')],
    pets: './src/js/pets.js',
    // assetModuleFilename: 'assets/[name][ext]',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.html'),
      chunks: ['app'],
    }),
    new HtmlWebpackPlugin({
      filename: 'pets.html',
      template: path.resolve(__dirname, 'src/views/pets.html'),
      chunks: ['pets'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets/**/*', to: 'assets/[name][ext]', },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-preset-env')]
              }
            }
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(woff2?|ttf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      // {
      //   test: /\.(jpe?g|png|webp|gif|svg)$/i,
      //   type: 'asset/resource',
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         mozjpeg: {
      //           progressive: true,
      //         },
      //         // name: '[name].[ext]',
      //         // optipng.enabled: false will disable optipng
      //         optipng: {
      //           enabled: false,
      //         },
      //         pngquant: {
      //           quality: [0.65, 0.90],
      //           speed: 4
      //         },
      //         gifsicle: {
      //           interlaced: false,
      //         },
      //         // the webp option will enable WEBP
      //         webp: {
      //           quality: 75
      //         },
      //         outputPath: 'assets/',
      //         generator: {
      //           filename: 'assets/[name][ext]'
      //         }
      //       },
      //     }
      //   ],
      //   // generator: {
      //   //   filename: 'assets/[name][ext]'
      //   // }
      //   // outputPath: 'assets/',
      // },
      {
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },

    ],
  },
}