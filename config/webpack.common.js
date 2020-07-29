const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function webpackCommonConfigCreator(options) {
    return {
        resolve: {
            alias: {
                'react-dom': '@hot-loader/react-dom',
            },
            extensions: [".js", ".jsx", ".json"]
        },
        mode: options.mode,
        // 入口文件
        entry: './src/index.js',
        output: {
            // 输出目录
            path: path.resolve(__dirname, '../dist'),
            // 公共路径
            publicPath: '/'
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                maxSize: 1000 * 100,
                minSize: 1000 * 50,
                minChunks: 1
            }
        },
        module: {
            rules: [{
                    test: /\.(js|jsx)$/,
                    include: path.resolve(__dirname, '../src'),
                    use: [
                        'babel-loader'
                    ]
                },
                {
                    test: /\.(css|scss)$/,
                    use: [ // css 加载器
                        process.env.NODE_ENV === 'development' ? 'style-loader' : {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    mode: 'local',
                                    localIdentName: '[local]'
                                },
                                localsConvention: 'camelCase'
                            }
                        },
                        // 处理 css 的 loader
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: loader => [
                                    // 支持 @import
                                    require('postcss-import'),
                                    // tialwindcss
                                    require('tailwindcss'),
                                    // 自动给 css3 样式添加前缀
                                    require('autoprefixer')
                                    ({
                                        // 设定指定的兼容浏览器
                                        'overrideBrowserslist': [
                                            'defaults',
                                            'not ie < 11',
                                            'last 2 versions',
                                            '> 1%',
                                            'iOS 7',
                                            'last 3 iOS versions'
                                        ]
                                    })
                                ]
                            }
                        },
                        // sass 加载器
                        'sass-loader'
                    ]
                },
                {
                    // 用文件加载器处理字体读取
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: ['file-loader']
                }, {
                    // 用 url-loader 处理图片（实现了 file-loader 但不依赖它）
                    test: /\.(jpg|png|svg|gif|ico)$/,
                    use: [{
                        loader: 'url-loader',
                        // 大小大于 30kb 才转换成文件
                        options: {
                            limit: 1024 * 30,
                            name: 'images/[hash].[ext]',
                            publicPath: '/'
                        }
                    }]
                }
            ]
        },
        plugins: [
            // html 生成插件
            new HtmlWebpackPlugin({
                // 自定义 html 模板
                template: path.resolve(__dirname, '../public/index.html'),
                // 网页图标
                favicon: './assets/favicon.ico'
            })
        ]
    }
}

module.exports = webpackCommonConfigCreator;
