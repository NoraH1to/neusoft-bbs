const perfix = '/forum'

const url = (value) => {
    return perfix + value
}

export default {
    // 获取分区板块信息
    homeBoardList: url('/home-board-list'),
}
