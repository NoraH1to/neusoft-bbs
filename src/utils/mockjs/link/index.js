import Mock from 'mockjs'
import { requestPrefix } from '../../../config'
import apiUrl from '@api/link/url'
import { attrMap } from '@modules/link/template'

const mockProxy = (url, method, responseBody) => {
    return Mock.mock(requestPrefix + url, method, responseBody)
}

mockProxy(apiUrl.linkList, 'get', {
    success: true,
    msg: 'success',
    code: 200,
    'data|6-12': [
        {
            [attrMap.id.key + '|+1']: 1, // 分区编号
            [attrMap.name.key]: '@string(2, 8)', // 分区名称
            [attrMap.description.key]: '@string(5, 15)', // 分区描述
            [attrMap.url.key]: '@string(10, 20)', // 链接
            [attrMap.iconUrl.key]: '@string(10, 20)', // 图标链接
            [attrMap.order.key + '|+1']: 1, // 顺序
            [attrMap.createTime.key]: '@datetime("yyyy-MM-dd HH:mm:ss")', // 创建时间
            [attrMap.updateTime.key]: '@datetime("yyyy-MM-dd HH:mm:ss")', // 更新时间
        },
    ],
})
