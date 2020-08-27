const perfix = '/link'

const url = (value) => {
    return perfix + value
}

export default {
    // 获取分区板块信息
    linkList: url('/link-list'),
}
