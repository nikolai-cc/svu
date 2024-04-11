import { error } from '@sveltejs/kit';
import { isCategory, getPages } from '$docs/server.js';

export async function load({ params }) {
	if (isCategory(params.category)) {
		return {
			pages: getPages(params.category)
		};
	}

	return error(404, 'Not found');
}