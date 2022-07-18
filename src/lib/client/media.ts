import { mediaquery } from "../store/mediaquery.js";

/**
 * Is true if `prefers-reduced-motion` is set to `no-preference`.
 */
export const motionOK = mediaquery('prefers-reduced-motion', 'no-preference');

/**
 * Is true if `prefers-reduced-motion` is set to `reduce`.
 */
export const reduceMotion = mediaquery('prefers-reduced-motion', 'reduce');

/**
 * Is true if the page is previewed for printing.
 */
export const print = mediaquery('print');

/**
 * Is true if the page is viewed on a screen;
 */
export const screen = mediaquery('screen');

/**
 * Is true if the page is wider than it is tall;
 */
export const landscape = mediaquery('orientation', 'landscape');

/**
 * Is true if the page is taller than it is wide;
 */
 export const portrait = mediaquery('orientation', 'portrait');

/**
 * Is true if the page allows hovering;
 */
 export const hover = mediaquery('hover', 'hover');

/**
 * Is true if the client prefers a dark color scheme.
 */
export const dark = mediaquery('prefers-color-scheme', 'dark');

/**
 * Is true if the client prefers light color scheme.
 */
export const light = mediaquery('prefers-color-scheme', 'light');

/**
 * Is true if the client prefers a high contrast color scheme.
 */
export const highContrast = mediaquery('prefers-color-scheme', 'more');

/**
 * Is true if the client prefers a low contrast color scheme.
 */
 export const lowContrast = mediaquery('prefers-color-scheme', 'less');

 /**
 * Is true if the has no contrast preference.
 */
export const defaultContrast = mediaquery('prefers-color-scheme', 'no-preference');

/**
 * Is true if the client does not have a pointer available.
 */
export const noPointer = mediaquery('pointer', 'none');

/**
 * Is true if the client has a coarse pointer available.
 */
export const coarsePointer = mediaquery('pointer', 'coarse');

/**
 * Is true if the client has a fine pointer available.
 */
export const finePointer = mediaquery('pointer', 'fine');