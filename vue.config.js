const { ModuleFederationPlugin } = require("webpack").container;
// const { VueLoaderPlugin } = require("vue-loader");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const { defineConfig } = require("@vue/cli-service");
const { DefinePlugin } = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "http://localhost:8084/",
  chainWebpack: (config) => {
    config.optimization.delete("splitChunks");
  },
  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: 'VueApp',
        filename: "remoteEntry.js",
        exposes: {
          "./component": "./src/loader.js",
        },
        shared: {
          vue: {
            singleton: true,
            eager: true,
          },
        },
      }),
      new DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
      }),
    ],
  },
});

// module.exports = {
//   output: {
//     publicPath: "http://localhost:8084/",
//   },

//   resolve: {
//     extensions: [".vue", ".jsx", ".js", ".json"],
//   },

//   devServer: {
//     port: 8084,
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
//       "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
//     }
//   },

//   module: {
//     rules: [
//       {
//         test: /\.vue$/,
//         loader: "vue-loader",
//       },
//       {
//         test: /\.s[a|c]ss$/i,
//         use: ["style-loader", "css-loader", "sass-loader"],
//       },
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//         },
//       },
//     ],
//   },

//   plugins: [
//     new VueLoaderPlugin(),
//     new ModuleFederationPlugin({
//       name: "@tt-not-found",
//       filename: "remoteEntry.js",
//       remotes: {},
//       exposes: {
//         "./component": "./src/App",
//       },
//       shared: require("./package.json").dependencies,
//     }),
//   ],
// };