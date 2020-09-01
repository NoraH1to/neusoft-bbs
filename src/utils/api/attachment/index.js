import url from './url'
import { UPLOAD } from '../../customAxios'

// 上传图片
export const upLoadImage = {
    request: (options) => {
        return UPLOAD({
            url: url.uploadImage,
            ...options,
        })
    },
}

// 上传附件
export const upLoadAttachment = {
    request: (options) => {
        return UPLOAD({
            url: url.uploadAttachment,
            ...options,
        })
    },
}

// 下载附件
export const downloadAttachment = {
    request: (options) => {
        window.open(new URL(document.URL).origin + options.url)
    }
}
