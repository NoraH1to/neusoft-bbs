// 匹配当前同级目录所有文件
const files = require.context(
    '/',
    true,
    /* eslint-disable */
    /^[\.\/]{2}[a-zA-Z]{2,}$/
    /* eslint-able */
)

const obj = {}

// 把所有文件都引用除了该文件自身
files.keys().forEach(item => {
    /* eslint-disable */
    if (item === './index.js') return
    const name = item
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    if (name === 'index') return
    obj[name] = files(item)['default']
    /* eslint-able */
})

// 导出
export default obj
