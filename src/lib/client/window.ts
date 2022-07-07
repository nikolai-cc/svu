import { browser } from '$app/env';
import { derived, writable } from 'svelte/store';
import { listen } from '$lib/meta';

const createSize = (prop: 'innerWidth' | 'innerHeight') => {
    const { subscribe, set } = writable(0);
    if (!browser) return { subscribe };
    set(window[prop])
    listen(window, 'resize', () => set(window[prop]));
    return { subscribe }
}

/**
 * Svelte store that tracks the window width.
 */
export const ww = createSize('innerWidth');

/**
 * Svelte store that tracks the window height.
 */
export const wh = createSize('innerHeight');

/**
 * Svelte store that tracks the window size.
 */
export const windowSize = derived([ww, wh], ([$ww, $wh]) => ({ w: $ww, h: $wh }));

const createScroll = () => {
    const { subscribe, set } = writable({ x: 0, y: 0 });
    if (!browser) return { subscribe };
    set({ x: window.scrollX, y: window.scrollY })
    listen(window, 'scroll', () => set({ x: window.scrollX, y: window.scrollY }));
    return { subscribe }
}

/**
 * Svelte store that tracks the scroll position.
 */
export const scroll = createScroll();