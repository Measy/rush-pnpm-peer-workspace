const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const rushLib = require("@microsoft/rush-lib");
const rushConfiguration = rushLib.RushConfiguration.loadFromDefaultLocation();

const pageName = require(path.resolve(process.cwd(), "./package.json")).name;
const relativePath =
  rushConfiguration.projectsByName.get(pageName)._projectRelativeFolder;
process.env.relativePath = relativePath;

const base = {
  mode: "development",
  devtool: "source-map",
  entry: {
    main: "./src/index.tsx",
  },
  output: {
    // path: path.resolve(process.cwd(), './output'),
    path: path.resolve(process.cwd(), "./dist"),
    filename: "[name].[contenthash:5].js",
    libraryTarget: "umd",
    globalObject: "window",
    publicPath:
      process.env.NODE_ENV === "production"
        ? `{{ CDN_DOMAIN }}ceshiaa/${relativePath}`
        : "/",
  },
  cache: {
    type: "filesystem",
  },
  experiments: {
    syncWebAssembly: true,
    topLevelAwait: true,
    asyncWebAssembly: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(process.cwd(), "./"),
    },
  },
  optimization: {
    runtimeChunk: true,
    moduleIds: "natural",
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: "vendor",
          chunks: "initial",
          priority: -10,
        },
        common: {
          test: /\.js$/,
          chunks: "initial",
          name: "common",
          minChunks: 2,
          priority: -20,
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          sourceMap: true,
          compress: {
            pure_funcs: ["console.log"],
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: { loader: "worker-loader", options: { inline: "fallback" } },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /^((?!\.module).)*css$|^((?!\.module).)*less$/,
        use: [
          process.env.NODE_ENV === "production"
            ? {
                loader: MiniCssExtractPlugin.loader,
              }
            : {
                loader: "style-loader", // creates style nodes from JS strings
              },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "less-loader",
          },
        ],
      },
      {
        test: /\.module\.css$|\.module\.less$/,
        use: [
          process.env.NODE_ENV === "production"
            ? {
                loader: MiniCssExtractPlugin.loader,
              }
            : {
                loader: "style-loader", // creates style nodes from JS strings
              },
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              modules: {
                localIdentName: "[local]_[hash:base64:5]",
              },
            },
          },
          {
            loader: "less-loader",
          },
        ],
      },
      {
        test: /\.(woff|woff2|otf|ttf|eot)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[path][name][ext]",
        },
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/[hash:8].[name][ext]",
        },
      },
    ],
  },
  plugins: [
    process.env.NODE_ENV === "production"
      ? null
      : new WebpackBuildNotifierPlugin({
          title: "🍊Build Over！！！",
          suppressSuccess: true,
        }),
    process.env.NODE_ENV === "production" ? null : new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      title: pageName,
      template: path.resolve(
        __dirname,
        process.env.NODE_ENV === "production"
          ? "./template.nunjucks.html"
          : "./template.html"
      ),
    }),
    process.env.NODE_ENV === "production" ? new MiniCssExtractPlugin() : null,
    new webpack.SourceMapDevToolPlugin({
      test: "js",
      filename: "[file].map",
    }),
  ].filter(Boolean),
};

if (process.env.NODE_ENV === "development") {
  base.devServer = {
    hot: true,
    open: true,
    historyApiFallback: true,
    host: "0.0.0.0",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    transportMode: "ws",
  };
}

module.exports = base;
