module.exports = {
    entry: './index.js',
    output: {
        filename: 'test1.bundle.js',
        path: './dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    }
};