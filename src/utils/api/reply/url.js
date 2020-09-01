const perfix = '/reply'

const url = (value) => {
    return perfix + value
}

export default {
    // 获取对应帖子回复列表
    topicReplyList: url('/topic-reply-list'),
    // 获取用户回复列表
    userReplyList: url('/user-reply-list'),
}
