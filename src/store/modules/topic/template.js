import { initObj2Null } from '../../../utils'

export const attrMap = {
    // 主题 ID
    id: {
        value: '编号',
    },
    // 所在 category id
    categoryId: {
        value: '分区编号',
    },
    // 所在 board id
    boardId: {
        value: '板块编号',
    },
    // 主题类型
    type: {
        value: '类型',
    },
    // 标题
    title: {
        value: '标题',
    },
    // 内容
    content: {
        value: '内容',
    },
    // 发布时间
    submitTime: {
        value: '发布时间',
    },
    // 发布作者 ID
    submitUserId: {
        value: '作者编号',
    },
    // 浏览次数
    viewCount: {
        value: '浏览次数',
    },
    // 回复数
    replyCount: {
        value: '回复数',
    },
    // 最后回复时间
    lastReplyTime: {
        value: '最后回复时间',
    },
    // 最后回复用户 ID
    lastReplierUserId: {
        value: '最后回复用户编号',
    },
    // 是否置顶
    painned: {
        value: '置顶',
    },
    // 是否精华
    featured: {
        value: '精华',
    },
    // 最后编辑时间
    editTime: {
        value: '最后编辑时间',
    },
    // 最后编辑用户 ID
    editorUserId: {
        value: '最后编辑用户编号',
    },
    // 删除时间
    deleteTime: {
        value: '删除时间',
    },
}

export const defaultObj = initObj2Null(attrMap)
