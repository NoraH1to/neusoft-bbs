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
        boardAdmin: [
            // 管理的板块
            {
                id: 1, // 板块编号
                name: '板块 #1' // 板块名称
            },
            { id: 2, name: '板块 #2' }
        ],
        categoryAdmin: [
            // 管理的分区
            {
                id: 1, // 分区编号
                name: '分区 #1' // 分区名称
            },
            { id: 2, name: '分区 #2' }
        ],
        forumPermission: {
            // 论坛权限
            banVisit: false, // 禁止访问（登录）
            banCreateTopic: false, // 禁止创建主题帖
            banReply: false, // 禁止回复
            banUploadAttachment: false, // 禁止上传附件
            banDownloadAttachment: false // 禁止下载附件
        }
    }
})
