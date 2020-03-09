var path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'src')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
            }
        ]
    },

    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: './index.html',
        })
    ]

};