import Mock, { Random } from 'mockjs'
import { requestPrefix } from '../../../config'
import apiUrl from '../../api/attachment/url'
import { attrMap } from '@modules/attachment/template'

const mockProxy = (url, method, responseBody) => {
    return Mock.mock(requestPrefix + url, method, responseBody)
}

// 上传图片
mockProxy(apiUrl.uploadImage, 'post', {
    success: true,
    msg: 'success',
    code: 200,
    data: {
        [attrMap.imageUrl.key]: Random.image('150x100', Random.hex(), Random.hex(), '预览图'), // 图片链接
    },
})

// 上传附件
mockProxy(apiUrl.uploadAttachment, 'post', {
    success: true,
    msg: 'success',
    code: 200,
    data: {
        [attrMap.id.key]: Random.image('150x100', Random.hex(), Random.hex(), '预览图'), // 附件编号
        [attrMap.downloadUrl.key]: '@string(10, 20)', // 下载链接
    },
})
