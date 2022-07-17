import { noop } from "$lib/meta/index.js"

/**
 * Focuses element when it mounts. Only works on focusable elements.
 * Usage: <element use:focus />
 */
export const focus = (node: HTMLElement) => {
    node && node.focus()

    return {
        update: noop,
        destroy: noop,
    }
}