/**
 * A port of the Python range function. Returns an array from min to max, inclusive.
 * You can optionally provide a step size. When you provide a single parameter, it will return a range from 0 to max.
 */
 export const range = (start: number, end: number, step: number = 1) => {
    start = end ? start : 0
    end = end ? end : start
    return Array(Math.ceil((end - start) / step)).fill(0).map((_, i) => start + (i * step));
}