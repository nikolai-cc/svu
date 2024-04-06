import { noop, listen, getFocusableChildren } from '../meta/index.js';

/**
 * Traps focus within an element. Pressing `Tab` cycles through focusable children. Pressing `Escape` cancels the trap.
 * Only works on focusable elements.
 *
 * Usage: <element use:focustrap />
 */
export const focustrap = (node: HTMLElement) => {
	const focusable = getFocusableChildren(node);

	focusable[0].focus();

	const reFocus = (e: FocusEvent) => {
		!focusable.includes(e.relatedTarget as HTMLElement) && (e.target as HTMLElement).focus();
	};

	const handleKeyDown = (e: KeyboardEvent) => {
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
	};

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
};
