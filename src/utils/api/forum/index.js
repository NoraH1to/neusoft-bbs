import url from './url'
import { GET } from '../../customAxios'

// 获取分区板块信息
export const homeBoardList = {
    request: (options) => {
        return GET({
            url: url.homeBoardList,
            ...options,
        })
    },
}
