/**
 * A function that executes the passed in function max once every interval milliseconds
 * Set leading to true to execute the function on the leading edge of the interval.
 */
export const debounce = (
	fn: (...params: any) => any,
	interval: number,
	leading: boolean = false
) => {
	let timer: any;
	return (...args: any[]) => {
		if (timer) {
			clearTimeout(timer);
		}
		if (leading) {
			fn(...args);
		}
		timer = setTimeout(() => {
			fn(...args);
		}, interval);
	};
};
