import { initObj2Null } from '../../../utils'

export const attrMap = {
    // 板块 ID
    id: {
        key: 'id',
        value: '编号',
    },
    // 所属分区 ID
    categoryId: {
        key: 'categoryId',
        value: '分区编号',
    },
    // 板块名称
    name: {
        key: 'name',
        value: '名称',
    },
    // 板块描述
    description: {
        key: 'description',
        value: '描述',
    },
    // 是否可见
    visible: {
        key: 'visible',
        value: '是否可见',
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
    // 删除时间
    deleteTime: {
        key: 'deleteTime',
        value: '删除时间',
    },
}

export const defaultObj = initObj2Null(attrMap)
