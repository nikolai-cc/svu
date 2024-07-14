import { browser } from './env.js';

export type ElementOrSelector = HTMLElement | string | undefined;

/**
 * Returns the target node from the provided target or the fallback node.
 */
export function getElement(target: ElementOrSelector, fallback: HTMLElement): HTMLElement;
export function getElement(target: ElementOrSelector): HTMLElement | undefined;
export function getElement(target: ElementOrSelector, fallback?: HTMLElement) {
	return (typeof target === 'string' ? document.querySelector(target) : target) || fallback;
}

/**
 * Returns the text content of the target node. If the target is an input or textarea, its value is returned. Otherwise, textContent is returned.
 */
export function getTextContent(target: Element) {
	return target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement
		? target.value
		: target.textContent || '';
}

/**
 * Sets the text content of the target node. If the target is an input or textarea, its value is set. Otherwise, textContent is set.
 */
export function setTextContent(target: Element, text: string) {
	if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
		target.value = text;
	} else {
		target.textContent = text;
	}
}

/**
 * Returns the DOMRect of the target node relative to the document. Want the rect relative to the viewport? Use the native `getBoundingClientRect` instead.
 */
export function getDomRect(node: HTMLElement) {
	if (!browser) return { left: 0, top: 0, width: 0, height: 0, right: 0, bottom: 0 };

	const rect = node.getBoundingClientRect();
	return {
		left: rect.left + window.scrollX,
		top: rect.top + window.scrollY,
		right: rect.left + window.scrollX + rect.width,
		bottom: rect.top + window.scrollY + rect.height,
		width: rect.width,
		height: rect.height
	};
}

export function getTransformCoords(node: HTMLElement) {
	const style = window.getComputedStyle(node);
	const transform = style.transform;

	if (transform === 'none') return { x: 0, y: 0 };

	const matrix = transform.match(/^matrix\((.+)\)$/);
	if (!matrix) return { x: 0, y: 0 };

	const [x, y] = matrix[1].split(',').slice(4).map(parseFloat);

	return { x, y };
}

// This list originates from: https://stackoverflow.com/a/30753870
const focusableElements = `
    a[href]:not([tabindex='-1']),
    area[href]:not([tabindex='-1']),
    input:not([disabled]):not([tabindex='-1']),
    select:not([disabled]):not([tabindex='-1']),
    textarea:not([disabled]):not([tabindex='-1']),
    button:not([disabled]):not([tabindex='-1']),
    iframe:not([tabindex='-1']),
    [tabindex]:not([tabindex='-1']),
    [contentEditable=true]:not([tabindex='-1'])
`;

/**
 * Returns true if the node is focusable.
 */
export function isFocusable(node: HTMLElement) {
	return node && node.matches(focusableElements);
}

/**
 * Returns an array with all focusable children of the node.
 */
export function getFocusableChildren(node: HTMLElement): HTMLElement[] {
	return node ? Array.from(node.querySelectorAll(focusableElements)) : [];
}

/**
 * Element border sensor. Used to detect the cursor position relative to the element's borders.
 */
export type BorderSensor = { top: boolean; right: boolean; bottom: boolean; left: boolean };

/**
 * Element border sensor. Returns sensor values based on the cursor position and the element's borders.
 */
export function getBorderSensor(
	borders: { top: number; right: number; bottom: number; left: number },
	margin: number,
	coords: { x: number; y: number }
) {
	const { top, right, bottom, left } = borders;
	const { x, y } = coords;

	return {
		top: top < y && y < top + margin,
		right: right - margin < x && x < right,
		bottom: bottom - margin < y && y < bottom,
		left: left < x && x < left + margin
	};
}

/**
 * Returns the cursor "𝑥-resize" name based on BorderSensor values.
 */
export function getBorderCursor(sensor: BorderSensor) {
	if (sensor.top && sensor.left) return 'nwse-resize';
	if (sensor.top && sensor.right) return 'nesw-resize';
	if (sensor.bottom && sensor.left) return 'nesw-resize';
	if (sensor.bottom && sensor.right) return 'nwse-resize';
	if (sensor.top) return 'ns-resize';
	if (sensor.right) return 'ew-resize';
	if (sensor.bottom) return 'ns-resize';
	if (sensor.left) return 'ew-resize';
	return 'default';
}
