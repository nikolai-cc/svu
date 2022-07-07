import { page } from '$app/stores';
import { noop } from '$lib/meta';
import { get } from 'svelte/store';

/**
 * Adds a class to an element when the URL matches a path.
 * If used on a link it extracts the value of 'href' by default.
 * Usage: <a href="/docs" use:active />
 */
export const active = (node: HTMLElement, options?: { className?: string, includeDescendants?: boolean, path?: string }) => {
    let {
        className = 'active',
        includeDescendants = false,
        path = node.getAttribute('href') ?? '/'
    } = options ?? {};

    const pathName = get(page).url.pathname;

    if (includeDescendants ? pathName.includes(path) : pathName === path) {
        node.classList.add(className);
    } else {
        node.classList.remove(className);
    }

    return {
        update: (options: { className?: string, includeDescendants?: boolean, path?: string }) => {
            className = options.className ?? 'active';
            includeDescendants = options.includeDescendants ?? false;
            path = options.path ?? node.getAttribute('href') ?? '/';
        
            if (includeDescendants ? pathName.includes(path) : pathName === path) {
                node.classList.add(className);
            } else {
                node.classList.remove(className);
            }
        },
        destroy: noop
    }
}