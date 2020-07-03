module.exports = [
    // css 加载器
    {
        loader: 'css-loader',
        options: {
            // importLoaders: 2,
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
                require('postcss-import')({
                    root: loader.resourcePath
                }),
                // 自动给 css3 样式添加前缀
                require('autoprefixer')({
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
