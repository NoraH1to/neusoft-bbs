import { every } from 'lodash'

// 是否管理员
export const isAdmin = (newState) => {
    const permissions = newState.permission
    return !every(permissions, (value) => {
        return !value
    })
}
