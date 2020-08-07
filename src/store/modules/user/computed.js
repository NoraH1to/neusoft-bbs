// 是否登入
export const hasLogin = newState => {
    return !!newState.id
}

// 没有登录
export const noLogin = newState => {
    return !newState.id
}

// 禁止访问
export const canVisit = ({ forumPermission }, old, ctx) => {
    return forumPermission ? !forumPermission.banVisit : false
}

// 禁止发帖
export const canCreateTopic = ({ forumPermission }) => {
    return forumPermission ? !forumPermission.banCreateTopic : false
}

// 禁止回复
export const canReply = ({ forumPermission }) => {
    return forumPermission ? !forumPermission.banReply : false
}

// 禁止上传附件
export const canUploadAttachment = ({ forumPermission }) => {
    return forumPermission ? !forumPermission.banUploadAttachment : false
}

// 禁止下载附件
export const canDownloadAttachment = ({ forumPermission }) => {
    return forumPermission ? !forumPermission.banDownloadAttachment : false
}
