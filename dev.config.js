const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
    devServer: {
        // overlay: true is equivalent
        overlay: {
            errors: true,
            warnings: true,
        },
        historyApiFallback: true,
    },
    devtool: 'eval-source-map',
    // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
        ]
    }
});
