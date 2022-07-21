/** noop */
export const noop = () => {};
/** execute function */
export const run = (fn: Function) => fn();
/** execute array of functions */
export const run_all = (fns: Function[]) => fns.forEach(run);
