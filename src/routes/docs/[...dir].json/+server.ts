import { json } from '@sveltejs/kit';
import { ls } from '$docs/server';
import type { RequestEvent } from '@sveltejs/kit';

export const GET = async ({ params }: RequestEvent) => {
	if (!params.dir) {
		return json({
			chapters: []
		});
	}

	const dir = params.dir.split('/')[0];
	const chapters = await ls(`./src/routes/docs/${dir}/`, 'dirs');

	return json({
		chapters
	});
};
