/**
 * Adds an event listener and returns a function that removes it.
 *
 * Usage:
 * ```ts
 * const unlisten = listen(window, 'resize', () => console.log('resized'));
 * // Later (e.g. in destroy phase):
 * unlisten();
 * ```
 */
export const listen = (
	node: EventTarget,
	type: string,
	listener: EventListenerOrEventListenerObject,
	options?: boolean | EventListenerOptions
) => {
	node.addEventListener(type, listener, options);
	return () => node.removeEventListener(type, listener, options);
};
