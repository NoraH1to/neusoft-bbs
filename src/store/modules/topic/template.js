import { initObj2Null } from '../../../utils'

export const attrMap = {
    // 主题 ID
    id: {
        key: 'id',
        value: '编号',
    },
    topicId: {
        key: 'topicId',
        value: '编号',
    },
    // 所在 category id
    categoryId: {
        key: 'catrgoryId',
        value: '分区编号',
    },
    // 分区名称
    categoryName: {
        key: 'categoryName',
        value: '分区名称',
    },
    // 所在 board id
    boardId: {
        key: 'boardId',
        value: '板块编号',
    },
    // 板块名称
    boardName: {
        key: 'boardName',
        value: '板块名称',
    },
    // 主题类型
    type: {
        key: 'type',
        value: '类型',
        selectMap: {
            normal: {
                key: 'normal',
                value: '普通',
                useAble: true,
            },
            all: {
                key: 'all',
                value: '全部',
                useAble: true,
            },
            featured: {
                key: 'featured',
                value: '精华',
                useAble: true,
            },
            pinned: {
                key: 'pinned',
                value: '置顶',
            },
            announcement: {
                key: 'announcement',
                value: '公告',
            },
        },
    },
    // 标题
    title: {
        key: 'title',
        value: '标题',
    },
    // 内容
    content: {
        key: 'content',
        value: '内容',
    },
    // 发布时间
    submitTime: {
        key: 'submitTime',
        value: '发布时间',
    },
    // 发布作者 ID
    submitterUserId: {
        key: 'submitterUserId',
        value: '作者编号',
    },
    // 发帖人昵称
    submitterNickname: {
        key: 'submitterNickname',
        value: '昵称',
    },
    // 发帖人头像
    submitterAvatarPath: {
        key: 'submitterAvatarPath',
        value: '发帖人头像',
    },
    // 浏览次数
    viewCount: {
        key: 'viewCount',
        value: '浏览次数',
    },
    // 回复数
    replyCount: {
        key: 'replyCount',
        value: '回复数',
    },
    // 最后回复时间
    lastReplyTime: {
        key: 'lastReplyTime',
        value: '最后回复时间',
    },
    // 最后回复用户 ID
    lastReplierUserId: {
        key: 'lastReplierUserId',
        value: '最后回复用户编号',
    },
    // 最后回复用户昵称
    lastReplierNickname: {
        key: 'lastReplierNickname',
        value: '最后回复用户昵称',
    },
    // 是否置顶
    pinned: {
        key: 'pinned',
        value: '置顶',
    },
    // 是否精华
    featured: {
        key: 'featured',
        value: '精华',
    },
    announcement: {
        key: 'announcement',
        value: '公告',
        selectMap: {
            0: {
                key: 0,
                value: '普通',
            },
            1: {
                key: 1,
                value: '公告',
            },
        },
    },
    // 最后编辑时间
    editTime: {
        key: 'editTime',
        value: '最后编辑时间',
    },
    // 最后编辑用户 ID
    editorUserId: {
        key: 'editorUserId',
        value: '最后编辑用户编号',
    },
    // 最后编辑者昵称
    editorNickname: {
        key: 'editorNickname',
        value: '最后编辑用户昵称',
    },
    // 删除时间
    deleteTime: {
        key: 'deleteTime',
        value: '删除时间',
    },
    // 排序方式
    sort: {
        key: 'sort',
        value: '排序方式',
        selectMap: {
            replyTime: {
                key: 'replyTime',
                value: '最后回复时间',
            },
            submitTime: {
                key: 'submitTime',
                value: '发帖时间',
            },
            viewCount: {
                key: 'viewCount',
                value: '浏览次数',
            },
            replyCount: {
                key: 'replyCount',
                value: '回复数',
            },
        },
    },
    // 页码
    page: {
        key: 'page',
        value: '页码',
    },
    // 每页数量
    count: {
        key: 'count',
        value: '每页数量',
    },
    // 短内容（预览内容
    shortContent: {
        key: 'shortContent',
        value: '短内容',
    },
    // 预览图片
    images: {
        key: 'images',
        value: '预览图',
    },
    // 附件
    attachments: {
        key: 'attachments',
        value: '附件',
    },
}

export const defaultObj = initObj2Null(attrMap)
