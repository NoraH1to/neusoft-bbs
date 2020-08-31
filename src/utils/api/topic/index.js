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

// 根据条件获得对应用户主题帖
export const userTopicList = {
    request: (option) => {
        return GET({
            url: url.userTopicList,
            ...option
        })
    }
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
