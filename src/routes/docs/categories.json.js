import { ls } from '$docs/server';

export const get = async () => {
	const categories = await ls('./src/routes/docs', 'dirs');

	return {
		body: {
			categories
		}
	};
};
