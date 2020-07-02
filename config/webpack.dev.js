const webpackConfigCreator = require('./webpack.common.js');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    output: {
        // 开发环境用 hash 保证全部都是最新的
        filename: 'js/[name][hash].js'
    },
    devtool: 'inline-source-map',
    devServer: {
        port: 3000,
        hot: true,
        // 直接在页面显示错误信息
        overlay: true
    },
    plugins: [
        // 分离 css 样式插件
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[id].[hash].css'
        })
    ]
}

const options = {
    mode: 'development'
}

module.exports = merge(webpackConfigCreator(options), config);
