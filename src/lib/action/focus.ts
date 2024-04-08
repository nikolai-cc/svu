import { noop } from '../meta/fn.js';
import { isFocusable } from '../meta/element.js';

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
