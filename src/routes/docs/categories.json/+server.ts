import { ls } from '$docs/server';

export const GET = async () => {
	const categories = await ls('./src/routes/docs', 'dirs');

	return {
		body: {
			categories
		}
	};
};
