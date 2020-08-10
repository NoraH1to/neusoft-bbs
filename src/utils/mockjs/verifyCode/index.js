import Mock from 'mockjs'
import { requestPrefix } from '../../../config'
import apiUrl from '../../api/verifycode/url'
import { attrMap } from '../../../store/modules/verifyCode/template'

const mockProxy = (url, method, responseBody) => {
    return Mock.mock(requestPrefix + url, method, responseBody)
}

export default mockProxy(apiUrl.getVerifyCode, 'get', {
    success: true,
    msg: 'success',
    code: 200,
    data: {
        [attrMap.url.key]:
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1320441599,4127074888&fm=26&gp=0.jpg', // 图片url
        [attrMap.verifyCodeRandom.key]: 'adEADOAaqd', // 随机字符串，用于区分不同页面的验证码，提交时带上
    },
})
