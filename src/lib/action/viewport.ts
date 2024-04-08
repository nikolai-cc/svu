import { noop } from '../meta/fn.js';

import type { Fn } from '../meta/fn.js';
import type { ActionReturn } from 'svelte/action';

interface ViewportOptions {
	root?: HTMLElement;
	rootMargin?: string;
	threshold?: number;
	handleEnter?: Fn;
	handleLeave?: Fn;
}

interface Attributes {
	'on:!viewport:enter'?: (event: CustomEvent<IntersectionObserverEntry>) => void;
	'on:!viewport:leave'?: (event: CustomEvent<IntersectionObserverEntry>) => void;
}

/**
 * Dispatches '!viewport:enter' and '!viewport:leave' events when the element enters or leaves the viewport.
 * Pass in handleEnter and handleLeave handlers to execute when the element enters or leaves the viewport.
 *
 * Optionally pass in root element, rootMargin, and threshold for the IntersectionObserver.
 * The default rootMargin is '0px' and the default threshold is 0.
 *
 * Example:
 * ```svelte
 * <element use:viewport={{ handleEnter, handleLeave }} />
 * <element use:viewport on:!viewport:enter={handleEnter} on!viewport:leave={handleLeave} />
 * <element use:viewport={{ root: document.querySelector('#root'), rootMargin: '10px', threshold: 0.5, handleEnter, handleLeave }} />
 * ```
 */
export function viewport(
	node: HTMLElement,
	options?: ViewportOptions
): ActionReturn<ViewportOptions, Attributes> {
	let root = options?.root;
	let rootMargin = options?.rootMargin ?? '0px';
	let threshold = options?.threshold ?? 0;

	let handleEnter = options?.handleEnter ?? noop;
	let handleLeave = options?.handleLeave ?? noop;

	const callback = (entries: IntersectionObserverEntry[]) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				handleEnter();
				node.dispatchEvent(new CustomEvent('!viewport:enter', { detail: entry }));
			} else {
				handleLeave();
				node.dispatchEvent(new CustomEvent('!viewport:leave', { detail: entry }));
			}
		});
	};

	let observer = new IntersectionObserver(callback, {
		root,
		rootMargin,
		threshold
	});

	observer.observe(node);

	return {
		update: (options: ViewportOptions) => {
			observer.disconnect();

			root = options.root;
			rootMargin = options.rootMargin ?? '0px';
			threshold = options.threshold ?? 0;

			handleEnter = options.handleEnter ?? noop;
			handleLeave = options.handleLeave ?? noop;

			observer = new IntersectionObserver(callback, {
				root,
				rootMargin,
				threshold
			});
		},
		destroy: () => observer.disconnect()
	};
}
