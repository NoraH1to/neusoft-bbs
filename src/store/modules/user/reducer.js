import { defaultObj } from './template'

// 重置
export function resetState(payload, moduleState) {
    return defaultObj
}

// 覆盖
export function setState(payload, moduleState) {
    return payload
}

// 添加板块权限信息
export function addBoardPermission(payload, moduleState) {
    return {
        boardPermission: {
            ...moduleState.boardPermission,
            ...payload
        }
    }
}
