import { attrMap2DefaultState } from '../../../utils'

export const attrMap = {
    // 用户 ID
    id: {
        key: 'id',
        value: '用户编号',
        module: true,
    },
    // 用户名
    username: {
        key: 'username',
        value: '用户名',
        module: true,
    },
    // 昵称
    nickname: {
        key: 'nickname',
        value: '昵称',
        module: true,
    },
    // 密码
    password: {
        key: 'password',
        value: '密码',
    },
    // 邮箱
    email: {
        key: 'email',
        value: '邮箱',
        module: true,
    },
    // 头像 url
    avatarPath: {
        key: 'avatarPath',
        value: '头像URL',
        module: true,
    },
    // 权限
    forumPermission: {
        key: 'permission',
        value: '权限',
        module: true,
    },
    // 当前板块权限
    currentBoardPermission: {
        key: 'currentBoardPermission',
        value: '板块权限',
        module: true,
    },
    // 性别
    sex: {
        key: 'sex',
        value: '性别',
        module: true,
    },
    // 个人签名
    signature: {
        key: 'signature',
        value: '个人签名',
        module: true,
    },
    // 板块权限
    boardPermission: {
        key: 'boardPermission',
        value: '板块权限',
        module: true,
    },
}

export const defaultObj = attrMap2DefaultState(attrMap)
