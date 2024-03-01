const path = require( 'path' );
module.exports = {
    context: __dirname,

    entry: {
        index: './js/index.js',
        editor: './js/editor.js',
        firebase: './js/firebase.js',
        blog: './js/blog.js'
    },

    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
            }
        ]
    },
    plugins: []
};