import { noop, listen, getFocusableChildren } from '../meta/index.js';

/**
 * Traps focus within an element on mount. Pressing `Tab` cycles through focusable children. Pressing `Escape` (or unmounting the element) cancels the trap.
 * Only works on focusable elements.
 *
 * Usage: <element use:focustrap />
 */
export function focustrap(node: HTMLElement) {
	const focusable = getFocusableChildren(node);

	focusable[0].focus();

	function reFocus(e: FocusEvent) {
		!focusable.includes(e.relatedTarget as HTMLElement) && (e.target as HTMLElement).focus();
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Tab') {
			e.shiftKey
				? (e.preventDefault(),
					focusable[
						(focusable.indexOf(e.target as HTMLElement) - 1 + focusable.length) % focusable.length
					].focus())
				: (e.preventDefault(),
					focusable[(focusable.indexOf(e.target as HTMLElement) + 1) % focusable.length].focus());
		}
		if (e.key === 'Escape') {
			cancel();
		}
	}

	const unlistenFocusOut = listen(node, 'focusout', reFocus as EventListener);
	const unlistenKeyDown = listen(window, 'keydown', handleKeyDown as EventListener);

	const cancel = () => {
		blur();
		unlistenFocusOut();
		unlistenKeyDown();
	};

	return {
		update: noop,
		destroy: cancel
	};
}
