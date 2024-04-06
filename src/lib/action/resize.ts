import { noop, type Fn } from '../meta/index.js';
import type { ActionReturn } from 'svelte/action';

interface Attributes {
	'on:!resize'?: (event: CustomEvent<HTMLElement>) => void;
}

/**
 * Dispatches an event or calls a handler if an element is resized.
 * Usage: <element use:resize={{ handler: () => console.log('hello') }} />
 * For tracking <window> size it's best to use the window store from svu/client.
 */
export function resize(node: HTMLElement, handler: Fn = noop): ActionReturn<Fn, Attributes> {
	let handle = handler;

	function handleResize(entries: ResizeObserverEntry[]) {
		entries.forEach((e) => {
			if (e.target !== node) return;
			handle();
			node.dispatchEvent(new CustomEvent('!resize', { detail: e.target }));
		});
	}

	const observer = new ResizeObserver(handleResize);
	observer.observe(node);

	return {
		update: (handler: Fn = noop) => {
			handle = handler;
		},
		destroy: () => observer.disconnect()
	};
}
