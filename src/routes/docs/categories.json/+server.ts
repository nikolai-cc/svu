import { json } from '@sveltejs/kit';
import { ls } from '$docs/server';

export const GET = async () => {
	const categories = await ls('./src/routes/docs', 'dirs');

	return json({
		categories
	});
};
