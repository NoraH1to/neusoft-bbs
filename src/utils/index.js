import _ from 'lodash'

// sleep 实现
export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// 初始化对象属性为 null
export const initObj2Null = target => {
    return _.mapValues(target, () => {
        return null
    })
}
