const perfix = '/attachment'

const url = (value) => {
    return perfix + value
}

export default {
    // 上传图片
    uploadImage: url('/upload-image'),
    // 上传附件
    uploadAttachment: url('/upload-attachment'),
}
