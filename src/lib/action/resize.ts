import { listen, noop } from "$lib/meta"

/**
 * Dispatches an event or calls a handler if an element is resized.
 * Usage: <element use:resize={{ handler: () => console.log('hello') }} />
 * For tracking <window> size it's best to use the window store from svu/client.
*/
export const resize = (node: HTMLElement, options?: { handler?: Function }) => {
    let handler = options?.handler || noop

    const handleResize = (entries: ResizeObserverEntry[]) => {
        entries.forEach(e => {
            if (e.target !== node) return
            handler()
            node.dispatchEvent(new CustomEvent('resize', { detail: e.target }))
        })
    }
    
    let observer = new ResizeObserver(handleResize);
    observer.observe(node);

    return {
        update: (options?: { handler?: Function }) => {
            handler = options?.handler || noop
        },
        destroy: () => observer.disconnect(),
    }
}