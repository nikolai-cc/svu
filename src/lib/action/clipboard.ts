import { listen } from '../meta/index.js';
import { getElement, getTextContent, setTextContent } from '$lib/meta/index.js';

/**
 * Copies the text content of `target` to the clipboard when `node` is clicked.
 * If `target` is not provided, `node`'s text content is copied. When `target` is a string, it is used as a query selector.
 * Also dispatches a `copy` ClipboardEvent on 'target'.
 * When `target` is an input or textarea, its value is copied. Otherwise, textContent is copied.
 *
 * Example:
 * ```svelte
 * <input id="input" value="Some value" bind:this={targetElement} />
 * <button use:copy={"#input"} />
 * <button use:copy={targetElement} />
 * <p use:copy>Some text</p>
 *```
 */
export function copy(node: HTMLElement, target?: HTMLElement | string) {
	let targetNode = getElement(target, node);

	const handleClick: EventListener = async () => {
		const text = getTextContent(targetNode);
		await navigator.clipboard.writeText(text);
		targetNode.dispatchEvent(new CustomEvent('!copy', { detail: text }));
	};

	const unlisten = listen(node, 'click', handleClick);

	return {
		update: (newTarget: HTMLElement | string) => {
			targetNode = getElement(newTarget, node);
		},
		destroy: unlisten
	};
}

/**
 * Cuts the text content of `target` to the clipboard when `node` is clicked.
 * If `target` is not provided, `node`'s text content is copied. When `target` is a string, it is used as a query selector.
 * Also dispatches a `copy` event on 'node' with the copied text as `detail`.
 * When `target` is an input or textarea, its value is copied. Otherwise, textContent is copied.
 * The original value or textArea is replaced with an empty string.
 *
 * Example:
 * ```svelte
 * <input id="input" value="Some value" bind:this={targetElement} />
 * <button use:cut={"#input"} />
 * <button use:cut={targetElement} />
 * <p use:cut>Some text</p>
 *```
 */
export function cut(node: HTMLElement, target?: HTMLElement | string) {
	let targetNode = getElement(target, node);

	const handleClick: EventListener = async () => {
		const text = getTextContent(targetNode);
		await navigator.clipboard.writeText(text);
		node.dispatchEvent(new CustomEvent('!cut', { detail: text }));
		setTextContent(targetNode, '');
	};

	const unlisten = listen(node, 'click', handleClick);

	return {
		update: (newTarget: HTMLElement | string) => {
			targetNode = getElement(newTarget, node);
		},
		destroy: unlisten
	};
}

/**
 * Pastes the text content of the clipboard to `target` when `node` is clicked.
 * If `target` is not provided, `node`'s text content is pasted. When `target` is a string, it is used as a query selector.
 * Also dispatches a `paste` event on 'node' with the pasted text as `detail`.
 * When `target` is an input or textarea, its value is pasted. Otherwise, textContent is pasted.
 *
 * Example:
 * ```svelte
 * <input id="input" bind:this={targetElement} />
 * <button use:paste={"#input"} />
 * <button use:paste={targetElement} />
 * <p use:paste />
 *```
 */
export function paste(node: HTMLElement, target?: HTMLElement | string) {
	let targetNode = getElement(target, node);

	const handleClick: EventListener = async () => {
		const text = await navigator.clipboard.readText();
		node.dispatchEvent(new CustomEvent('!paste', { detail: text }));
		setTextContent(targetNode, text);
	};

	const unlisten = listen(node, 'click', handleClick);

	return {
		update: (newTarget: HTMLElement | string) => {
			targetNode = getElement(newTarget, node);
		},
		destroy: unlisten
	};
}
