import { listen, noop } from '../meta/index.js';
import type { ActionReturn } from 'svelte/action';

interface Attributes {
	'on:!clickoutside'?: (event: CustomEvent<Event>) => void;
}

type Handler = (event?: Event) => void;

/**
 * Calls `handler` when a click event occurs outside of `node`. The event is forwarded to `handler`.
 * Also dispatches a `!clickoutside` event on 'node' with the original event as `detail`.
 *
 * Example:
 * ```svelte
 * <element use:clickoutside={handler} />
 * <element use:clickoutside on:!clickoutside={handler} />
 * ```
 */
export function clickoutside(
	node: HTMLElement,
	handler: (event?: Event) => void = noop
): ActionReturn<Handler, Attributes> {
	let handle = handler;

	const handleClick: EventListener = (event: Event) => {
		if (!node.contains(event.target as Node)) {
			handle(event);
			node.dispatchEvent(new CustomEvent('!clickoutside', { detail: event }));
		}
	};

	const unlisten = listen(document, 'click', handleClick);

	return {
		update: (handler: (event?: Event) => void) => {
			handle = handler;
		},
		destroy: unlisten
	};
}
