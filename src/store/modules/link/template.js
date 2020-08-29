import { initObj2Null } from '../../../utils'

export const attrMap = {
    // 板块 ID
    id: {
        key: 'id',
        value: '编号',
    },
    // 名称
    name: {
        key: 'name',
        value: '名称',
    },
    // 描述
    description: {
        key: 'description',
        value: '描述',
    },
    // 地址
    url: {
        key: 'url',
        value: '地址',
    },
    // 图标地址
    iconUrl: {
        key: 'iconUrl',
        value: '图标地址',
    },
    // 顺序
    order: {
        key: 'order',
        value: '顺序',
    },
    // 创建时间
    createTime: {
        key: 'createTime',
        value: '创建时间',
    },
    // 更新时间
    updateTime: {
        key: 'updateTime',
        value: '更新时间',
    },
}

export const defaultObj = initObj2Null(attrMap)
