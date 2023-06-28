import { readable, writable } from 'svelte/store';

export const page = writable({
	error: null,
	params: {},
	routeId: '',
	status: 200,
	stuff: {},
	url: new URL('http://svu.dev')
});
