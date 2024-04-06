import { getElement, type ElementOrSelector } from '../meta/element.js';

/**
 * Mounts a component elsewhere in the DOM.
 * Pass in the target parent by reference or selector.
 * Usage: <element use:portal={'#target'} /> (as querySelector) or <element use:portal={target} /> (as HTMLelement)
 */
export function portal(node: HTMLElement, target: ElementOrSelector) {
	let targetElement = getElement(target);
	targetElement && targetElement.appendChild(node);

	return {
		update: (target: ElementOrSelector) => {
			targetElement = getElement(target);
			targetElement && targetElement.appendChild(node);
		},
		destroy: () => node.parentElement?.removeChild(node)
	};
}
