/** Logging utilities */

import { dev } from '$app/env'

/**
 * A set of wrapper functions that only logs to the console when SvelteKit is in development mode.
 * Supports all console.* functions (log, trace, warn, error, etc.)
*/
export const log = (...args: any): void => { dev && console.log([...args]) }
export const trace = (...args: any): void => { dev && console.trace([...args]) }
export const debug = (...args: any): void => { dev && console.debug([...args]) }
export const info = (...args: any): void => { dev && console.info([...args]) }
export const warn = (...args: any): void => { dev && console.warn([...args]) }
export const error = (...args: any): void => { dev && console.error([...args]) }
export const assert = (value: any, ...args: any): void => { dev && console.assert(value, [...args]) }
export const count = (label?: string): void => { dev && console.count(label) }
export const countReset = (label?: string): void => { dev && console.countReset(label) }
export const dir = (item?: any, options?: any): void => { dev && console.dir(item, options) }
export const dirxml = (...data: any): void => { dev && console.dirxml([...data]) }