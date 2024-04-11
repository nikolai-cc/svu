/**
 * A forgiving port of the Python range function. Returns an array from min to max, inclusive.
 * You can optionally provide a step size. When you provide a single parameter, it will return a range from 0 to max.
 */
export function range(start: number, end?: number, step?: number) {
	const _start = end !== undefined ? start : 0;
	const _end = end !== undefined ? end : start;
	const _step = step !== undefined ? Math.abs(step) : 1;

	if (_step === 0) return [];

	const size = Math.floor((_end - _start) / _step) + 1;
	const length = size > 0 ? size : 0;

	return Array.from({ length }, (_, i) => _start + i * _step);
}
