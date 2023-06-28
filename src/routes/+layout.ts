import type { LoadEvent } from '@sveltejs/kit';
export const load = async ({ fetch }: LoadEvent) => {
	const res = await fetch('/docs/categories.json');
	const json = await res.json();
	const categories: string[] = json.categories;

	return { categories };
};
