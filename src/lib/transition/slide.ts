import { cubicOut } from 'svelte/easing';
import type { EasingFunction } from 'svelte/transition';

/**
 * Slide transition that supports multiple directions.
 * Based on the original slide transition from 'svelte/transition'.
 */
export const slide = (
	node: Element,
	options: { delay?: number; duration?: number; direction?: 'x' | 'y'; easing?: EasingFunction }
) => {
	const { delay = 0, duration = 400, direction = 'x', easing = cubicOut } = options ?? {};

	const style = getComputedStyle(node);
	const opacity = +style.opacity;
	const width = parseFloat(style.width);
	const height = parseFloat(style.height);
	const padding_top = parseFloat(style.paddingTop);
	const padding_bottom = parseFloat(style.paddingBottom);
	const margin_top = parseFloat(style.marginTop);
	const margin_bottom = parseFloat(style.marginBottom);
	const border_top_width = parseFloat(style.borderTopWidth);
	const border_bottom_width = parseFloat(style.borderBottomWidth);

	let prop = direction === 'x' ? 'width' : 'height';
	let value = direction === 'x' ? width : height;

	return {
		delay,
		duration,
		easing,
		css: (t: number) =>
			'overflow: hidden;' +
			`opacity: ${Math.min(t * 20, 1) * opacity};` +
			`${prop}: ${t * value}px;` +
			`padding-top: ${t * padding_top}px;` +
			`padding-bottom: ${t * padding_bottom}px;` +
			`margin-top: ${t * margin_top}px;` +
			`margin-bottom: ${t * margin_bottom}px;` +
			`border-top-width: ${t * border_top_width}px;` +
			`border-bottom-width: ${t * border_bottom_width}px;`
	};
};
