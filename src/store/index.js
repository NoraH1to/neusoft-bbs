import modules from './modules';
import {
    run
} from 'concent';
import loadingPlugin from 'concent-plugin-loading';

export default run({
    ...modules
}, {
    // 配置loading插件
    plugins: [loadingPlugin]
})
