<<<<<<< HEAD
import { listen, noop } from '../meta';
=======
import { noop } from '$lib/meta/index.js';
>>>>>>> 43a2b44386f095009ed548cbc86c5283b604b0fd

/**
 * Dispatches an event or calls a handler if an element is resized.
 * Usage: <element use:resize={{ handler: () => console.log('hello') }} />
 * For tracking <window> size it's best to use the window store from svu/client.
 */
<<<<<<< HEAD
export const resize = (node: HTMLElement, options?: { handler?: Function }) => {
=======
export const resize = (node: HTMLElement, options?: { handler?: (...params: any) => any }) => {
>>>>>>> 43a2b44386f095009ed548cbc86c5283b604b0fd
	let handler = options?.handler || noop;

	const handleResize = (entries: ResizeObserverEntry[]) => {
		entries.forEach((e) => {
			if (e.target !== node) return;
			handler();
			node.dispatchEvent(new CustomEvent('resize', { detail: e.target }));
		});
	};

<<<<<<< HEAD
	let observer = new ResizeObserver(handleResize);
	observer.observe(node);

	return {
		update: (options?: { handler?: Function }) => {
=======
	const observer = new ResizeObserver(handleResize);
	observer.observe(node);

	return {
		update: (options?: { handler?: (...params: any) => any }) => {
>>>>>>> 43a2b44386f095009ed548cbc86c5283b604b0fd
			handler = options?.handler || noop;
		},
		destroy: () => observer.disconnect()
	};
};
