import { listen, noop } from '$lib/meta'

export type keyMap = { [key: string]: Function }

/**
 * Executes functions on keydown. Pass in a map of key names to functions.
 * TODO: allow modifiers
 * Usage: <element use:keydown={{ 'Enter': handler() }} />
 */
export const keydown = (node: HTMLElement, keys: keyMap) => {
    const execute = (e: KeyboardEvent) => { keys[e.key]?.(e) }
    const unlisten = listen(node, 'keydown', execute as EventListener)
    
    return {
        update: noop,
        destroy: unlisten
    }
}

/**
 * Executes functions on keyup. Pass in a map of key names to functions.
 * TODO: allow modifiers
 * Usage: <element use:keydown={{ 'Enter': handler() }} />
 */
export const keyup = (node: HTMLElement, keys: keyMap) => { 
    const execute = (e: KeyboardEvent) => { keys[e.key]?.(e) }
    const unlisten = listen(node, 'keyup', execute as EventListener)

    return {
        update: noop,
        destroy: unlisten
    }
}