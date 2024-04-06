/**
 * Returns a capitalised version of the input string.
 */
export function capitalise(string: string) {
	return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase();
}
