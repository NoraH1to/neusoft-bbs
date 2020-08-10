import Mock from 'mockjs'
import { requestPrefix } from '../../../config'
import apiUrl from '../../api/user/url'
import { attrMap } from '../../../store/modules/user/template'

const mockProxy = (url, method, responseBody) => {
    return Mock.mock(requestPrefix + url, method, responseBody)
}

export default mockProxy(apiUrl.login, 'post', {
    success: true,
    msg: 'success',
    code: 200,
    data: {
        [attrMap.id.key]: 1, // 用户编号
        [attrMap.username.key]: 'a', // 用户名
        [attrMap.nickname.key]: 'a', // 昵称
        [attrMap.avatarPath.key]: '/api/file/avatar/xxx.jpg', // 头像地址
        [attrMap.forumPermission.key]: {
            boardAdmin: false, // 管理板块
            categoryAdmin: false, // 管理分区
            superBoardAdmin: false, // 超级版主
            admin: false, // 管理员
        },
    },
})
