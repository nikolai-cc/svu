import { listen, noop } from '$lib/meta';

/**
 * Executes an optional fuction on the onclose event, and displays an 'are you sure' modal. Pass in a condition to only execute when that condition is met.
 */
export const onclose = (_node: HTMLElement, options: {fn?: Function, condition?: boolean} = {}) => {
    let fn = options.fn
    let condition = options.condition ?? true
    
    const confirm = (e: BeforeUnloadEvent) => {
        if (!condition) return
        fn && fn(e);
        e.preventDefault()
        return e.returnValue = "Are you sure you want to close this window?"
    }

    let unlisten = listen(window, 'beforeunload', confirm) || noop;

    return {
        update: (options: {fn?: Function, condition?: boolean} = {}) => {
            fn = options.fn
            condition = options.condition ?? true
        },
        destroy: () => unlisten()
    }
}