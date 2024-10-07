const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = (env) => {
  return {
    mode: env.mode,
    entry: path.resolve(__dirname, "src", "js", "main.js"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "./js/[name].[contenthash].js",
      clean: true,
    },
    devServer: {
      static: path.resolve(__dirname, "dist"),
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [[require("postcss-preset-env")]],
                },
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/[hash][ext]",
          },
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              plugins: [
                ["gifsicle", { interlaced: true }],
                ["jpegtran", { progressive: true }],
                ["optipng", { optimizationLevel: 5 }],
                [
                  "svgo",
                  {
                    plugins: [
                      {
                        name: "preset-default",
                        params: {
                          overrides: {
                            removeViewBox: false,
                            addAttributesToSVGElement: {
                              params: {
                                attributes: [
                                  { xmlns: "http://www.w3.org/2000/svg" },
                                ],
                              },
                            },
                          },
                        },
                      },
                    ],
                  },
                ],
              ],
            },
          },
        }),
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: "body",
        template: path.resolve(__dirname, "src", "index.html"),
      }),
      new MiniCssExtractPlugin({
        filename: "./css/style.[contenthash].css",
      }),
    ],
  };
};
