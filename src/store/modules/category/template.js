import { initObj2Null } from '../../../utils'

export const attrMap = {
    // 分区 ID
    id: {
        key: 'id',
        value: '编号',
    },
    // 分区名称
    name: {
        key: 'name',
        value: '名称',
    },
    // 分区描述
    description: {
        key: 'description',
        value: '描述',
    },
    // 是否可见
    visible: {
        value: '是否可见',
    },
    // 顺序
    order: {
        value: '顺序',
    },
    // 创建时间
    createTime: {
        value: '创建时间',
    },
    // 更新时间
    updateTime: {
        value: '更新时间',
    },
    // 删除时间
    deleteTime: {
        value: '删除时间',
    },
    // 板块列表
    boardList: {
        key: 'boardList',
        value: '板块列表',
    },
}

export const defaultObj = initObj2Null(attrMap)
