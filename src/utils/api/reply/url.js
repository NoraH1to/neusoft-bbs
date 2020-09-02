const perfix = '/reply'

const url = (value) => {
    return perfix + value
}

export default {
    // 获取对应帖子回复列表
    topicReplyList: url('/topic-reply-list'),
    // 获取用户回复列表
    userReplyList: url('/user-reply-list'),
    // 发表回复贴
    addReply: url('/add-reply'),
    // 编辑回复贴
    updateReply: url('/update-reply'),
    // 删除回复贴
    deleteReply: url('/delete-reply'),
    // 回复贴详细信息
    replyDetail: url('/reply-detail'),
}
