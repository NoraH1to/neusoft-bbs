import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getState } from 'concent'

// 组件
import {
    Button,
    Typography,
    Link,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@material-ui/core'
import EditReply from '@component/EditReply'
import UserHeader from '@component/TopicList/UserHeader'
import TopicContent from '@component/TopicContent'

// 接口
import { deleteReply } from '@api/reply'

export default (props) => {
    const { reply, authorId, isAdmin } = props
    const history = useHistory()

    // 确认删除开关
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)

    // dialog 开关状态
    const [openDialog, setOpenDialog] = useState(false)

    // 开启回复 dialog
    const handleDialogClickOpen = () => {
        setOpenDialog(true)
    }

    // 关闭回复 dialog
    const handleDialogClose = () => {
        setOpenDialog(false)
    }

    // 开启确认删除
    const handleDeleteClickOpen = () => {
        setOpenDeleteConfirm(true)
    }

    // 关闭确认删除
    const handleDeleteClose = () => {
        setOpenDeleteConfirm(false)
    }

    // 删除回复贴
    const requestDeleteReply = () => {
        deleteReply
            .request({
                msg: '删除',
                data: {
                    id: reply.id,
                },
            })
            .then((res) => {})
            .catch((err) => {
                console.log('deleteReply fail', err)
            })
    }

    // 标签基础样式
    const tagStyle = {
        dispaly: 'inline-block',
        padding: '2px 6px',
        fontWeight: '600',
        borderRadius: '5px',
        fontSize: '14px',
        color: '#fff',
    }

    // 楼主标签
    const TagAnno = (
        <div
            style={{
                ...tagStyle,
                color: '#1976d2',
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: '#1976d2',
            }}
        >
            楼主
        </div>
    )

    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                {/* 用户个人中心查看的时候隐藏 */}
                {reply.shortContent ? (
                    ''
                ) : (
                    <>
                        {/* 用户信息 */}
                        <div className="flex-shrink-0">
                            <UserHeader
                                userInfo={{
                                    submitterUserId: reply.replierUserId,
                                    submitterNickname: reply.replierNickname,
                                    submitterAvatarPath: reply.replierAvatarPath,
                                }}
                            />
                        </div>
                        {/* 楼主标签 */}
                        {authorId && !reply.shortContent ? (
                            authorId == reply.replierUserId ? (
                                <div className="ml-2 flex-shrink-0">{TagAnno}</div>
                            ) : (
                                ''
                            )
                        ) : (
                            ''
                        )}
                        <div className="flex-grow mr-2"></div>
                    </>
                )}
            </div>

            {/* 回复内容 */}
            {reply.shortContent ? (
                // 短内容
                <>
                    <div className="my-1">
                        <Typography variant="subtitle1" noWrap>
                            {reply.shortContent}
                        </Typography>
                    </div>
                    <div className="mt-1 py-2 px-4 bg-gray-200">
                        {/* 主题帖用户 link */}
                        <Link
                            className="cursor-pointer"
                            onClick={() =>
                                history.push('/user-center/' + reply.submitterUserId + '/post-list')
                            }
                        >
                            {reply.submitterNickname}:
                        </Link>
                        {/* 主题帖标题 */}
                        <Typography
                            onClick={() => history.push('/topic/' + reply.topicId)}
                            noWrap
                            className="mt-1 cursor-pointer hover:text-blue-400"
                            variant="h6"
                            color="textSecondary"
                        >
                            {reply.topicTitle}
                        </Typography>
                    </div>
                </>
            ) : (
                // 全部内容富文本显示
                <div className="mt-4">
                    <TopicContent rawHTML={reply.content} />
                </div>
            )}

            {/* 时间和操作按钮 */}
            <div className="flex flex-row justify-between items-center mt-2">
                {/* 回复时间 */}
                <div className="flex flex-col justify-center">
                    <Typography noWrap variant="caption" color="textSecondary">
                        {reply.replyTime}
                    </Typography>
                </div>

                {/* 自己的回复显示操作按钮，管理员也行 */}
                {getState('user').id ? (
                    getState('user').id == reply.replierUserId || isAdmin ? (
                        <div className="ml-2">
                            <Button onClick={() => handleDialogClickOpen()} color="primary">
                                编辑
                            </Button>
                            <Button onClick={() => handleDeleteClickOpen()} color="secondary">
                                删除
                            </Button>
                        </div>
                    ) : (
                        ''
                    )
                ) : (
                    ''
                )}
            </div>

            {/* 编辑回复 dialog */}
            {openDialog ? (
                <EditReply
                    openDialog={openDialog}
                    handleDialogClose={handleDialogClose}
                    replyId={reply.id}
                    topicTitle={reply.topicTitle}
                />
            ) : (
                ''
            )}

            {/* 确认删除 dialog */}
            <Dialog open={openDeleteConfirm} onClose={handleDeleteClose}>
                <DialogTitle>{'确定删除该回复帖？'}</DialogTitle>
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
                            requestDeleteReply()
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
