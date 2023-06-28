export const GET = async () => {
	return new Response(undefined, {
		status: 303,
		headers: {
			Location: '/'
		}
	});
};
