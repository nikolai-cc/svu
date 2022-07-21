/**
 * Function that deep clones any object
 */
export const clone = typeof structuredClone === 'function' ? structuredClone : _clone;

// copied from svelte codebase:
// adapted from klona v2.0.4 - https://github.com/lukeed/klona
// (c) Luke Edwards, under MIT License
function _clone(val: any) {
	let k, out, tmp;

	if (Array.isArray(val)) {
		out = Array((k = val.length));
		while (k--) out[k] = (tmp = val[k]) && typeof tmp === 'object' ? clone(tmp) : tmp;
		return out;
	}

	if (Object.prototype.toString.call(val) === '[object Object]') {
		out = {}; // null
		for (k in val) {
			if (k === '__proto__') {
				Object.defineProperty(out, k, {
					value: clone(val[k]),
					configurable: true,
					enumerable: true,
					writable: true
				});
			} else if (typeof val[k] !== 'function') {
				// MODIFICATION: skip functions
				out[k] = (tmp = val[k]) && typeof tmp === 'object' ? clone(tmp) : tmp;
			}
		}
		return out;
	}

	return val;
}
