import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';
import { resettable } from '$lib/store/resettable';

describe('Resettable stores', () => {
	it('should have a reset function', () => {
		const store = resettable(['foo', 'bar']);
		expect(typeof store.reset).toBe('function');
	});

	it('should should reset to original string value', () => {
		const store = resettable('bar');
		store.set('foo');
		expect(get(store)).toBe('foo');
		store.reset();
		expect(get(store)).toBe('bar');
	});

	it('should should reset to original object value', () => {
		const store = resettable({ foo: 'bar' });
		store.set({ foo: 'foo', bar: 'baz' });
		expect(get(store)).toStrictEqual({ foo: 'foo', bar: 'baz' });
		store.reset();
		expect(get(store)).toStrictEqual({ foo: 'bar' });
	});

	it('should should reset to original array value', () => {
		const store = resettable(['foo', 'bar']);
		store.set(['bar', 'baz']);
		expect(get(store)).toStrictEqual(['bar', 'baz']);
		store.reset();
		expect(get(store)).toStrictEqual(['foo', 'bar']);
	});

	it('should should reset to original date value', () => {
		const store = resettable(new Date(2020, 0, 1));
		store.set(new Date(2020, 0, 2));
		expect(get(store)).toStrictEqual(new Date(2020, 0, 2));
		store.reset();
		expect(get(store)).toStrictEqual(new Date(2020, 0, 1));
	});
});
