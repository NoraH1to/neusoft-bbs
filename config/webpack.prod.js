const path = require('path')
const webpackConfigCreator = require('./webpack.common.js');
const merge = require('webpack-merge');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonCssLoader = require('./cssloader.common.js')

const config = {
    output: {
        // 生产环境用块 hash 让没修改的走浏览器缓存
        filename: 'js/[name][chunkhash].js'
    },
    module: {
        rules: [{
            test: /\.(css|scss)$/,
            include: path.resolve(__dirname, '../src'),
            use: [
                // 提取 css 样式
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: process.env.NODE_ENV === 'development',
                        reloadAll: true
                    }
                }
            ].concat(commonCssLoader)
        }]
    },
    plugins: [
        // css 压缩插件
        new optimizeCss({
            // 压缩器
            cssProcessor: require('cssnano'),
            // 自定义压缩参数
            cssProcessorOptions: {
                // 对注释的处理
                discardComments: {
                    removeAll: true
                }
            },
            // 是否打印压缩过程日志
            canPrint: true
        }),
        // 分离 css 样式插件
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[id].[contenthash].css'
        })
    ]
}

const options = {
    mode: 'production'
}

module.exports = merge(webpackConfigCreator(options), config)
