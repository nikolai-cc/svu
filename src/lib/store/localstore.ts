import { browser, stringify, parse, listen } from '../meta/index.js';
import { resettable } from './index.js'

/**
 * A resettable store that is synced with localstorage.
 * 
 * Usage: `const store = localStore('key', 'initial value');`
 * 
 * If localstorage is not available, the store will fallback to a resettable store.
 * In this case the store.available flag will be false.
 */
export const localstore = (key: string, value: any) => {
	if (!browser || !available) return fallback(value)
	
	const { subscribe, set: setStore, reset: resetStore } = resettable(value);
	
	/** Sets the store to new value, saves to localstorage */
	const set = (newValue: any) => {
		setItem(key, newValue);
		setStore(newValue);
	};
	
	/** Resets the store to the initial value, saves to localstorage. */
	const reset = () => {
		setItem(key, value);
		resetStore()
	}
	
	/** Removes store from localstorage, allows setting the variable to a custom final value. (This value will not be saved) */
	const clear = (finalValue: any = undefined) => {
		removeItem(key);
		setStore(finalValue);
		unlisten();
	};
	
	const update = (e: StorageEvent) => e.key === key && getItem(key) && setStore(parse(getItem(key)));
	
	
	const unlisten = listen(window, 'storage', (e) => update(e as StorageEvent));

	// Initialise store with the value from localstorage if it exists.
	set(parse(getItem(key)) ?? value);

	return {
		available: true,
		subscribe,
		set,
		reset,
		clear
	};
};

/** This takes in a key and value and stores the stringified value under the key. */
const setItem = (key: string, value: any) => {
	const stringified = stringify(value);
	localStorage.setItem(key, stringified);
}

const getItem = (key: string) => (localStorage.getItem(key))

const removeItem = (key: string) => (localStorage.removeItem(key))

const fallback = (value: any) => {
	const { subscribe, set, reset } = resettable(value);
	return {
		available: false,
		subscribe,
		set,
		reset,
		clear: (newValue: any) => set(newValue ?? undefined)
	}
}

const checkAvailability = () => {
	const test = '__svu_test__';
	try {
		setItem(test, test);
		removeItem(test);
		return true;
	} catch (_) {
		return false;
	}
}

const available = checkAvailability()