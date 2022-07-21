/**
 * Returns a capitalised version of the input string.
 */
export const capitalise = (string: string) =>
	string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase();
