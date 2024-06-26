import { noop } from '../meta/fn.js';
import { listen } from '../meta/event.js';
import { timeout } from '../meta/time.js';

import type { Fn } from '../meta/fn.js';
import type { ActionReturn } from 'svelte/action';

interface PressOptions {
	duration: number;
	handler?: Fn;
}

interface Attributes {
	'on:!press'?: (event: CustomEvent<number>) => void;
}

/**
 * Dispatches a press event or calls a handler if pressed down for duration milliseconds.
 *
 * Example:
 * ```svelte
 * <element use:press={ duration: 500, handler } />
 * <element use:press={ duration: 500 } on:press={handler} />
 * ```
 */
export function press(
	node: HTMLElement,
	options: PressOptions | number
): ActionReturn<PressOptions | number, Attributes> {
	let duration = typeof options === 'number' ? options : options.duration;
	let handler = typeof options === 'number' ? noop : options.handler || noop;

	const start = () => {
		function dispatch() {
			handler();
			node.dispatchEvent(new CustomEvent('!press', { detail: duration }));

			unlistenUp();
			unlistenOut();
		}

		const clear = timeout(dispatch, duration);
		const unlistenUp = listen(node, 'pointerup', clear);
		const unlistenOut = listen(node, 'pointerout', clear);
	};

	const unlisten = listen(node, 'pointerdown', start);

	return {
		update: (options: PressOptions | number) => {
			duration = typeof options === 'number' ? options : options.duration;
			handler = typeof options === 'number' ? noop : options.handler || noop;
		},
		destroy: unlisten
	};
}
