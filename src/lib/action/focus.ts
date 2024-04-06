import { noop, isFocusable } from '../meta/index.js';

/**
 * Focuses element when it mounts. Only works on focusable elements.
 *
 * Example:
 * ```svelte
 * <element use:focus />
 * ```
 */
export function focus(node: HTMLElement) {
	if (isFocusable(node)) node.focus();

	return {
		update: noop,
		destroy: noop
	};
}
