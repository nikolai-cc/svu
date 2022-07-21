import { page } from '$app/stores';
import { get } from 'svelte/store';
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

	page.subscribe(($page) => {
		const pathName = $page.url.pathname;
		addClass(pathName);
	});

	return {
		update: (options: UseActiveOptions) => {
			node.classList.contains(className) && node.classList.remove(className);
			className = options.className === '' ? 'active' : options.className ?? 'active';
			includeDescendants = options.includeDescendants ?? false;
			path = options.path ?? node.getAttribute('href') ?? '/';
			const pathName = get(page).url.pathname;
			addClass(pathName);
		},
		destroy: () => node.classList.remove(className)
	};
};
