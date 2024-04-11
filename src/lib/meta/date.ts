/**
 * Check if the value is a Date object.
 */
export function isDate(value: unknown): value is Date {
	return value instanceof Date;
}

/**
 * Check if the value is a string that represents an ISO date string.
 */
export function isISODateString(value: string): boolean {
	return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d{3})?(Z|[+-]\d{2}:\d{2})?$/.test(value);
}
