import { isDate, isISODateString } from './date.js';

export type JSONSerialisable =
	| string
	| number
	| boolean
	| null
	| JSONSerialisable[]
	| { [key: string]: JSONSerialisable }
	| Date;

/**
 * Serialise to JSON, extends JSON.stringify to handle dates. Dates are serialised to ISO strings.
 */
export function serialise(value: JSONSerialisable, space: number = 0) {
	function replacer(this: unknown, key: string, value: unknown) {
		// value is the object after calling object.prototype.toJSON(), there is a slim chance that value is a Date object
		if (isDate(value)) return value.toISOString();
		// this is the object that contains the key, this[key] is the value BEFORE calling object.prototype.toJSON()
		// @ts-expect-error – this[key] is of type unknown
		if (isDate(this[key])) return this[key].toISOString();
		return value;
	}
	return JSON.stringify(value, replacer, space);
}

/**
 * Parse JSON, extends JSON.parse to handle dates. Dates are expected to be in ISO string format.
 */
export function deserialise(value: string): JSONSerialisable {
	function reviver<T>(key: string, value: T) {
		if (typeof value !== 'string') return value;
		if (isISODateString(value)) return new Date(value);
		return value;
	}
	return JSON.parse(value, reviver);
}
