import type { Fn } from './fn.js';
import type { Timer } from './time.js';

/**
 * A function that executes the passed in function max once every interval milliseconds
 * Set leading to true to execute the function on the leading edge of the interval.
 */
export function debounce<Params extends unknown[], Return>(
	fn: Fn<Params, Return>,
	interval: number,
	leading: boolean = false
) {
	let timer: Timer | null = null;
	return (...args: Params) => {
		if (timer) {
			clearTimeout(timer);
		}
		if (leading) {
			fn(...args);
		}
		timer = setTimeout(() => {
			fn(...args);
		}, interval);
	};
}
