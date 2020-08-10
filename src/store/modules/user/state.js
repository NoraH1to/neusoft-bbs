import { defaultObj } from './template'

// 如果浏览器中没有 user || 浏览器中 keys 长度 != 代码中的 keys 长度，则使用默认 state
let state = null
const userStr = window.localStorage.getItem('user')
if (!userStr || Object.keys(JSON.parse(userStr)).length != Object.keys(defaultObj).length) {
    state = defaultObj
} else {
    state = JSON.parse(userStr)
}

export default {
    ...state,
}
