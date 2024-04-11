/** Logging utilities */

import { dev } from '../meta/env.js';

/**
 * A set of wrapper functions that only logs to the console when SvelteKit is in development mode.
 * Supports all console.* functions (log, trace, warn, error, etc.)
 */
export function log<T>(...args: T[]): void {
	dev && console.log(...args);
}
export function trace<T>(...args: T[]): void {
	dev && console.trace(...args);
}
export function debug<T>(...args: T[]): void {
	dev && console.debug(...args);
}
export function info<T>(...args: T[]): void {
	dev && console.info(...args);
}
export function warn<T>(...args: T[]): void {
	dev && console.warn(...args);
}
export function error<T>(...args: T[]): void {
	dev && console.error(...args);
}
export function assert<T>(value: boolean, ...args: T[]): void {
	dev && console.assert(value, ...args);
}
export function count(label?: string): void {
	dev && console.count(label);
}
export function countReset(label?: string): void {
	dev && console.countReset(label);
}
export function dir<T>(item?: T, options?: unknown): void {
	dev && console.dir(item, options);
}
export function dirxml<T>(...data: T[]): void {
	dev && console.dirxml(...data);
}

export function clear(): void {
	dev && console.clear();
}
