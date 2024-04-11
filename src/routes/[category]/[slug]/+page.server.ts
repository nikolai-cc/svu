import { error } from '@sveltejs/kit';
import { isPage, getPage } from '$docs/server.js';

export async function load({ params }) {
	if (isPage(params.category, params.slug)) {
		return {
			doc: getPage(params.category, params.slug)
		};
	}

	return error(404, 'Not found');
}