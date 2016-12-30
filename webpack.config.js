module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'nuwe-timeline.js',
        path: './dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
                include: __dirname
            }
        ]
    }
};