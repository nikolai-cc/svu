import { clone } from '../meta/clone.js';
import { writable } from 'svelte/store';

import type { StartStopNotifier } from 'svelte/store';

/**
 * Creates a resettable Svelte store that can revert to its initial state.
 * If an object is passed, it will be cloned to prevent shared references, unless cloneDepth is set to 0.
 *
 * Example:
 * ```svelte
 * let count = resettable(0);
 *
 * <button on:click={() => $count += 1}>Increment</button>
 * <button on:click={count.reset}>Reset</button>
 * ```
 */
export function resettable<T>(value: T, start?: StartStopNotifier<T>, cloneDepth = Infinity) {
	const initial = clone(value, cloneDepth);

	const { subscribe, update, set } = writable(initial, start);
	const reset = () => set(clone(initial, cloneDepth));

	return { subscribe, update, set, reset };
}
