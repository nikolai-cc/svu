import { noop } from '$lib/meta/fn.js';
import { browser } from '../meta/env.js';
import { listen } from '../meta/event.js';
import { resettable } from './resettable.js';
import { serialise, deserialise } from '$lib/meta/json.js';

import type { Updater } from 'svelte/store';
import type { JSONSerialisable } from '../meta/json.js';

/**
 * A resettable store that is synced with localstorage.
 * If localstorage is not available, the store will fallback to a resettable store.
 * In this case the store.available flag will be false. (Keep in mind that store.available is not reactive)
 *
 * Example:
 * ```svelte
 * let store = localstore('key', 0); // will retreive from localstore
 *
 * <input type="number" bind:value={$store}>
 * <button on:click={store.reset}>Reset</button> // resets to 0
 * <button on:click={store.clear}>Clear</button> // clears localstore and disconnects
 * <button on:click={store.disconnect}>Disconnect</button> // disconnects from localstore (but leaves the stored value as is)
 * <button on:click={store.connect}>Connect</button> // reconnects to localstore (retreives the stored value)
 * <button on:click={() => store.connect(true)}>Connect (override)</button> // reconnects to localstore and overrides the stored value with the current value
 */
export function localstore<T extends JSONSerialisable>(key: string, value: T) {
	if (!browser || !available) return fallback(value);

	let connected = false;
	let unlisten = noop;

	const { subscribe, set: setStore, reset: resetStore, update: updateStore } = resettable(value);

	/** Sets the store to new value, saves to localstorage */
	function set(newValue: T) {
		connected && setItem(key, newValue);
		setStore(newValue);
	}

	/** Resets the store to the initial value, saves to localstorage. */
	function reset() {
		connected && setItem(key, value);
		resetStore();
	}

	/** Clears the store value from localstorage and disconnects the store */
	function clear() {
		connected && disconnect();
		removeItem(key);
	}

	/** Disconnects store value from localstorage */
	function disconnect() {
		connected = false;
		unlisten();
	}

	function update(updater: Updater<T>) {
		updateStore((value) => {
			const newValue = updater(value);
			connected && setItem(key, newValue);
			return newValue;
		});
	}

	/** Updates store value from localstorage */
	function handleStorageEvent(e: StorageEvent) {
		const item = getItem(key);
		e.key === key && item !== null && setStore(deserialise(item) as T); //TODO: add type validation and remove assertion
	}

	/** Connects store value to localstorage. Pass true to override the stored value with the current value. */
	function connect(override = false) {
		connected = true;

		unlisten(); // disconnect if connected
		unlisten = listen(window, 'storage', (e) => handleStorageEvent(e as StorageEvent));

		// the store will be updated from localstorage unless override is true or the associated localstorage key is empty
		const item = getItem(key);
		override || item === null ? update((v) => v) : set(deserialise(item) as T); //TODO: add type validation and remove assertion
	}

	connect();

	return {
		available: true,
		subscribe,
		set,
		update,
		reset,
		clear,
		connect,
		disconnect
	};
}

/** This takes in a key and value and stores the stringified value under the key. */
function setItem(key: string, value: JSONSerialisable) {
	localStorage.setItem(key, serialise(value));
}

function getItem(key: string) {
	return localStorage.getItem(key) ?? null;
}

function removeItem(key: string) {
	localStorage.removeItem(key);
}

function fallback<T>(value: T) {
	const { subscribe, set, reset } = resettable(value);
	return {
		available: false,
		subscribe,
		set,
		reset,
		clear: noop,
		connect: noop,
		disconnect: noop
	};
}

function checkAvailability() {
	const test = '__svu_test_localstore__';
	try {
		setItem(test, test);
		removeItem(test);
		return true;
	} catch (_) {
		return false;
	}
}

const available = checkAvailability();
