const path = require('path')
const webpackConfigCreator = require('./webpack.common.js');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonCssLoader = require('./cssloader.common.js')

const config = {
    output: {
        // 开发环境用 hash 保证全部都是最新的
        filename: 'js/[name][hash].js'
    },
    devtool: 'inline-source-map',
    devServer: {
        port: 3000,
        // 热重载
        hot: true,
        // 直接在页面显示错误信息
        overlay: true,
        // 支持 history
        historyApiFallback: true
    },
    module: {
        rules: [{
            test: /\.(css|scss)$/,
            include: path.resolve(__dirname, '../src'),
            use: [
                'style-loader',
            ].concat(commonCssLoader)
        }]
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
