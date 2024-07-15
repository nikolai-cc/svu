import { listen } from '../meta/event.js';
import { getDomRect, getBorderCursor, getBorderSensor, transform } from '../meta/element.js';

import type { BorderSensor } from '../meta/element.js';
import type { Scale } from '../meta/types.js';
import type { ActionReturn } from 'svelte/action';
import { clamp } from '$lib/meta/math.js';

export interface UseScalableOptions {
	scale?: Scale;
	min?: Scale;
	max?: Scale;
	margin?: number;
	aspect?: boolean;
	class?: string;
}

interface Attributes {
	'on:!scale:start'?: (event: CustomEvent<Scale>) => void;
	'on:!scale'?: (event: CustomEvent<Scale>) => void;
	'on:!scale:end'?: (event: CustomEvent<Scale>) => void;
}

/**
 * Allows scaling an element by dragging it from one of its edges or corners.
 * Emits `!scale:start`, `!scale` and `!scale:end` events on the element. Update the `options.size` property to programmatically scale the element (value is relative).
 * Use the `options.aspect` property to lock the aspect ratio of the element (false by default).
 * Use the `options.margin` property to define the size of the hitbox around the edges and corners (in pixels).
 * When dragging the dragged element gets `options.class` (`svu-scaling` by default). Use a 'scoped global' style to add component-specific styling (see example below).
 *
 * Example:
 * ```svelte
 * <div use:scaleable={{ aspect: true }} />
 *
 * <style>
 *  div:global(.svu-scaling) { opacity: 0.5; }
 * </style>
 * ```
 */
export function scalable(
	node: HTMLElement,
	options?: UseScalableOptions
): ActionReturn<UseScalableOptions, Attributes> {
	let margin = options?.margin || 10;
	let scale = options?.scale || { scaleX: 1, scaleY: 1 };
	let className = options?.class || 'svu-scaling';
	let aspect = options?.aspect || false;

	let min = options?.min || { scaleX: 0.5, scaleY: 0.5 };
	let max = options?.max || { scaleX: 3, scaleY: 3 };

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

	function checkBorderSensor(event: PointerEvent) {
		const { clientX, clientY } = event;
		borders = getDomRect(node);
		sensor = getBorderSensor(borders, margin, { x: clientX, y: clientY });
		node.style.cursor = getBorderCursor(sensor);
	}

	function draw() {
		transform(node, scale);
	}

	const handlePointerDown = (event: PointerEvent) => {
		// make sure sensor is up to date
		checkBorderSensor(event);
		// continue only if sensor is active
		if (!Object.values(sensor).some((value) => value)) return;

		const origin = { ...scale };

		const handlePointerMove = (event: PointerEvent) => {
			event.preventDefault();
			event.stopPropagation();

			const { clientX, clientY } = event;

			if (sensor.top) {
				scale.scaleY = origin.scaleY - 2 * ((clientY - borders.top) / node.clientHeight);
			}

			if (sensor.right) {
				scale.scaleX = origin.scaleX + 2 * ((clientX - borders.right) / node.clientWidth);
			}

			if (sensor.bottom) {
				scale.scaleY = origin.scaleY + 2 * ((clientY - borders.bottom) / node.clientHeight);
			}

			if (sensor.left) {
				scale.scaleX = origin.scaleX - 2 * ((clientX - borders.left) / node.clientWidth);
			}

			scale.scaleY = clamp(scale.scaleY, min.scaleY, max.scaleY);
			scale.scaleX = clamp(scale.scaleX, min.scaleX, max.scaleX);

			if (aspect) {
				scale.scaleX = scale.scaleY = Math.max(scale.scaleX, scale.scaleY);
			}

			node.dispatchEvent(new CustomEvent('!scale', { detail: scale }));

			draw();
		};

		const handlePointerUp = (event: PointerEvent) => {
			event.preventDefault();
			event.stopPropagation();

			node.classList.remove(className);
			node.dispatchEvent(new CustomEvent('!scaleend', { detail: scale }));

			unlistenPointerMove();
			unlistenPointerUp();

			unlistenSensor = listen(node, 'pointermove', checkBorderSensor as EventListener);
		};

		unlistenSensor();

		const unlistenPointerMove = listen(window, 'pointermove', handlePointerMove as EventListener);
		const unlistenPointerUp = listen(window, 'pointerup', handlePointerUp as EventListener);
	};

	const unlistenPointerDown = listen(node, 'pointerdown', handlePointerDown as EventListener);
	let unlistenSensor = listen(node, 'pointermove', checkBorderSensor as EventListener);

	return {
		update(options: UseScalableOptions) {
			scale = options.scale || scale;
			min = options.min || min;
			max = options.max || max;
			margin = options.margin || margin;
			aspect = options.aspect || aspect;
			className = options.class || className;
		},
		destroy() {
			unlistenPointerDown();
			unlistenSensor();
		}
	};
}
