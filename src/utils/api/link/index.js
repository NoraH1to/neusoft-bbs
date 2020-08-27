import url from './url'
import { GET } from '../../customAxios'

// 获得友情链接
export const linkList = {
    request: (options) => {
        return GET({
            url: url.linkList,
            ...options,
        })
    },
}
