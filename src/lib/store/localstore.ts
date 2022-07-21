import { browser } from '$app/env';
import { noop } from '../meta';
import { writable } from 'svelte/store';

/**
 * A writable store that is synced with localstorage.
 * TODO: handle errors in localstorage.getItem and localstorage.setItem (e.g. if localstorage is disabled or the value has cahnged)
 * TODO: handle errors JSON.parse and JSON.stringify (e.g. if the value is not a valid JSON string)
 * TODO: handle non-JSON-parseable values (e.g. Date objects)??
 */
export const localstore = (key: string, value: any) => {
	if (!browser) {
		return {
			...writable(value),
			clear: noop
		};
	}

	value = JSON.parse(window.localStorage.getItem(key) ?? 'null') ?? value;
	window.localStorage.setItem(key, JSON.stringify(value));

	let { subscribe, set: setStore } = writable(value);

	window.addEventListener('storage', (e) => {
		e.key === key &&
			window.localStorage.getItem(key) &&
			setStore(JSON.parse(window.localStorage.getItem(key) ?? 'null'));
	});

	let set = (newValue: any) => {
		window.localStorage.setItem(key, JSON.stringify(newValue));
		setStore(newValue);
	};

	let clear = (v: any) => {
		window.localStorage.removeItem(key);
		setStore(v ?? undefined);
	};

	window.localStorage.set;

	return {
		subscribe,
		set,
		clear
	};
};
