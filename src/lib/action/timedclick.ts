import { noop } from '../meta/fn.js';
import { listen } from '../meta/event.js';
import { timeout } from '../meta/time.js';

import type { Fn } from '../meta/fn.js';
import type { ActionReturn } from 'svelte/action';

interface TimedClickOptions {
	duration: number;
	delay: number;
	handler?: Fn;
}

interface Attributes {
	'on:!timedclick'?: (event: CustomEvent<{ delay: number; duration: number }>) => void;
	'on:!timedclick:armed'?: (event: CustomEvent<{ delay: number; duration: number }>) => void;
	'on:!timedclick:aborted'?: (event: CustomEvent<{ delay: number; duration: number }>) => void;
}

/**
 * Dispatches an event or calls a handler if released within 'duration' milliseconds.
 * Starts checking after optional 'delay' milliseconds.
 *
 * Example:
 * ```svelte
 * <element use:timedclick={{ duration: 500, delay: 100, handler }} />
 * <element use:timedclick={500} on:!timedclick={handler} />
 * ```
 */
export function timedclick(
	node: HTMLElement,
	options: TimedClickOptions | number
): ActionReturn<TimedClickOptions | number, Attributes> {
	let duration = typeof options === 'number' ? options : options.duration;
	let delay = typeof options === 'number' ? 0 : options.delay || 0;
	let fn = typeof options === 'number' ? noop : options.handler || noop;

	function start() {
		function dispatch() {
			fn();
			node.dispatchEvent(new CustomEvent('!timedclick', { detail: { delay, duration } }));

			unlistenUp();
			unlistenOut();
			clearAbort();
		}

		function abort() {
			node.dispatchEvent(new CustomEvent('!timedclick:aborted', { detail: { delay, duration } }));
			unlistenUp();
			unlistenOut();
			clearCheck();
			clearAbort();
		}

		function check() {
			node.dispatchEvent(new CustomEvent('!timedclick:armed', { detail: { delay, duration } }));
			unlistenUp();
			unlistenOut();
			unlistenUp = listen(node, 'pointerup', dispatch);
		}

		const clearCheck = timeout(check, delay);
		const clearAbort = timeout(abort, delay + duration);

		let unlistenUp = listen(node, 'pointerup', abort);
		const unlistenOut = listen(node, 'pointerout', abort);
	}

	const unlisten = listen(node, 'pointerdown', start);

	return {
		update: (options: TimedClickOptions | number) => {
			duration = typeof options === 'number' ? options : options.duration;
			delay = typeof options === 'number' ? 0 : options.delay || 0;
			fn = typeof options === 'number' ? noop : options.handler || noop;
		},
		destroy: unlisten
	};
}
