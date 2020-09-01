import { initObj2Null } from '../../../utils'

export const attrMap = {
    // 主题 ID
    id: {
        key: 'id',
        value: '编号',
    },
    topicId: {
        key: 'topicId',
        value: '编号',
    },
    // 只看楼主
    submitterOnly: {
        key: 'submitterOnly',
        value: '只看楼主',
        selectMap: {
            [true]: {
                key: true,
                value: '只看楼主',
            },
            [false]: {
                key: false,
                value: '全部',
            },
        },
    },
    // 排序方式
    sort: {
        key: 'sort',
        value: '排序方式',
        selectMap: {
            normal: {
                key: 'normal',
                value: '时间升序',
            },
            reversed: {
                key: 'reversed',
                value: '时间降序',
            },
        },
    },
    // 页码
    page: {
        key: 'page',
        value: '页码',
    },
    // 每页数量
    count: {
        key: 'count',
        value: '每页数量',
    },
}

export const defaultObj = initObj2Null(attrMap)
