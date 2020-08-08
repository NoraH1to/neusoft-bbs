import { attrMap } from './template'
import { every } from 'lodash'

const hasPermission = (state, permission) =>
    state[attrMap.currentBoardPermission.key] ? !state[attrMap.currentBoardPermission.key][permission] : false

// 是否登入
export const hasLogin = ({ id }) => {
    return !!id
}

// 没有登录
export const noLogin = ({ id }) => {
    return !id
}

// 是否管理员
export const isAdmin = newState => {
    const permissions = newState[attrMap.forumPermission.key]
    return !every(permissions, value => {
        return !value
    })
}

// 禁止访问
export const canVisit = newState => {
    return hasPermission(newState, 'banVisit')
}

// 禁止发帖
export const canCreateTopic = newState => {
    return hasPermission(newState, 'banCreateTopic')
}

// 禁止回复
export const canReply = newState => {
    return hasPermission(newState, 'banReply')
}

// 禁止上传附件
export const canUploadAttachment = newState => {
    return hasPermission(newState, 'banUploadAttachment')
}

// 禁止下载附件
export const canDownloadAttachment = newState => {
    return hasPermission(newState, 'banDownloadAttachment')
}
