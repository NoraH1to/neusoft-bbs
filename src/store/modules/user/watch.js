export const id = {
    fn: (newVal, oldVal, fnCtx) => {
        if (newVal.id) {
            window.localStorage.setItem('user', JSON.stringify(newVal))
        } else {
            window.localStorage.removeItem('user')
        }
    },
    compare: false
}