// host
export const host = process.env.NODE_ENV === 'production' ? 'http://forum.frp.wegfan.cn' : ''

// prefix
export const prefix = '/api'
// const prefix = ''

// 请求前缀
export const requestPrefix = host + prefix
