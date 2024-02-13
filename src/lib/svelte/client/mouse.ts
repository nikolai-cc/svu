import { derived, writable } from 'svelte/store';
import { browser, listen } from '../../meta/index.js';

const create = (prop: 'clientX' | 'clientY') => {
	const { subscribe, set } = writable(0);
	if (!browser) return { subscribe };
	listen(window, 'mousemove', (e: Event) => set((<MouseEvent>e)[prop]));
	return { subscribe };
};

/**
 * Svelte store that tracks the mouse x position.
 */
export const mx = create('clientX');

/**
 * Svelte store that tracks the mouse y position.
 */
export const my = create('clientY');

/**
 * Svelte store that tracks the mouse position.
 */
export const mouse = derived([mx, my], ([$mx, $my]) => ({ x: $mx, y: $my }));
