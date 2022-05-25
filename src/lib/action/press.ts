import { listen, noop, timeout } from "$lib/meta"

/** 
 * Dispatches a press event or calls a handler if pressed down for duration milliseconds.
 */
export const press = (node: HTMLElement, options: {duration: number, fn?: Function} | number) => {
    let duration = typeof options === 'number' ? options : options.duration
    let fn = typeof options === 'number' ? noop : options.fn || noop

    const start = () => {
        const dispatch = () => {
            fn()
            node.dispatchEvent(new CustomEvent('press', { detail: duration }))
            
            unlistenUp();
            unlistenOut();
        }

        const clear = timeout(dispatch, duration);
        const unlistenUp = listen(node, 'pointerup', clear);
        const unlistenOut = listen(node, 'pointerout', clear);
    }

    const unlisten = listen(node, 'pointerdown', start)

    return {
        update: (options: {duration: number, fn?: Function} | number) => {
            duration = typeof options === 'number' ? options : options.duration
            fn = typeof options === 'number' ? noop : options.fn || noop
        },
        destroy: unlisten,
    }
}