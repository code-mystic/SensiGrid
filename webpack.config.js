const path = require('path');
//const cleanWebpackPlugin = require('clean-webpack-plugin'); //clean folders

module.exports = {
    entry: './src/index.js',
    devtool: 'inline-source-map',
    devServer: {
        publicPath: "/output/",
        contentBase: path.resolve(__dirname, 'examples')
    },
    module: {
        rules: [
            {
                test: /\.js/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        //new cleanWebpackPlugin(['output/'])
    ],
    resolve: {
        modules: [path.resolve("./node_modules"), path.resolve("./src")]
    },
    output: {
        path: path.resolve(__dirname, 'output'),
        filename: 'SensiGrid.js',
        library: 'SensiGrid',
        libraryTarget: 'umd',
        umdNamedDefine: true
    }
}