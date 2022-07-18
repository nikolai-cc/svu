import { mediaquery } from "../store/mediaquery.js";

/**
 * Is true when `prefers-reduced-motion` is set to `no-preference`.
 */
export const motionOK = mediaquery('prefers-reduced-motion', 'no-preference');

/**
 * Is true when `prefers-reduced-motion` is set to `reduce`.
 */
export const reduceMotion = mediaquery('prefers-reduced-motion', 'reduce');

/**
 * Is true when the page is (pre)viewed for printing.
 */
export const print = mediaquery('print');

/**
 * Is true when the page is viewed on a screen;
 */
export const screen = mediaquery('screen');

/**
 * Is true when the viewport is wider than it is tall;
 */
export const landscape = mediaquery('orientation', 'landscape');

/**
 * Is true when the viewport is taller than it is wide;
 */
 export const portrait = mediaquery('orientation', 'portrait');

/**
 * Is true when the client prefers a dark color scheme.
 */
export const dark = mediaquery('prefers-color-scheme', 'dark');

/**
 * Is true when the client prefers light color scheme.
 */
export const light = mediaquery('prefers-color-scheme', 'light');

/**
 * Is true when the client prefers a high contrast color scheme.
 */
export const highContrast = mediaquery('prefers-contrast', 'more');

/**
 * Is true when the client prefers a low contrast color scheme.
 */
 export const lowContrast = mediaquery('prefers-contrast', 'less');

 /**
 * Is true when the has no contrast preference.
 */
export const defaultContrast = mediaquery('prefers-contrast', 'no-preference');

/**
 * Is true when the device can display a hover state. (You can do so with a mouse, but not with a finger + touchscreen.)
 */
 export const hover = mediaquery('hover', 'hover');

/**
 * Is true when the client does not have a pointer available.
 */
export const noPointer = mediaquery('pointer', 'none');

/**
 * Is true when the client has a coarse pointer available.
 */
export const coarsePointer = mediaquery('pointer', 'coarse');

/**
 * Is true when the client has a fine pointer available.
 */
export const finePointer = mediaquery('pointer', 'fine');