// host
const host = process.env.NODE_ENV === 'production' ? 'https://relics.wegfan.cn' : ''

// prefix
const prefix = '/api/v1'
// const prefix = ''

// 请求前缀
const requestPrefix = host + prefix

export default {
    host,
    prefix,
    requestPrefix
}
