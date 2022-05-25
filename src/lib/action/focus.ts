import { noop } from "$lib/meta"

/**
 * Focus element when it mounts. Only works on focusable elements.
 */
export const focus = (node: HTMLElement) => {
    node && node.focus()

    return {
        update: noop,
        destroy: noop,
    }
}