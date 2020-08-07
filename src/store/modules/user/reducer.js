import { defaultObj } from './template'

// 重置
export function resetState(payload, moduleState) {
    return defaultObj
}

// 覆盖
export function setState(payload, moduleState) {
    return payload
}
