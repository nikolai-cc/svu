/**
 * Function that caches the results of the passed function to prevent double (expensive) computations.
 */
export const memoize = (fn: Function) => {
    let cache: any = {};
    return ((...args: any[]) => {
        const key = JSON.stringify(args);
        if (cache[key]) { return cache[key] }
        return cache[key] = fn(...args);
    }) as any;
}