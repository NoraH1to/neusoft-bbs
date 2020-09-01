import url from './url'
import { GET } from '../../customAxios'

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
            ...options
        })
    }
}
