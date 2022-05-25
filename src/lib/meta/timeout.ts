/**
 * A convenience function that returns removeEventListener for the event we've just added.
*/
export const timeout = (handler: Function, delay: number, ...args: any[]) => {
    const timer = setTimeout(handler, delay, ...args);
    return () => clearTimeout(timer);
}