import { describe, expect, it } from 'vitest';
import { random } from '$lib/meta';

// The chance that one of these things happen while random works correctly is at most 2.6E-458.

describe('Random meta utility', () => {
	it('should return a random number between 0 and max (inclusive) if one parameter is provided', () => {
		const numbers: number[] = [];
		for (let i = 0; i < 10_000; i++) {
			numbers.push(random(10));
		}

		expect(numbers.some((n) => n < 0)).toBeFalsy();
		expect(numbers.some((n) => n > 10)).toBeFalsy();
		expect(numbers.some((n) => n == 0)).toBeTruthy();
		expect(numbers.some((n) => n == 10)).toBeTruthy();
	});

	it('should return a random number between min (inclusive) and max (inclusive) if both parameters are provided', () => {
		const numbers: number[] = [];
		for (let i = 0; i < 10_000; i++) {
			numbers.push(random(5, 15));
		}

		expect(numbers.some((n) => n < 5)).toBeFalsy();
		expect(numbers.some((n) => n > 15)).toBeFalsy();
		expect(numbers.some((n) => n == 5)).toBeTruthy();
		expect(numbers.some((n) => n == 15)).toBeTruthy();
	});
});
