/** Check wether passed in value is an object */
function isObject(obj: unknown): obj is object {
	return typeof obj === 'object' && obj !== null;
}

/** Clones a date object */
function cloneDate(date: Date): Date {
	return new Date(date.getTime());
}

/** Clones a regular expression */
function cloneRegExp(regexp: RegExp): RegExp {
	return new RegExp(regexp.source, regexp.flags);
}

/** Clones a map */
function cloneMap<T>(
	map: Map<unknown, unknown>,
	cloneFn: (input: unknown, depth: number) => T,
	depth: number
): Map<unknown, T> {
	const clonedMap = new Map();
	map.forEach((value, key) => {
		clonedMap.set(key, cloneFn(value, depth - 1));
	});
	return clonedMap;
}

/** Clones a set */
function cloneSet<T>(
	set: Set<unknown>,
	cloneFn: (input: unknown, depth: number) => T,
	depth: number
): Set<T> {
	const clonedSet = new Set<T>();
	set.forEach((value) => {
		clonedSet.add(cloneFn(value, depth - 1));
	});
	return clonedSet;
}

/** Clones an array */
function cloneArray(
	array: unknown[],
	cloneFn: (input: unknown, depth: number) => unknown,
	depth: number
): unknown[] {
	return array.map((value) => cloneFn(value, depth - 1));
}

/** Clones a Record<string, unknown> */
function cloneRecord<T>(
	obj: Record<string, unknown>,
	cloneFn: (input: unknown, depth: number) => T,
	depth: number
): Record<string, T> {
	const clonedObj: Record<string, T> = Object.create(Object.getPrototypeOf(obj));
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			clonedObj[key] = cloneFn(obj[key], depth - 1);
		}
	}
	return clonedObj;
}

/**
 * Deep clones an object up to a maximum recursion depth.
 */
export function clone<T>(item: T, depth: number = Infinity): T {
	if (!isObject(item) || depth <= 0) {
		return item;
	}

	const seen = new Map<object, object>();

	function _clone(item: unknown, depth: number) {
		if (!isObject(item) || depth <= 0) {
			return item;
		}

		if (seen.has(item)) {
			return seen.get(item);
		}

		let clonedItem: object;
		if (item instanceof Date) {
			clonedItem = cloneDate(item);
		} else if (item instanceof RegExp) {
			clonedItem = cloneRegExp(item);
		} else if (item instanceof Map) {
			clonedItem = cloneMap(item, _clone, depth);
		} else if (item instanceof Set) {
			clonedItem = cloneSet(item, _clone, depth);
		} else if (Array.isArray(item)) {
			clonedItem = cloneArray(item, _clone, depth);
		} else {
			// At this point, item must be a Record<string, unknown>
			clonedItem = cloneRecord(item as Record<string, unknown>, _clone, depth);
		}
		seen.set(item, clonedItem);
		return clonedItem;
	}

	return _clone(item, depth) as T;
}
