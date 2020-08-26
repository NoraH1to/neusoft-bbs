import Mock, { Random } from 'mockjs'
import { requestPrefix } from '../../../config'
import apiUrl from '../../api/topic/url'
import { attrMap } from '../../../store/modules/topic/template'
import { attrMap as attachmentAttrMap } from '../../../store/modules/attachment/template'

const mockProxy = (url, method, responseBody) => {
    return Mock.mock(requestPrefix + url, method, responseBody)
}

// 板块帖子列表
mockProxy(apiUrl.boardTopicList, 'get', {
    success: true,
    msg: 'success',
    code: 200,
    data: {
        'content|6-12': [ // 内容
            {
                [attrMap.id.key + '|+1']: 1, // 编号
                [attrMap.type.key + '|1']: [0, 1], // 类型
                [attrMap.title.key]: '@string(5, 15)', // 标题
                [attrMap.shortContent.key]: '@string(50, 100)', // 预览内容
                [attrMap.submitTime.key]: '@datetime("yyyy-MM-dd HH:mm:ss")', // 发帖时间
                [attrMap.submitterUserId.key + '|+1']: 1, // 发帖人 ID
                [attrMap.submitterNickname.key]: '@string(5, 15)', // 发帖人昵称
                [attrMap.submitterAvatarPath.key]: Random.image(
                    '100x100',
                    Random.hex(),
                    Random.hex(),
                    Random.string(4, 12)
                ), // 发帖人头像
                [attrMap.viewCount.key + '|0-500']: 500, // 浏览次数
                [attrMap.replyCount.key + '|0-100']: 100, // 回复次数
                [attrMap.lastReplyTime.key]: '@datetime("yyyy-MM-dd HH:mm:ss")', // 最后回复时间
                [attrMap.lastReplierUserId.key + '|+1']: 1, // 最后回复用户 ID
                [attrMap.lastReplierNickname.key]: '@string(5, 15)', // 最后回复用户昵称
                [attrMap.pinned.key + '|1-2']: true, // 是否置顶
                [attrMap.featured.key + '|1-2']: false, // 是否精华
                [attrMap.images.key + '|1-3']: [
                    Random.image('150x100', Random.hex(), Random.hex(), '预览图'),
                ], // 预览图
            },
        ],
        'currentPage|+1': 1, // 当前页码
        pageSize: 10, // 每页数量大小
        totalPages: 4, // 总页数
        totalRecords: Random.integer(31, 40), // 总数量
        'hasPrevious|+1': [false, true, true, true], // 是否有上一页
        'hasNext|+1': [true, true, true, false], // 是否有下一页
    }
})

// 帖子详细信息
mockProxy(apiUrl.topicDetail, 'get', {
    success: true,
    msg: 'success',
    code: 200,
    data: {
        [attrMap.id.key + '|+1']: 1, // 编号
        [attrMap.type.key + '|1']: [0, 1], // 类型
        [attrMap.title.key]: '@string(5, 15)', // 标题
        [attrMap.content.key]: '@string(500, 2000)', // 内容
        [attrMap.submitTime.key]: '@datetime("yyyy-MM-dd HH:mm:ss")', // 发帖时间
        [attrMap.submitterUserId.key + '|+1']: 1, // 发帖人 ID
        [attrMap.submitterNickname.key]: '@string(5, 15)', // 发帖人昵称
        [attrMap.submitterAvatarPath.key]: Random.image(
            '100x100',
            Random.hex(),
            Random.hex(),
            Random.string(4, 12)
        ), // 发帖人头像

        [attrMap.boardId.key + '|1']: Random.range(1, 20), // 板块编号
        [attrMap.boardName.key]: '@string(3, 8)', // 板块名称

        [attrMap.categoryId.key + '|1']: Random.range(1, 20), // 分区编号
        [attrMap.categoryName.key]: '@string(3, 8)', // 分区名称

        [attrMap.viewCount.key + '|0-500']: 500, // 浏览次数
        [attrMap.replyCount.key + '|0-100']: 100, // 回复次数
        [attrMap.lastReplyTime.key]: '@datetime("yyyy-MM-dd HH:mm:ss")', // 最后回复时间
        [attrMap.lastReplierUserId.key + '|+1']: 1, // 最后回复用户 ID
        [attrMap.lastReplierNickname.key]: '@string(5, 15)', // 最后回复用户昵称
        [attrMap.pinned.key + '|1-2']: true, // 是否置顶
        [attrMap.featured.key + '|1-2']: false, // 是否精华
        [attrMap.editTime.key]: '@datetime("yyyy-MM-dd HH:mm:ss")', // 最后编辑时间
        [attrMap.editorUserId.key + '|1']: Random.range(1, 500), // 最后编辑者 ID
        [attrMap.editorNickname.key]: '@string(5, 15)', // 最后编辑者名称
        [attrMap.attachments.key + '|0-6']: [
            // 附件列表
            {
                [attachmentAttrMap.id.key + '|+1']: 1, // 附件 ID
                [attachmentAttrMap.filename.key]: '@string(5, 15)', // 文件名
                [attachmentAttrMap.fileSize.key]: Random.integer(500, 200000), // 文件大小
                [attachmentAttrMap.description.key]: '@string(5, 20)', // 描述
                [attachmentAttrMap.downloadUrl.key]: '@string(10, 20)', // 下载链接
                [attachmentAttrMap.downloadCount.key]: Random.integer(0, 5000), // 下载次数
                [attachmentAttrMap.uploadTime.key]: '@datetime("yyyy-MM-dd HH:mm:ss")', // 上传时间
            },
        ],
    },
})
