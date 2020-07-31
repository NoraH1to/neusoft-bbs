import { user } from './template'

const sleep = ms => new Promise((resolve) => setTimeout(resolve, ms));

export async function init(payload, moduleState) {
    console.log('init')
    await sleep(3000)
    console.log('init finish')
}

export function resetState(payload, moduleState) {
    return user
}
