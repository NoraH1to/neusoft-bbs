import { initObj2Null } from '../../../utils'

export const attrMap = {
    // 用户 ID
    id: {
        value: '用户编号'
    },
    // 用户名
    username: {
        value: '用户名'
    },
    // 昵称
    nickname: {
        value: '昵称'
    },
    // 是否为超级版主
    superBoardAdmin: {
        value: '超级版主权限'
    },
    // 是否为管理员
    admin: {
        value: '管理员权限'
    },
    // 头像 url
    avatarPath: {
        value: '头像URL'
    },
    // 性别
    sex: {
        value: '性别'
    },
    // 个人签名
    signature: {
        value: '个人签名'
    }
}

export const defaultObj = initObj2Null(attrMap)
