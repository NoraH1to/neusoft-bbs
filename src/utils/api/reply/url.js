const perfix = '/topic'

const url = (value) => {
    return perfix + value
}

export default {
    // 获取对应帖子回复列表
    topicReplyList: url('/topic-reply-list'),
}
