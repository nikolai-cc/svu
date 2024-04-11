import { getCategories } from '$docs/server.js';

export async function load() {
	return {
		categories: getCategories()
	};
}
