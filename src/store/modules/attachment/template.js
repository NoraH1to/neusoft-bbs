import { initObj2Null } from '../../../utils'

export const attrMap = {
    // 附件 ID
    id: {
        key: 'id',
        value: '附件编号',
    },
    // 文件名
    filename: {
        key: 'filename',
        value: '文件名',
    },
    // 文件大小（字节
    fileSize: {
        key: 'fileSize',
        value: '文件大小',
    },
    // 描述
    description: {
        key: 'description',
        value: '描述',
    },
    // 下载地址
    downloadUrl: {
        key: 'downloadUrl',
        value: '下载地址',
    },
    // 下载次数
    downloadCount: {
        key: 'downloadCount',
        value: '下载次数',
    },
    // 上传时间
    uploadTime: {
        key: 'uploadTime',
        value: '上传时间',
    },
}

export const defaultObj = initObj2Null(attrMap)
