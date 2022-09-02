import { browser } from '../meta/index.js';
import { writable } from 'svelte/store';

const create = () => {
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
};

export const theme = create();
