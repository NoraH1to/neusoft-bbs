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
    DialogContentText,
    Slide,
    ListItem,
    Backdrop,
    CircularProgress,
} from '@material-ui/core'
import ReplyList from '@component/ReplyList'
import TopicContent from '@component/TopicContent'
import UserHeader from '@component/TopicList/UserHeader'
import Action from '@component/TopicList/Action'
import {
    Message as MessageIcon,
    InsertDriveFile as InsertDriveFileIcon,
    MoreHoriz as MoreHorizIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@material-ui/icons'
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab'
import BraftEditor from 'braft-editor'

// 接口
import { attrMap } from '@modules/topic/template'
import { topicDetail, deleteTopic } from '@api/topic'
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
    const [openDialog, setOpenDialog] = useState(false)

    // 回复贴内容
    const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null))

    // fab 开关
    const [openFab, setOpenFab] = useState(false)

    // 确认删除开关
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)

    // 各种操作中
    const [requestIng, setRequestIng] = useState(false)

    // 开启确认删除
    const handleDeleteClickOpen = () => {
        setOpenDeleteConfirm(true)
    }

    // 关闭确认删除
    const handleDeleteClose = () => {
        setOpenDeleteConfirm(false)
    }

    // 开启 fabs
    const handleFabOpen = () => {
        setOpenFab(true)
    }

    // 关闭 fabs
    const handleFabClose = () => {
        setOpenFab(false)
    }

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

    // 删除帖子
    const requestDeleteTopic = () => {
        setRequestIng(true)
        deleteTopic
            .request({
                data: {
                    id,
                },
            })
            .then((res) => {
                // 回到帖子板块
                history.push('/board/' + topic.boardId)
            })
            .catch((err) => {
                console.log('deleteTopic fail', err)
            })
            .finally(() => {
                setRequestIng(false)
            })
    }

    // 下载附件
    const downloadFile = (file) => {
        downloadAttachment.request({ url: file.downloadUrl })
    }

    // 发布回复贴
    const requestAddReply = () => {
        setRequestIng(true)
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
            .finally(() => {
                setRequestIng(false)
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
            <Backdrop style={{ zIndex: 49 }} open={openFab || requestIng}>
                {requestIng ? <CircularProgress /> : ''}
            </Backdrop>
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
                            {/* 最后编辑时间 */}
                            <Typography color="textSecondary" variant="subtitle2">
                                {topic.editTime}
                            </Typography>
                            {/* 最后编辑用户名称 */}
                            <Link
                                className="cursor-pointer"
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

            {/* 按钮组 */}
            <div className="fixed right-0 bottom-0 mr-6 mb-6 z-50">
                <SpeedDial
                    key="fabs"
                    ariaLabel="SpeedDial tooltip example"
                    hidden={false}
                    icon={<SpeedDialIcon />}
                    onClose={handleFabClose}
                    onOpen={handleFabOpen}
                    open={openFab}
                >
                    {/* 删除按钮 */}
                    <SpeedDialAction
                        key={'delete'}
                        icon={<DeleteIcon style={{ color: '#ff2222' }} />}
                        tooltipTitle={<Typography style={{ color: '#ff2222' }}>删除</Typography>}
                        tooltipOpen
                        onClick={() => {
                            handleFabClose()
                            handleDeleteClickOpen()
                        }}
                    />
                    {/* 编辑按钮 */}
                    <SpeedDialAction
                        key={'edit'}
                        icon={<EditIcon />}
                        tooltipTitle={'编辑'}
                        tooltipOpen
                        onClick={() => {
                            handleFabClose()
                            history.push('/edit-topic/?topicId=' + id)
                        }}
                    />
                    {/* 发表回复按钮 */}
                    <SpeedDialAction
                        key={'reply'}
                        icon={<MessageIcon />}
                        tooltipTitle={<Typography>回复</Typography>}
                        tooltipOpen
                        onClick={() => {
                            handleFabClose()
                            handleDialogClickOpen()
                        }}
                    />
                </SpeedDial>
            </div>

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

            {/* 确认删除 dialog */}
            <Dialog open={openDeleteConfirm} onClose={handleDeleteClose}>
                <DialogTitle>{'确定删除该主题帖？'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>该操作无法撤回</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose} color="default">
                        再想想
                    </Button>
                    <Button
                        onClick={() => {
                            handleDeleteClose()
                            requestDeleteTopic()
                        }}
                        color="secondary"
                    >
                        删除
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
