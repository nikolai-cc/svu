import { listen, noop } from '$lib/meta/index.js';

/**
 * Executes an optional fuction on the onclose event, and displays an 'are you sure' modal.
 * Pass in a condition to only execute when that condition is met.
 * Usage: <element use:onclose={{ handler, condition }} />
 */
export const onclose = (_node: HTMLElement, options: {handler?: Function, condition?: boolean} = {}) => {
    let handler = options.handler
    let condition = options.condition ?? true
    
    const confirm = (e: BeforeUnloadEvent) => {
        if (!condition) return
        handler && handler(e);
        e.preventDefault()
        return e.returnValue = "Are you sure you want to close this window?"
    }

    let unlisten = listen(window, 'beforeunload', confirm) || noop;

    return {
        update: (options: {handler?: Function, condition?: boolean} = {}) => {
            handler = options.handler
            condition = options.condition ?? true
        },
        destroy: () => unlisten()
    }
}