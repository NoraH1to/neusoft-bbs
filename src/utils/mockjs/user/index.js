import Mock from 'mockjs'
import { requestPrefix } from '../../../config'

const mockProxy = (url, method, responseBody) => {
    return Mock.mock(requestPrefix + '/user' + url, method, responseBody)
}

export default mockProxy('/login', 'post', {
    success: true,
    msg: 'success',
    code: 200,
    data: {
        id: 1, // 用户编号
        username: 'a', // 用户名
        nickname: 'a', // 昵称
        superBoardAdmin: true, // 是否为超级版主
        admin: true, // 是否为管理员
        avatarPath: '/api/file/avatar/xxx.jpg', // 头像地址
        permission: {
            boardAdmin: false, // 管理板块
            categoryAdmin: false, // 管理分区
            superBoardAdmin: false, // 超级版主
            admin: false, // 管理员
        }
    }
})
