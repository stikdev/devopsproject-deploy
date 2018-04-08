// Adapted from http://www.rricard.me/es6/aws/lambda/nodejs/2015/11/29/es6-on-aws-lambda.html

var fs = require("fs");
var path = require("path");
var webpack = require("webpack");

module.exports = {
  // Use all of the .js files in the root of src/ for the entry points.
  entry: fs.readdirSync(path.join(__dirname, "./src"))
    .filter(filename => /\.js$/.test(filename))
    .map(filename => {
      var entry = {};
      entry[filename.replace(".js", "")] = path.join(
        __dirname,
        "./src/",
        filename
      );
      return entry;
    })
    .reduce((finalObject, entry) => Object.assign(finalObject, entry), {}),

  // Output single files in the dist/ directory, targeting Node-specific code.
  target: "node",
  output: {
    path: path.join(__dirname, "dist"),
    library: "[name]",
    libraryTarget: "commonjs2",
    filename: "[name].js"
  },

  plugins: [
  ],

  // Transpile to ES2015 since that's what is supported in Lambda's NodeJS.
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
