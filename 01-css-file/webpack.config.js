const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('styles.css');
const extractScss = new ExtractTextPlugin('stylesScss.css');
const extractLess = new ExtractTextPlugin('stylesLess.css');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

const common = {
    entry: {
        app: PATHS.app
    },
    resolve: {
        extensions: [' ', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader?limit=8192&name=[name].[ext]&outputPath=imgs/' 
                }]
            } 
        ]
    }
}

if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        module: {
            rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
            ]
        },
        devServer: {
            contentBase: PATHS.build,
            historyApiFallback: true,
            hot: true,
            inline: true,
            stats: 'errors-only',
            host: process.env.HOST,
            port: 8001
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });

}

if (TARGET === 'build') {
    module.exports = merge(common, {
        module: {
            rules: [{
                test: /\.css$/,
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.scss$/,
                use: extractScss.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.less$/,
                use: extractLess.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            }

            ]
        },
        plugins: [
            extractCSS,
            extractScss,
            extractLess
        ]
    });
}