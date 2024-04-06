import { listen, noop } from '../meta/index.js';

interface OnCloseOptions {
	handler?: (...params: unknown[]) => unknown;
	condition?: boolean;
}

/**
 * Executes a passed in fuction on the window's onclose event.
 * Pass in a condition to only execute when that condition is met.
 * Usage: <element use:onclose={{ handler, condition }} />
 */
export function onclose(_node: HTMLElement, options: OnCloseOptions = {}) {
	let handler = options.handler ?? noop;
	let condition = options.condition ?? true;

	const confirm = (e: BeforeUnloadEvent) => {
		if (!condition) return;
		e.preventDefault();
		handler(e);
	};

	const unlisten = listen(window, 'beforeunload', confirm) || noop;

	return {
		update: (options: OnCloseOptions = {}) => {
			handler = options.handler ?? noop;
			condition = options.condition ?? true;
		},
		destroy: () => unlisten()
	};
}
