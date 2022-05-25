import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { listen } from '$lib/meta';

const create = () => {
    const { subscribe, set } = writable({ x: 0, y: 0 });
    if (!browser) return { subscribe };
    listen(window, 'mousemove', (e: Event) => set({ x: (<MouseEvent>e).clientX, y: (<MouseEvent>e).clientY }));
    return { subscribe }
}

/**
 * Svelte store that tracks the mouse position.
 */
export const mouse = create();