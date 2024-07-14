import { listen } from '../meta/event.js';
import { getDomRect } from '../meta/element.js';

import type { ActionReturn } from 'svelte/action';
import { noop } from '$lib/meta/fn.js';

export interface UseRotatableOptions {
	handle: HTMLElement;
	rotation?: number;
	class?: string;
}

interface Attributes {
	'on:!rotate:start'?: (event: CustomEvent<number>) => void;
	'on:!rotate'?: (event: CustomEvent<number>) => void;
	'on:!rotate:end'?: (event: CustomEvent<number>) => void;
}

/**
 * Allows rotating an element by dragging it from a handle specified using `options.handle`.
 * Emits `!rotate:start`, `!rotate` and `!rotate:end` events on the element. Update the `options.rotation` property to programmatically rotate the element (value is in degrees).
 * When rotating the rotated element gets `options.class` (`svu-rotating` by default). Use a 'scoped global' style to add component-specific styling (see example below).
 *
 * Example:
 * ```svelte
 * <div use:rotatable={{ handle: handleElement }} />
 *
 * <style>
 *  div:global(.svu-rotating) { opacity: 0.5; }
 * </style>
 * ```
 */
export function rotatable(
	node: HTMLElement,
	options: UseRotatableOptions
): ActionReturn<UseRotatableOptions, Attributes> {
	let handle = options.handle;
	let className = options.class || 'svu-rotating';
	let rotation = options.rotation || 0;

	function draw() {
		node.style.transform = `rotate(${rotation}deg)`;
	}

	function handlePointerDown(event: PointerEvent) {
		event.preventDefault();
		event.stopPropagation();
		handle.setPointerCapture(event.pointerId);

		const { left, top, width, height } = getDomRect(node);
		const cx = left + width / 2;
		const cy = top + height / 2;

		const { clientX, clientY } = event;
		const origin = { x: clientX, y: clientY };
		const initialRotation = rotation;

		node.classList.add(className);
		node.dispatchEvent(new CustomEvent('!resize:start', { detail: rotation }));

		function handlePointerMove(event: PointerEvent) {
			event.preventDefault();
			event.stopPropagation();

			const { clientX, clientY } = event;

			const angle =
				Math.atan2(clientY - cy, clientX - cx) - Math.atan2(origin.y - cy, origin.x - cx);

			rotation = initialRotation + (angle * 180) / Math.PI;

			node.dispatchEvent(new CustomEvent('!rotate', { detail: rotation }));

			draw();
		}

		function handlePointerUp(event: PointerEvent) {
			event.preventDefault();
			event.stopPropagation();

			handle.releasePointerCapture(event.pointerId);

			node.classList.remove(className);
			node.dispatchEvent(new CustomEvent('!rotate:end', { detail: rotation }));

			unlistenPointerMove();
			unlistenPointerUp();
		}

		const unlistenPointerMove = listen(window, 'pointermove', handlePointerMove as EventListener);
		const unlistenPointerUp = listen(window, 'pointerup', handlePointerUp as EventListener);
	}

	let unlistenPointerDown = handle
		? listen(handle, 'pointerdown', handlePointerDown as EventListener)
		: noop;

	return {
		update(options) {
			className = options.class || className;
			rotation = options.rotation || rotation;

			if (options.handle !== handle) {
				unlistenPointerDown();
				handle = options.handle;
				unlistenPointerDown = listen(handle, 'pointerdown', handlePointerDown as EventListener);
			}
		},
		destroy() {
			unlistenPointerDown();
		}
	};
}
