import { browser } from '../meta/index.js';
import { writable } from 'svelte/store';

function create() {
	const { subscribe, set: setStore } = writable('');

	if (!browser) return { subscribe, set: setStore };
	const target = document.documentElement;

	const set = (val: string) => {
		target.setAttribute('data-theme', val);
		setStore(val);
	};

	const handleChange = (mutationList: MutationRecord[]) => {
		mutationList.forEach((m) => {
			const el = m.target as HTMLElement;
			setStore(el.getAttribute('data-theme') ?? '');
		});
	};

	const observer = new MutationObserver(handleChange);
	observer.observe(target, { attributes: true, attributeFilter: ['data-theme'] });

	return { subscribe, set };
}

/**
 * A store that holds the current theme. It detects changes to the `data-theme` attribute on the `html` element.
 * Changing the theme will also change the `data-theme` attribute on the `html` element.
 * Changing the `data-theme` attribute on the `html` element will be reflected to $theme.
 *
 * ```svelte
 * <button on:click={$theme = 'dark'}>Dark</button>
 * <button on:click={$theme = 'light'}>Light</button>
 * ```
 */
export const theme = create();
