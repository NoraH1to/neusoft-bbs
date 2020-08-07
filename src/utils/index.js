import _ from 'lodash'

// sleep 实现
export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// 根据映射字典获得默认 state
export const attrMap2DefaultState = target => initObj2Null(key2RealKey(selectModuleFromAttrMap(target)))

// 初始化对象属性为 null
export const initObj2Null = target => {
    return _.mapValues(target, () => {
        return null
    })
}

// 把 key 转换成与后端相同
export const key2RealKey = target => {
    return _.invertBy(target, value => {
        return value.key
    })
}

// 从映射字典中找出 module 的属性
export const selectModuleFromAttrMap = target => {
    return _.pickBy(target, obj => {
        return obj.module
    })
}
