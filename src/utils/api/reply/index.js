import url from './url'
import { GET, POST } from '../../customAxios'

// 获取某帖子的回复列表
export const topicReplyList = {
    request: (options) => {
        return GET({
            url: url.topicReplyList,
            ...options,
        })
    },
}

// 获取用户回复列表
export const userReplyList = {
    request: (options) => {
        return GET({
            url: url.userReplyList,
            ...options,
        })
    },
}

// 发表回复贴
export const addReply = {
    request: (options) => {
        return POST({
            url: url.addReply,
            ...options,
        })
    },
}

// 编辑回复贴
export const updateReply = {
    request: (options) => {
        return POST({
            url: url.updateReply,
            ...options,
        })
    },
}

// 删除回复贴
export const deleteReply = {
    request: (options) => {
        return POST({
            url: url.deleteReply,
            ...options,
        })
    },
}

// 回复贴详细信息
export const replyDetail = {
    request: (options) => {
        return GET({
            url: url.replyDetail,
            ...options,
        })
    },
}
