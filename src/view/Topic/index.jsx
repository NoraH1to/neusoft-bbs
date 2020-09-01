/* 主题详情 */

import React, { useEffect, useState } from 'react'
import filesize from 'filesize'

// 组件
import {
    Button,
    Typography,
    Paper,
    Link,
    Fab,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    ListItem,
    IconButton,
} from '@material-ui/core'
import ReplyList from '@component/ReplyList'
import TopicContent from '@component/TopicContent'
import UserHeader from '@component/TopicList/UserHeader'
import Action from '@component/TopicList/Action'
import { Message as MessageIcon, InsertDriveFile as InsertDriveFileIcon, MoreHoriz as MoreHorizIcon } from '@material-ui/icons'
import BraftEditor from 'braft-editor'

// 接口
import { attrMap } from '@modules/topic/template'
import { topicDetail } from '@api/topic'
import { addReply, updateReply } from '@api/reply'
import { upLoadImage, downloadAttachment } from '@api/attachment'
import { yellow } from '@material-ui/core/colors'

// dialog 过度动画
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default function (props) {
    const {
        history,
        match: {
            params: { id },
        },
    } = props

    // 帖子信息
    const [topic, setTopic] = useState({})

    // dialog 开关状态
    const [openDialog, setOpenDialog] = React.useState(false)

    // 回复贴内容
    const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null))

    // 开启回复 dialog
    const handleDialogClickOpen = () => {
        setOpenDialog(true)
    }

    // 关闭回复 dialog
    const handleDialogClose = () => {
        setOpenDialog(false)
    }

    // 请求帖子信息
    const getTopicDetail = () => {
        return topicDetail.request({
            params: {
                [attrMap.topicId.key]: id,
            },
        })
    }

    // 下载附件
    const downloadFile = (file) => {
        downloadAttachment.request({url: file.downloadUrl})
    }

    // 发布回复贴
    const requestAddReply = () => {
        addReply
            .request({
                msg: '发表回复',
                data: {
                    topicId: topic.id,
                    content: editorState.toHTML(),
                },
            })
            .then((res) => {
                handleDialogClose()
            })
            .catch((err) => {
                console.log('addReply fail', err)
            })
    }

    // 编辑器上传函数重写
    const uploadFn = (param) => {
        const successFn = (response) => {
            param.success({
                url: response.data[attachmentAttrMap.imageUrl.key],
                meta: {
                    id: null,
                    title: null,
                    alt: null,
                    loop: false, // 指定音视频是否循环播放
                    autoPlay: false, // 指定音视频是否自动播放
                    controls: true, // 指定音视频是否显示控制栏
                },
            })
        }

        const progressFn = (event) => {
            // 上传进度发生变化时调用param.progress
            param.progress((event.loaded / event.total) * 100)
        }

        const errorFn = (response) => {
            // 上传发生错误时调用param.error
            param.error({
                msg: 'unable to upload.',
            })
        }

        // 封装请求的数据
        let data = new FormData()
        // 塞入图片
        data.append('file', param.file)
        // 上传图片
        upLoadImage
            .request({
                data,
                // 上传进度，开发环境不能使用（因为 mock
                // onUploadProgress: function (progressEvent) {
                //     progressFn(progressEvent)
                // },
            })
            .then((res) => {
                successFn(res)
            })
            .catch((err) => {
                errorFn(err)
            })
    }

    // 接受的图片
    const accepts = {
        image: 'image/png,image/jpeg,image/gif',
    }

    // 富文本编辑器不需要的组件
    const excludeControls = [
        'font-size',
        'line-height',
        'letter-spacing',
        'superscript',
        'subscript',
        'text-indent',
        'text-align',
    ]

    // 更新回复贴输入内容
    const handleReplyChange = (editorState) => {
        setEditorState(editorState)
    }

    // 渲染完成自动请求帖子信息
    useEffect(() => {
        getTopicDetail()
            .then((res) => {
                setTopic(res.data)
            })
            .catch((err) => {
                console.log('getTopicDetail fail', err)
            })
    }, [])

    return (
        <div>
            {/* 帖子 */}
            <Paper>
                <div className="flex flex-col justify-start py-4 sm:py-8">
                    {/* 帖子信息 */}
                    <div className="px-4 sm:px-10 pb-4 sm:pb-6 border-0 border-b border-solid border-gray-400">
                        <div className="mb-4 break-all">
                            {/* 精华 / 置顶 */}
                            <span className="inline align-middle mr-1">
                                <div className="w-auto inline-block">
                                    {topic.type === 1 ? (
                                        <span className="inline-block px-1">
                                            <span
                                                className="inline-block px-2 py-1 text-white text-xs rounded-lg border border-solid"
                                                style={{ color: '#ffc61b', borderColor: '#ffc61b' }}
                                            >
                                                公告
                                            </span>
                                        </span>
                                    ) : (
                                        ''
                                    )}
                                    {topic.featured ? (
                                        <span className="inline-block px-1">
                                            <span
                                                className="inline-block px-2 py-1 text-white text-xs rounded-lg font-extrabold"
                                                style={{ background: '#95de64' }}
                                            >
                                                精华
                                            </span>
                                        </span>
                                    ) : (
                                        <></>
                                    )}
                                    {topic.pinned ? (
                                        <span className="inline-block px-1">
                                            <span
                                                className="inline-block px-2 py-1 text-white text-xs rounded-lg font-extrabold"
                                                style={{ background: '#ff4d4f' }}
                                            >
                                                置顶
                                            </span>
                                        </span>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </span>
                            {/* 标题 */}
                            <Typography
                                Wrap
                                variant="h5"
                                className="text-black inline align-middle"
                            >
                                {topic.title}
                            </Typography>
                        </div>
                        {/* 作者 */}
                        <div className="flex items-sterch justify-between">
                            <div>
                                <UserHeader userInfo={topic} />
                            </div>
                            <div className="flex items-center">
                                <Typography color="textSecondary" variant="caption">
                                    {topic.submitTime}
                                </Typography>
                            </div>
                        </div>
                    </div>

                    {/* 帖子内容 */}
                    <div className="px-4 sm:px-10 py-4">
                        <TopicContent rawHTML={topic.content} />
                    </div>

                    {/* 附件下载 */}
                    {topic.attachments ? (
                        topic.attachments.length > 0 ? (
                            <div className="mx-4 sm:mx-10 my-3 px-3 py-2 rounded-lg bg-gray-100">
                                <div className="mx-4 mb-2 mt-1">
                                    <Typography color="textSecondary">附件</Typography>
                                </div>
                                <div className="flex flex-row flex-wrap items-center justify-start">
                                    {topic.attachments.map((attachment) => {
                                        return (
                                            <ListItem
                                                className="flex-grow-0 flex flex-row items-center"
                                                style={{ width: 'auto', borderRadius: '8px' }}
                                                button
                                                onClick={() => downloadFile(attachment)}
                                            >
                                                <InsertDriveFileIcon
                                                    className="mr-1"
                                                    style={{ color: yellow[600] }}
                                                />
                                                {/* 文件名 */}
                                                <Typography className="pr-1">
                                                    {attachment.filename}
                                                </Typography>
                                                {/* 大小 */}
                                                <Typography variant="caption" color="textSecondary">
                                                    {filesize(attachment.fileSize)}
                                                </Typography>
                                            </ListItem>
                                        )
                                    })}
                                </div>
                            </div>
                        ) : (
                            ''
                        )
                    ) : (
                        ''
                    )}

                    {/* 最后编辑时间 */}
                    {topic.editTime ? (
                        <div className="pt-4 border-0 border-t border-solid border-gray-400 flex flex-col items-center justify-center">
                            <Typography color="textSecondary" variant="subtitle2">
                                最后编辑于
                            </Typography>
                            <Typography color="textSecondary" variant="subtitle2">
                                {topic.editTime}
                            </Typography>
                            <Link
                                variant="subtitle2"
                                onClick={() =>
                                    history.push(
                                        '/user-center/' + topic.lastReplierUserId + '/post-list'
                                    )
                                }
                            >
                                {topic.editorNickname}
                            </Link>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </Paper>

            {/* 回复列表 */}
            <div className="mt-4">
                <ReplyList
                    requestParam={{ topicId: id }}
                    Action={Action}
                    authorId={topic.submitterUserId}
                />
            </div>

            {/* 发表回复按钮 */}
            <div className="fixed right-0 bottom-0 mr-6 mb-6 z-50">
                <Fab onClick={() => handleDialogClickOpen()} color="primary">
                    <MessageIcon />
                </Fab>
            </div>
            {/* TODO: 改成快速拨号组件 */}

            {/* 回复 dialog */}
            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                fullScreen
                onClose={handleDialogClose}
            >
                <DialogTitle className="border-0 border-b border-solid border-gray-400">
                    <Typography className="px-2" noWrap color="textSecondary" variant="body1">
                        回复
                    </Typography>
                    <Typography
                        className="bg-gray-100 py-1 px-2"
                        noWrap
                        color="textSecondary"
                        variant="body1"
                    >
                        {topic.title}
                    </Typography>
                </DialogTitle>
                <DialogContent
                    className="border-0 border-b border-solid border-gray-400 h-auto"
                    style={{ padding: '0' }}
                >
                    <BraftEditor
                        className="flex flex-col items-stretch h-auto"
                        contentClassName="flex-grow"
                        controlBarClassName={{}}
                        media={{ uploadFn, accepts }}
                        excludeControls={excludeControls}
                        value={editorState}
                        onChange={handleReplyChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDialogClose()} color="default">
                        取消
                    </Button>
                    <Button onClick={() => requestAddReply()} color="primary">
                        回复
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
