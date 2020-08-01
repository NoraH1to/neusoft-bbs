import { defaultObj } from './template'
import { sleep } from '../../../utils'

export async function init(payload, moduleState) {
    console.log('init')
    await sleep(3000)
    console.log('init finish')
}

export function resetState(payload, moduleState) {
    return defaultObj
}
