/** noop */
export const noop = () => {};
/** execute function */
export const run = (fn: () => any) => fn();
/** execute array of functions */
export const runAll = (fns: (() => any)[]) => {
	for (const fn of fns) fn();
};
