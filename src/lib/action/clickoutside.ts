import { listen, noop } from '$lib/meta'

/**
 * Executes a function when clicking anywhere but on the target node.
 * Also dispatches the `clickoutside` event on the target node.
 * Usage: <element use:clickoutside={ handler() } />
 */
export const clickoutside = (node: HTMLElement, handler?: Function) => {
    const handleClick = (event: PointerEvent) => {
        if (node.contains(event.target as HTMLElement)) return
        handler && handler()
        node.dispatchEvent(new CustomEvent('clickoutside'));
    }
    const unlisten = listen(document, 'click', handleClick as EventListenerOrEventListenerObject)

    return {
        update: noop,
        destroy: unlisten
    }
}