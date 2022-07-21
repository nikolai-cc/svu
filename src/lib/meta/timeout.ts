/**
 * A convenience function that returns removeEventListener for the event we've just added.
*/
export const timeout = (handler: (...params: any) => any, delay: number, ...args: any[]) => {
    const timer = setTimeout(handler, delay, ...args);
    return () => clearTimeout(timer);
}