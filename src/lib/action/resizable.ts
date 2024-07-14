import { listen } from '../meta/event.js';
import {
	getDomRect,
	getTransformCoords,
	getBorderCursor,
	getBorderSensor
} from '../meta/element.js';

import type { BorderSensor } from '../meta/element.js';
import type { Size, Coords } from '../meta/types.js';
import type { ActionReturn } from 'svelte/action';

export interface UseDraggableOptions {
	size?: Size;
	position?: Coords;
	margin?: number;
	class?: string;
}

interface Attributes {
	'on:!resizestart'?: (event: CustomEvent<Size>) => void;
	'on:!resize'?: (event: CustomEvent<Size>) => void;
	'on:!resizeend'?: (event: CustomEvent<Size>) => void;
}

/**
 * Allows resizing an element by dragging it from one of its edges or corners.
 * Emits `!resize:start`, `!resize` and `!resize:end` events on the element. Update the `options.size` property to programmatically resize the element (values are in pixels).
 * Use the `options.margin` property to define the size of the hitbox around the edges and corners (in pixels).
 * When dragging the dragged element gets `options.class` (`svu-resizing` by default). Use a 'scoped global' style to add component-specific styling (see example below).
 *
 * Example:
 * ```svelte
 * <div use:resizable={{ size: { width: 100, height: 100 } }} />
 *
 * <style>
 *  div:global(.svu-resizing) { opacity: 0.5; }
 * </style>
 * ```
 */
export function resizable(
	node: HTMLElement,
	options?: UseDraggableOptions
): ActionReturn<UseDraggableOptions, Attributes> {
	const nodeRect = getDomRect(node);

	let position = options?.position || { x: 0, y: 0 };

	const size = options?.size || { width: nodeRect.width, height: nodeRect.height };
	const margin = options?.margin || 10;
	const className = options?.class || 'svu-resizing';

	let borders = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};

	let sensor: BorderSensor = {
		top: false,
		right: false,
		bottom: false,
		left: false
	};

	let origin = {
		x: 0,
		y: 0
	};

	function checkBorderSensor(event: PointerEvent) {
		const { clientX, clientY } = event;
		borders = getDomRect(node);
		sensor = getBorderSensor(borders, margin, { x: clientX, y: clientY });
		node.style.cursor = getBorderCursor(sensor);
	}

	function draw() {
		node.style.width = size.width + 'px';
		node.style.height = size.height + 'px';
		node.style.transform = `translate(${position.x}px, ${position.y}px)`;
	}

	function handlePointerDown(event: PointerEvent) {
		// continue only if sensor is active
		if (!Object.values(sensor).some((value) => value)) return;

		event.preventDefault();
		event.stopPropagation();
		node.setPointerCapture(event.pointerId);

		origin = {
			x: event.clientX,
			y: event.clientY
		};

		position = getTransformCoords(node);

		node.classList.add(className);
		node.dispatchEvent(new CustomEvent('!resize:start', { detail: size }));

		function handlePointerMove(event: PointerEvent) {
			event.preventDefault();
			event.stopPropagation();

			const { clientX, clientY } = event;

			if (sensor.top) {
				size.height += origin.y - clientY;
				position.y -= origin.y - clientY;
			}

			if (sensor.right) {
				size.width += clientX - origin.x;
			}

			if (sensor.bottom) {
				size.height += clientY - origin.y;
			}

			if (sensor.left) {
				size.width += origin.x - clientX;
				position.x -= origin.x - clientX;
			}

			origin = { x: clientX, y: clientY };

			node.dispatchEvent(new CustomEvent('!resize', { detail: size }));

			draw();
		}

		function handlePointerUp(event: PointerEvent) {
			event.preventDefault();
			event.stopPropagation();
			node.releasePointerCapture(event.pointerId);

			node.classList.remove(className);
			node.dispatchEvent(new CustomEvent('!resize:end', { detail: size }));

			unlistenPointerMove();
			unlistenPointerUp();

			unlistenSensor = listen(node, 'pointermove', checkBorderSensor as EventListener);
		}

		unlistenSensor();

		const unlistenPointerMove = listen(window, 'pointermove', handlePointerMove as EventListener);
		const unlistenPointerUp = listen(window, 'pointerup', handlePointerUp as EventListener);
	}

	let unlistenSensor = listen(node, 'pointermove', checkBorderSensor as EventListener);
	const unlistenPointerDown = listen(node, 'pointerdown', handlePointerDown as EventListener);

	return {
		destroy() {
			unlistenSensor();
			unlistenPointerDown();
		}
	};
}
