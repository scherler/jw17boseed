// webpack.config.js
const webpack = require('webpack');
const dist = 'src/main/webapp/';
require("babel-polyfill");

module.exports = {
    output: {
        filename: dist + 'js/[name].js',
        chunkFilename: dist + "js/[id].bundle.js"
    },
    entry: {
        vendor: [
            "expose-loader?React!react",
            "expose-loader?ReactDOM!react-dom",
            "expose-loader?ReactRouter!react-router",
            "expose-loader?I18next!i18next",
            "expose-loader?History!history",
            "expose-loader?Mobx!mobx",
            "expose-loader?MobxReact!mobx-react",
            "expose-loader?MobxUtils!mobx-utils",
        ],
        bo: [
            "expose-loader?DesignLanguage!@jenkins-cd/design-language",
        ],
        polyfill: 'babel-polyfill',
        index: './src/main/js/index',
        appHelper: './src/main/js/helper/appHelper',
    },
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-router": "ReactRouter",
        "mobx": "Mobx",
        "mobx-react": "MobxReact",
        "mobx-utils": "MobxUtils",
        "history": "History",
        "i18next": "I18next",
        "@jenkins-cd/design-language": "DesignLanguage",
    },
    devtool: 'eval-source-map',
    resolve: {
        extensions: [".js", ".jsx", ".less"]
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'eslint-loader',
            },
            {
                test: /\.js$|\.jsx$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.svg$/,
                use: 'svg-url-loader'
            }
        ]
    },

    // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
    plugins: [
        new webpack.EnvironmentPlugin([
          'NODE_ENV',
        ]),
    ],
    node: {
        dns: 'mock',
        net: 'mock'
    }
};
