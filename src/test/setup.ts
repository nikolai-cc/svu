import matchers from '@testing-library/jest-dom/matchers';
import { expect, vi } from 'vitest';

import type { 
	page as Page,
	navigating as Navigating,
	session as Session,
	updated as Updated,
	getStores as GetStores
} from '$app/stores'

import { readable, writable } from 'svelte/store'

expect.extend(matchers);

vi.mock('$app/stores', async () => {
	const page: typeof Page = readable({
		error: null,
		params: {},
		routeId: '',
		status: 200,
		stuff: {},
		url: new URL('http://example.com')
	})
	
	const navigating: typeof Navigating = readable(null)
	
	const session: typeof Session = writable({});
	
	const updated: typeof Updated = {
		subscribe: readable(false).subscribe,
		check: () => (false)
	};

	const getStores: typeof GetStores = () => ({
		navigating,
		page,
		session,
		updated
	});


	return {
		getStores,
		navigating,
		page,
		session,
		updated
	};
});