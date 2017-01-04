var path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader",
                exclude: /node_modules/
            },
            {
                test: /\.json/,
                loader: "json-loader",
                exclude: /node_modules/
            }
        ]
    }
};