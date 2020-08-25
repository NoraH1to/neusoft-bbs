import url from './url'
import { GET } from '../../customAxios'

// 根据条件获取对应板块主题帖
export const topicList = {
    request: (options) => {
        return GET({
            url: url.boardTopicList,
            ...options,
        })
    },
}

// 获取主题帖详细信息
export const topicDetail = {
    request: (options) => {
        return GET({
            url: url.topicDetail,
            ...options,
        })
    },
}
