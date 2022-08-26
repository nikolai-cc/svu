/**
 * Mounts a component elsewhere in the DOM.
 * Pass in the target parent by reference or selector.
 * Usage: <element use:portal={'#target'} /> (as selector) or <element use:portal={target} /> (as HTMLelement)
 */
export const portal = (node: HTMLElement, target: HTMLElement | string) => {
	typeof target === 'string' ? document.querySelector(target)?.appendChild(node) : target.appendChild(node);

	return {
		update: (target: HTMLElement | string) => {
			typeof target === 'string'
				? document.querySelector(target)?.appendChild(node)
				: target.appendChild(node);
		},
		destroy: () => node.parentElement?.removeChild(node)
	};
};
