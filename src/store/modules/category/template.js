import { initObj2Null } from '../../../utils'

export const attrMap = {
    // 分区 ID
    id: {
        value: '编号'
    },
    // 分区名称
    name: {
        value: '名称'
    },
    // 分区描述
    description: {
        value: '描述'
    },
    // 是否可见
    visible: {
        value: '是否可见'
    },
    // 顺序
    order: {
        value: '顺序'
    },
    // 创建时间
    createTime: {
        value: '创建时间'
    },
    // 更新时间
    updateTime: {
        value: '更新时间'
    },
    // 删除时间
    deleteTime: {
        value: '删除时间'
    }
}

export const defaultObj = initObj2Null(attrMap)
