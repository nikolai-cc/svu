import type { ActionReturn } from 'svelte/action';
import { listen } from '$lib/meta';

export interface UseActiveOptions {
	className?: string;
	includeDescendants?: boolean;
	path?: string;
	hash?: boolean;
}

/**
 * This function is used to monkey-patch the history API in order to dispatch
 * events when the history state changes. This is necessary because the
 * `popstate` event is only dispatched when the user presses the back button.
 * 
 * Since even though it's 2022 and we have drones and AR sunglasses, we still have no way to detect URL changes,
 * there are three 'workarounds' to reliably change the active class when the URL is changed:
 * 
 * - Use the svelte 'page' store, which would not allow use:active to be used in vanilla Svelte projects, does not work when the user calls `history.pushState()` or `history.replaceState()`.
 * - Use polling, which is inefficient, and uglier than monkey-patching.
 * - Monkey-patch the history API, which is the approach I've taken here.
 * 
 * An additional benefit is that this approach makes active compatible with any router, not just SvelteKit.
 * 
 * I am open to suggestions for a better approach.
 * Please open an issue in the 'svu' repo if you an idea, but keep the above rationale in mind.
*/
const patchStateFunctions = () => {
	const rs = history.replaceState;
	if (!rs.toString().includes('replacestate')) {
		history.replaceState = function (...args) {
			rs.apply(history, args);
			window.dispatchEvent(new CustomEvent('replacestate'));
		};
	}
	const ps = history.pushState;
	if (!ps.toString().includes('pushstate')) {
		history.pushState = function (...args) {
			ps.apply(history, args);
			window.dispatchEvent(new CustomEvent('pushstate'));
		};
	}
}

/**
 * Adds a class ('svu-active' by default) to an element when the URL matches a path.
 * If used on a link it extracts the value of `href` by default. 
 * 
 * Set the 'hash' option to true to compare the value of path to location.hash instead of location.pathname.
 * 
 * Usage: `<a href="/docs" use:active />` `<button on:click={goto('#demo')} use:active={{ path: "#demo", hash: true }} />`
 */
export const active = (
	node: HTMLElement,
	options?: UseActiveOptions
): ActionReturn<UseActiveOptions> => {
	let {
		className = 'svu-active',
		includeDescendants = false,
		path = node.getAttribute('href') ?? '/',
		hash = false,
	} = options ?? {};

	className = className === '' ? 'svu-active' : className;

	const addClass = (pathName: string) => {
		if (
			includeDescendants ? pathName === path || pathName.includes(path + '/') : pathName === path
		) {
			node.classList.add(className);
		} else {
			node.classList.contains(className) && node.classList.remove(className);
		}
	};

	patchStateFunctions();

	const unlistenPopState = listen(window, 'popstate', () => addClass(hash ? window.location.hash : window.location.pathname));
	const unlistenReplaceState = listen(window, 'replacestate', () => addClass(hash ? window.location.hash : window.location.pathname));
	const unlistenPushState = listen(window, 'pushstate', () => addClass(hash ? window.location.hash : window.location.pathname));

	addClass(hash ? window.location.hash : window.location.pathname);

	return {
		update: (options: UseActiveOptions) => {
			// Update the class only if the className is different than before, taking into account that undefined and '' result in 'svu-active'.
			if (
				className !== options.className &&
				!((options.className === '' || options.className === undefined) && className === 'svu-active')
			) {
				node.classList.contains(className) && node.classList.remove(className);
				className = options.className === '' ? 'svu-active' : options.className ?? 'svu-active';
			}
			
			includeDescendants = options.includeDescendants ?? false;
			path = options.path ?? node.getAttribute('href') ?? '/';
			hash = options.hash ?? false;

			addClass(hash ? window.location.hash : window.location.pathname);
		},
		destroy: () => {
			node.classList.contains(className) && node.classList.remove(className);

			unlistenPopState();
			unlistenReplaceState();
			unlistenPushState();
		}
	};
};
