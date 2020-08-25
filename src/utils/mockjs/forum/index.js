import Mock from 'mockjs'
import { requestPrefix } from '../../../config'
import apiUrl from '../../api/forum/url'
import { attrMap as categoryAttrMap } from '../../../store/modules/category/template'
import { attrMap as boardAttrMap } from '../../../store/modules/board/template'

const mockProxy = (url, method, responseBody) => {
    return Mock.mock(requestPrefix + url, method, responseBody)
}

mockProxy(apiUrl.homeBoardList, 'get', {
    success: true,
    msg: 'success',
    code: 200,
    'data|6-12': [
        {
            [categoryAttrMap.id.key + '|+1']: 1, // 分区编号
            [categoryAttrMap.name.key]: '@string(2, 8)', // 分区名称
            [categoryAttrMap.description.key]: '@string(5, 15)', // 分区描述
            [categoryAttrMap.boardList.key + '|2-10']: [
                // 板块列表
                {
                    [boardAttrMap.id.key + '|+1']: 1, // 板块编号
                    [boardAttrMap.name.key]: '@string(2, 8)', // 板块名称
                    [boardAttrMap.description.key]: '@string(5, 15)', // 板块描述
                },
            ],
        },
    ],
})
