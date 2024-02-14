/** Do nothing. */
export const noop = () => {};

/** Executes passed in function immediately. */
export const run = <T>(fn: () => T) => fn();
