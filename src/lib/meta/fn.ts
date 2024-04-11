/** Do nothing. */
export const noop = () => {};

/** Executes passed in function immediately. */
export const run = <T>(fn: () => T) => fn();

/** Unknown function type. Use `Fn<Params, Return>` to specify types. */
export type Fn<Params extends unknown[] = unknown[], Return = unknown> = (
	...params: Params
) => Return;
