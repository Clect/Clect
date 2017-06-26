const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        './react/index.js'],
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: "css-loader"
        }, {
            test: /\.js?$/,
            exclude: /node_modules|dist/,
            loader: 'babel-loader?presets[]=es2015&presets[]=react',
        }]
    }
};
