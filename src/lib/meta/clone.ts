/**
 * Function that deep clones any object
 */
export const clone = typeof structuredClone === 'function' ? structuredClone : _clone;

function _clone(obj: any) {
	const parents: any[] = [];
	const children: any[] = [];

	const __clone = (obj: any) => {
		if (typeof obj !== 'object') {
			return obj;
		}

		let child: any;
		if (Array.isArray(obj)) {
			child = [];
		} else if (obj instanceof Map) {
			child = new Map();
		} else if (obj instanceof Set) {
			child = new Set();
		} else if (obj instanceof Date) {
			child = new Date(obj.getTime());
		} else if (obj instanceof Error) {
			child = Object.create(obj);
		} else if (obj instanceof RegExp) {
			child = new RegExp(obj.source, obj.flags);
		} else if (obj instanceof Promise) {
			child = new Promise((res, rej) =>
				obj.then(
					(v) => res(__clone(v)),
					(e) => rej(__clone(e))
				)
			);
		} else {
			child = Object.create(Object.getPrototypeOf(obj));
		}

		if (parents.includes(obj)) {
			return children[parents.indexOf(obj)];
		}
		parents.push(obj);
		children.push(child);

		if (obj instanceof Map) {
			for (let [k, v] of obj) {
				child.set(k, __clone(v));
			}
		} else if (obj instanceof Set) {
			for (let v of obj) {
				child.add(__clone(v));
			}
		} else {
			for (let key in obj) {
				child[key] = __clone(obj[key]);
			}
		}
		return child;
	};

	return __clone(obj);
}
