/**
 * Mounts a component elsewhere in the DOM.
 * Pass in the target parent by reference or selector.
 * Usage: <element use:portal={'#target'} /> (as querySelector) or <element use:portal={target} /> (as HTMLelement)
 */
export const portal = (node: HTMLElement, target: HTMLElement | string) => {
	let targetElement = typeof target === 'string' ? document.querySelector(target) : target;
	targetElement && targetElement.appendChild(node);

	return {
		update: (target: HTMLElement | string) => {
			let targetElement = typeof target === 'string' ? document.querySelector(target) : target;
			targetElement && targetElement.appendChild(node);
		},
		destroy: () => node.parentElement?.removeChild(node)
	};
};
