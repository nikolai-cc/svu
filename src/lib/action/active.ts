export type { ActionReturn } from 'svelte/action';
import { listen, patchHistoryAPI } from '../meta/index.js';

export interface UseActiveOptions {
	class?: string;
	subpaths?: boolean;
	path?: string;
	hash?: string;
}

/**
 * Adds a class (`svu-active` by default) to the element when the current path matches `option.path`.
 * When used on a link, it extracts the path from the `href` attribute by default.
 * Set `option.hash` to `true` to compare to `location.hash` instead of `location.pathname`.
 * Set `option.subpaths` to `true` to include children of `option.path` (e.g. `option.path` with value `/about` will match on the page `/about/me`).
 * Use a 'scoped global' style to add component-specific styling (see example below).
 *
 * Example:
 * ```svelte
 * <nav>
 *   <a href="/about" use:active>about</a>
 *   <button on:click={goto('#demo')} use:active={{path: '#demo', hash: true}}>demo</button>
 * </nav>
 *
 * <style>
 *   nav :global(.svu-active) { color: red; }
 * </style>
 * ```
 */
export function active(node: HTMLElement, options?: UseActiveOptions) {
	let { subpaths = false, path = node.getAttribute('href') ?? '/', hash = false } = options || {};

	let className = options?.class || 'svu-active';

	function setClass(pathName: string) {
		if ((subpaths && pathName.startsWith(path)) || pathName === path) {
			node.classList.add(className);
		} else {
			node.classList.remove(className);
		}
	}

	patchHistoryAPI();

	const unlistenPopState = listen(window, 'popstate', () => {
		setClass(hash ? window.location.hash : window.location.pathname);
	});

	const unlistenReplaceState = listen(window, 'replacestate', () => {
		setClass(hash ? window.location.hash : window.location.pathname);
	});

	const unlistenPushState = listen(window, 'pushstate', () => {
		setClass(hash ? window.location.hash : window.location.pathname);
	});

	setClass(hash ? window.location.hash : window.location.pathname);

	return {
		update(options: UseActiveOptions) {
			className = options.class || 'svu-active';
			subpaths = options.subpaths ?? subpaths;
			path = options.path ?? path;
			hash = options.hash ?? hash;
			setClass(hash ? window.location.hash : window.location.pathname);
		},
		destroy() {
			node.classList.remove(className);
			unlistenPopState();
			unlistenReplaceState();
			unlistenPushState();
		}
	};
}
