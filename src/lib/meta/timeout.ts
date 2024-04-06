import type { Fn } from './fn.js';

/**
 * Set a timeout to execute a function. Returns a function that clears the timeout.
 */
export function timeout(handler: Fn, delay: number, ...args: unknown[]) {
	const timer = setTimeout(handler, delay, ...args);
	return () => clearTimeout(timer);
}
