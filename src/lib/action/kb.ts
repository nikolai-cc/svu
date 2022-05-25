import { listen, noop } from '$lib/meta'

export type keyMap = { [key: string]: Function }

/**
 * Svelte action to execute functions on keydown. Usage: <element use:keydown={{ 'Enter': handler() }} />
 * TODO: allow modifiers
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
 * Svelte action to execute functions on keyup. Usage: <element use:keydown={{ 'Enter': handler() }} />
 * TODO: allow modifiers
 */
export const keyup = (node: HTMLElement, keys: keyMap) => { 
    const execute = (e: KeyboardEvent) => { keys[e.key]?.(e) }
    const unlisten = listen(node, 'keyup', execute as EventListener)

    return {
        update: noop,
        destroy: unlisten
    }
}