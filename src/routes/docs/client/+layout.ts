import type { LoadEvent } from '@sveltejs/kit';

export const load = async ({ fetch, url }: LoadEvent) => {
	const path = url.pathname;
	const res = await fetch(`${path}.json`);
	const json = await res.json();
	const chapters: string[] = json.chapters;

	return {
		path: path.split('/')[2],
		chapters
	};
};
