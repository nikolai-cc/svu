import { clamp } from '../meta/math.js';
import { listen } from '../meta/event.js';
import { getElement, getDomRect } from '../meta/element.js';

import type { Coords } from '../meta/types.js';
import type { ActionReturn } from 'svelte/action';
import type { ElementOrSelector } from '../meta/element.js';

export interface UseDraggableOptions {
	position?: Coords;
	handle?: ElementOrSelector;
	axis?: 'x' | 'y' | 'xy';
	container?: ElementOrSelector;
	class?: string;
}

interface Attributes {
	'on:!dragstart'?: (event: CustomEvent<Coords>) => void;
	'on:!drag'?: (event: CustomEvent<Coords>) => void;
	'on:!dragend'?: (event: CustomEvent<Coords>) => void;
}

/**
 * Returns the minimum and maximum bounds for the draggable element based on an optional container element.
 */
function setBounds(node: HTMLElement, position: Coords, container: HTMLElement | undefined) {
	const min = { x: -Infinity, y: -Infinity };
	const max = { x: Infinity, y: Infinity };

	if (container) {
		const containerRect = getDomRect(container);
		const nodeRect = getDomRect(node);

		min.x = containerRect.left - nodeRect.left + position.x;
		min.y = containerRect.top - nodeRect.top + position.y;
		max.x = containerRect.left + containerRect.width - nodeRect.left - nodeRect.width + position.x;
		max.y = containerRect.top + containerRect.height - nodeRect.top - nodeRect.height + position.y;
	}

	return { min, max };
}

/**
 * Allows positioning of an element by dragging it from the element or an optional handle defined with `options.handle`.
 * Emits `!drag:start`, `!drag` and `!drag:end` events on the element. Update the `options.position` property to programmatically move the element.
 * Use the `options.axis` property to limit movement to a single axis (`x` or `y`). Use the `options.container` property to limit movement to inside a container element.
 * When dragging the dragged element gets `options.class` (`svu-dragging` by default). Use a 'scoped global' style to add component-specific styling (see example below).
 *
 * Example:
 * ```svelte
 * <div use:draggable={{ position: { x: 100, y: 100 }, handle: '#element' }} />
 *
 * <style>
 *  div:global(.svu-dragging) { cursor: grabbing; }
 * </style>
 * ```
 */
export function draggable(
	node: HTMLElement,
	options?: UseDraggableOptions
): ActionReturn<UseDraggableOptions, Attributes> {
	let { position = { x: 0, y: 0 }, axis = 'xy' } = options || {};

	let className = options?.class || 'svu-dragging';
	let handle = getElement(options?.handle, node);
	let container = getElement(options?.container);
	let origin = position;

	function handlePointerDown(event: PointerEvent) {
		event.preventDefault();
		event.stopPropagation();
		node.setPointerCapture(event.pointerId);
		node.classList.add(className);

		origin = {
			x: event.clientX,
			y: event.clientY
		};

		const { min, max } = setBounds(node, position, container);

		node.dispatchEvent(new CustomEvent('!dragstart', { detail: position }));

		function handlePointerMove(event: PointerEvent) {
			event.preventDefault();
			event.stopPropagation();

			const containerRect = container ? getDomRect(container) : undefined;

			let moveX = axis.includes('x');
			let moveY = axis.includes('y');

			if (containerRect) {
				moveX =
					event.clientX >= containerRect.left &&
					event.clientX <= containerRect.width + containerRect.left &&
					moveX;
				moveY =
					event.clientY >= containerRect.top &&
					event.clientY <= containerRect.height + containerRect.top &&
					moveY;
			}

			position.x = moveX ? position.x + event.clientX - origin.x : position.x;
			position.y = moveY ? position.y + event.clientY - origin.y : position.y;

			position.x = clamp(position.x, min.x, max.x);
			position.y = clamp(position.y, min.y, max.y);

			draw();

			origin = {
				x: event.clientX,
				y: event.clientY
			};

			node.dispatchEvent(new CustomEvent('!drag', { detail: position }));
		}

		function handlePointerUp(event: PointerEvent) {
			event.preventDefault();
			event.stopPropagation();
			node.releasePointerCapture(event.pointerId);
			node.classList.remove(className);
			node.dispatchEvent(new CustomEvent('!dragend', { detail: position }));

			unlistenPointerMove();
			unlistenPointerUp();
		}

		const unlistenPointerMove = listen(window, 'pointermove', handlePointerMove as EventListener);
		const unlistenPointerUp = listen(window, 'pointerup', handlePointerUp as EventListener);
	}

	function draw() {
		node.style.transform = `translate(${position.x}px, ${position.y}px)`;
	}

	const unlistenPointerDown = listen(handle, 'pointerdown', handlePointerDown as EventListener);
	const unlistenTouchStart = listen(handle, 'touchstart', (e) => e.preventDefault());

	return {
		update(options: UseDraggableOptions) {
			position = options.position || position;
			className = options.class || 'svu-dragging';
			handle = getElement(options.handle, node);
			axis = options.axis || axis;
			container = getElement(options.container) || container;
		},
		destroy() {
			unlistenPointerDown();
			unlistenTouchStart();
		}
	};
}
