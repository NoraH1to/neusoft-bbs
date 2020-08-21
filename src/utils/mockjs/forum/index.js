import Mock from 'mockjs'
import { requestPrefix } from '../../../config'
import apiUrl from '../../api/forum/url'
import { attrMap } from '../../../store/modules/user/template'

const mockProxy = (url, method, responseBody) => {
    return Mock.mock(requestPrefix + url, method, responseBody)
}

mockProxy(apiUrl.homeBoardList, 'get', {
    success: true,
    msg: 'success',
    code: 200,
    'data|6-12': [
        {
            'id|+1': 1, // 分区编号
            name: '@string(2, 8)', // 分区名称
            description: '@string(5, 15)', // 分区描述
            'boardList|2-10': [
                // 板块列表
                {
                    'id|+1': 1, // 板块编号
                    name: '@string(2, 8)', // 板块名称
                    description: '@string(5, 15)', // 板块描述
                },
            ],
        },
    ],
})
