/** Returns true in browser, false when prerendering / running in node. */
export const browser = typeof window !== 'undefined' && window.document;
