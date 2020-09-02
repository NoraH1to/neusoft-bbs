import React, { useState, useEffect } from 'react'

import {
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Slide,
} from '@material-ui/core'
import BraftEditor from 'braft-editor'

import { addReply, updateReply, replyDetail } from '@api/reply'

// dialog 过度动画
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default (props) => {
    // dialog 开关状态
    const { openDialog, handleDialogClose, replyId, topicId, topicTitle } = props
    // 回复贴内容
    const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null))

    // 如果为编辑，获取详细信息覆盖
    useEffect(() => {
        if (replyId) {
            replyDetail
                .request({
                    params: {
                        replyId,
                    },
                })
                .then((res) => {
                    setEditorState(BraftEditor.createEditorState(res.data.content))
                })
                .catch((err) => {
                    console.log('requestReplyDetail fail', err)
                })
        }
    }, [])

    // 发布回复贴
    const requestReply = () => {
        // setRequestIng(true)
        const replyApi = replyId ? updateReply : addReply
        replyApi
            .request({
                msg: '回复',
                data: {
                    topicId,
                    replyId,
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
                // setRequestIng(false)
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

    return (
        <Dialog
            open={openDialog}
            TransitionComponent={Transition}
            fullScreen
            onClose={handleDialogClose}
        >
            <DialogTitle className="border-0 border-b border-solid border-gray-400">
                <Typography className="px-2" noWrap color="textSecondary" variant="body1">
                    {replyId ? '编辑' : ''}回复
                </Typography>
                <Typography
                    className="bg-gray-100 py-1 px-2"
                    noWrap
                    color="textSecondary"
                    variant="body1"
                >
                    {topicTitle}
                </Typography>
            </DialogTitle>
            <DialogContent className="border-0 border-b border-solid border-gray-400 h-auto">
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
                <Button onClick={() => requestReply()} color="primary">
                    回复
                </Button>
            </DialogActions>
        </Dialog>
    )
}
