/**
 * Returns a pseudorandom integer between min (inclusive) and max (inclusive).
 * Passing in a single parameter returns a random integer between 0 and the provided value.
 * Throws an error if min or max are not integers, or if min is greater than max.
 */
export function random(min: number, max?: number) {
	if (!Number.isInteger(min) || (max !== undefined && !Number.isInteger(max))) {
		throw new Error('Min and max values must be integers');
	}

	const _min = max !== undefined ? Math.min(min, max) : 0;
	const _max = max !== undefined ? Math.max(min, max) : min;

	if (_min === _max) {
		return _min;
	}

	return Math.floor(Math.random() * (_max - _min + 1)) + _min;
}

/** Flip a coin, returns true or false */
export const coin = () => random(0, 1) === 1;

/** Throw a four-sided dice */
export const d4 = () => random(1, 6);
/** Throw a six-sided dice */
export const d6 = () => random(1, 6);
/** Throw a eight-sided dice */
export const d8 = () => random(1, 8);
/** Throw a ten-sided dice */
export const d10 = () => random(1, 10);
/** Throw a twelve-sided dice */
export const d12 = () => random(1, 12);
/** Throw a twenty-sided dice */
export const d20 = () => random(1, 20);
/** Throw a hundred-sided dice */
export const d100 = () => random(1, 100);
