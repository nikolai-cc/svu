import { page } from '$app/stores';
import { derived, get } from 'svelte/store';
import type { ActionReturn } from 'svelte/action';

export interface UseActiveOptions {
	className?: string;
	includeDescendants?: boolean;
	path?: string;
}

/**
 * Adds a class to an element when the URL matches a path.
 * If used on a link it extracts the value of `href` by default.
 * Usage: `<a href="/docs" use:active />`
 */
export const active = (
	node: HTMLElement,
	options?: UseActiveOptions
): ActionReturn<UseActiveOptions> => {
	let {
		className = 'active',
		includeDescendants = false,
		path = node.getAttribute('href') ?? '/'
	} = options ?? {};

	className = className === '' ? 'active' : className;

	const addClass = (pathName: string) => {
		if (
			includeDescendants ? pathName === path || pathName.includes(path + '/') : pathName === path
		) {
			node.classList.add(className);
		} else {
			node.classList.contains(className) && node.classList.remove(className);
		}
	};

	// A derived store will only run the subscribe method if the derived value changes,
	// so we avoid unecessary addClass() calls where the pathName was not changed
	const pathStore = derived(page, ($page) => $page.url.pathname);
	const unsubscribe = pathStore.subscribe(addClass);

	return {
		update: (options: UseActiveOptions) => {
			// Update the class only if the className is different than before, taking into account that undefined and '' result in 'active'.
			if (
				className !== options.className &&
				!((options.className === '' || options.className === undefined) && className === 'active')
			) {
				node.classList.contains(className) && node.classList.remove(className);
				className = options.className === '' ? 'active' : options.className ?? 'active';
				const pathName = get(pathStore);
				addClass(pathName);
			}
			includeDescendants = options.includeDescendants ?? false;
			path = options.path ?? node.getAttribute('href') ?? '/';
		},
		destroy: () => {
			node.classList.remove(className);
			unsubscribe();
		}
	};
};
