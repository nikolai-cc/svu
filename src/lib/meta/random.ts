/**
 * Returns a pseudorandom integer between min (inclusive) and max (inclusive).
 * Passing in a single parameter returns a random integer between 0 and the provided value.
 */
export const random = (min: number, max?: number) => {
	const _min = max ? min : 0;
	const _max = max ? max : min;
	return Math.floor(Math.random() * (_max - _min + 1)) + _min;
};

/** Flip a coin */
export const coin = () => random(0, 1);
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
