import { cubicOut } from 'svelte/easing';
import type { EasingFunction } from 'svelte/transition';

/**
 * Slide transition that supports multiple directions.
 * Based on the original slide transition from 'svelte/transition'.
 */
export function slide(
	node: Element,
	options: { delay?: number; duration?: number; direction?: 'x' | 'y'; easing?: EasingFunction }
) {
	const { delay = 0, duration = 400, direction = 'x', easing = cubicOut } = options ?? {};

	const style = getComputedStyle(node);
	const opacity = +style.opacity;
	const width = parseFloat(style.width);
	const height = parseFloat(style.height);
	const paddingTop = parseFloat(style.paddingTop);
	const paddingBottom = parseFloat(style.paddingBottom);
	const marginTop = parseFloat(style.marginTop);
	const marginBottom = parseFloat(style.marginBottom);
	const borderTopWidth = parseFloat(style.borderTopWidth);
	const borderBottomWidth = parseFloat(style.borderBottomWidth);

	const prop = direction === 'x' ? 'width' : 'height';
	const value = direction === 'x' ? width : height;

	return {
		delay,
		duration,
		easing,
		css: (t: number) =>
			'overflow: hidden;' +
			`opacity: ${Math.min(t * 20, 1) * opacity};` +
			`${prop}: ${t * value}px;` +
			`padding-top: ${t * paddingTop}px;` +
			`padding-bottom: ${t * paddingBottom}px;` +
			`margin-top: ${t * marginTop}px;` +
			`margin-bottom: ${t * marginBottom}px;` +
			`border-top-width: ${t * borderTopWidth}px;` +
			`border-bottom-width: ${t * borderBottomWidth}px;`
	};
}
