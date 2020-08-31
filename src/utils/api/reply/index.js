import url from './url'
import { GET } from '../../customAxios'

// 根据条件获取对应板块主题帖
export const topicReplyList = {
    request: (options) => {
        return GET({
            url: url.topicReplyList,
            ...options,
        })
    },
}
