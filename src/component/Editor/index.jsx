import React, { useState } from 'react'

import { Fab, Paper, TextField, Divider, Button, Chip } from '@material-ui/core'
import { Send as SendIcon } from '@material-ui/icons'

import { upLoadImage, upLoadAttachment } from '@api/attachment'
import { attrMap as attachmentAttrMap } from '@modules/attachment/template'
import { attrMap as topicAttrMap } from '@modules/topic/template'

import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import DOMPurify from 'dompurify'

export default (props) => {
    // 富文本编辑对象
    const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null))

    // 富文本 ref
    const [editorInstance, setEditorInstance] = useState(null)

    // 更新输入内容
    const handleChange = (editorState) => {
        setEditorState(editorState)
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
        // data.append('test0', 'test1')
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

    // 上传附件
    const uploadFile = (e) => {
        let data = new FormData()
        data.append('file', e.target.files[0])
        upLoadAttachment
            .request({
                data,
                msg: '上传',
            })
            .then((res) => {
                setFileList((oldList) => oldList.concat([res.data]))
            })
            .catch((err) => {
                console.log('uploadAttachment fail', err)
            })
    }

    // 接受的图片
    const accepts = {
        image: 'image/png,image/jpeg,image/gif',
    }

    // 不需要的组件
    const excludeControls = [
        'font-size',
        'line-height',
        'letter-spacing',
        'superscript',
        'subscript',
        'text-indent',
        'text-align',
    ]

    // 附件列表
    const [fileList, setFileList] = useState([])

    // 监听删除附件
    const handleDelete = (chipToDelete) => () => {
        setFileList((fileList) =>
            fileList.filter(
                (file) => file[attachmentAttrMap.id.key] !== chipToDelete[attachmentAttrMap.id.key]
            )
        )
    }
    console.log('filelist', fileList)

    // 附件列表
    const FileGroup =
        fileList.length > 0 ? (
            <div className="flex flex-wrap content-around items-center">
                {fileList.map((fileTarget) => (
                    <Chip
                        className="mt-3 mr-2"
                        key={fileTarget[attachmentAttrMap.id.key]}
                        label={fileTarget[attachmentAttrMap.downloadUrl.key].split('/').pop()}
                        onDelete={handleDelete(fileTarget)}
                    />
                ))}
            </div>
        ) : undefined

    return (
        <Paper>
            {/* 标题 */}
            <TextField className="w-full" label={[topicAttrMap.title.value]} variant="filled" />
            {/* 内容 */}
            <BraftEditor
                media={{ uploadFn, accepts }}
                excludeControls={excludeControls}
                style={{ height: '100%' }}
                contentStyle={{ height: '32rem' }}
                ref={(instance) => setEditorInstance(instance)}
                value={editorState}
                onChange={handleChange}
            />
            <Divider />
            {/* 附件 */}
            <div className="p-4">
                {/* 上传按钮 */}
                <input
                    accept="*"
                    style={{ display: 'none' }}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(e) => {
                        uploadFile(e)
                    }}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                        上传附件
                    </Button>
                </label>
                {/* 附件列表 */}
                {FileGroup}
            </div>
            {/* 发布按钮 */}
            <div className="fixed right-0 bottom-0 m-6">
                <Fab color="primary">
                    <SendIcon />
                </Fab>
            </div>
        </Paper>
    )
}
