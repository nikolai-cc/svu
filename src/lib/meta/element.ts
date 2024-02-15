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
