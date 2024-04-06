import { listen, noop, type Fn } from '../meta/index.js';

interface OnCloseOptions {
	handler: Fn;
	condition?: boolean;
}

/**
 * Executes a passed in fuction on the window's onclose event.
 * Pass in a condition to only execute when that condition is met.
 *
 * Example:
 * ```svelte
 * <element use:onclose={handler} />
 * <element use:onclose={{ handler, condition }} />
 * ```
 */
export function onclose(_node: HTMLElement, options: OnCloseOptions) {
	let handler = options.handler;
	let condition = options.condition ?? true;

	function confirm(e: BeforeUnloadEvent) {
		if (!condition) return;
		e.preventDefault();
		handler(e);
	}

	const unlisten = listen(window, 'beforeunload', confirm) || noop;

	return {
		update: (options: OnCloseOptions) => {
			handler = options.handler;
			condition = options.condition ?? true;
		},
		destroy: () => unlisten()
	};
}
