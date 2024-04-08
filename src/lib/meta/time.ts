import type { Fn } from './fn.js';

/**
 * Set a timeout to execute a function. Returns a function that clears the timeout.
 */
export function timeout(handler: Fn, delay_ms: number, ...args: unknown[]) {
	const timer = setTimeout(handler, delay_ms, ...args);
	return () => clearTimeout(timer);
}

/**
 * Lets you asynchronously wait for a given time.
 */
export function wait(delay_ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, delay_ms));
}
