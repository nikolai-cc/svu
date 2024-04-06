import { listen, capitalise } from '../meta/index.js';

export type KeyMap = { [key: string]: (e: KeyboardEvent) => void };

/**
 * Takes an `keyboard shortcut` string: e.g. `'shift+cmd+a'` and returns a string that normalises `meta`/`cmd`/`win` to `'Super'`,
 * returns modifiers capitalised and in alphabetical order, and returns the key in capitalised form.
 * Keys and modifiers should be separated by a `+`, and the key to test for comes last.
 * Invalid modifer keys will be ignored.
 */
function sanitise(keyString: string) {
	const keys = keyString.split('+').map((k) => capitalise(k));
	const key = keys.pop();
	const alt = keys.includes('Alt') ? 'Alt+' : '';
	const ctrl = keys.includes('Control') || keys.includes('Ctrl') ? 'Control+' : '';
	const meta =
		keys.includes('Meta') ||
		keys.includes('Super') ||
		keys.includes('Command') ||
		keys.includes('Cmd') ||
		keys.includes('Win')
			? 'Meta+'
			: '';
	const shift = keys.includes('Shift') ? 'Shift+' : '';
	return alt + ctrl + meta + shift + key;
}

/**
 * Takes a keyMap and returns it with its key strings sanitised.
 */
function sanitizeKeyMap(keyMap: KeyMap) {
	const shortcuts: KeyMap = {};
	for (const [key, fn] of Object.entries(keyMap)) {
		shortcuts[sanitise(key)] = fn;
	}
	return shortcuts;
}

/**
 * Takes a sanitised key string and returns an object that matches the key and modifiers of the keyboardEvent.
 *
 * (currently unused)
 */
// function decode(keyString: string) {
// 	const keys = keyString.split('+');
// 	return {
// 		key: keys.pop(),
// 		altKey: keys.includes('Alt'),
// 		ctrlKey: keys.includes('Ctrl'),
// 		metaKey: keys.includes('Meta'),
// 		shiftKey: keys.includes('Shift')
// 	};
// }

/**
 * Takes a KeyboardEvent and returns a key string that matches a `keyboard shortcut` string after sanitisation.
 */
function encode(e: KeyboardEvent) {
	const alt = e.key !== 'Alt' && e.altKey ? 'Alt+' : '';
	const ctrl = e.key !== 'Control' && e.ctrlKey ? 'Control+' : '';
	const meta = e.key !== 'Meta' && e.metaKey ? 'Meta+' : '';
	const shift = e.key !== 'Shift' && e.shiftKey ? 'Shift+' : '';
	return alt + ctrl + meta + shift + capitalise(e.key);
}

/**
 * Executes functions on keydown. Pass in a map of key names to functions.
 * Pass in modifier keys with the + symbol. The key to test for always comes last.
 *
 * Modifiers are sanitised (e.g. change `cmd` to `Meta`). If a modifier can't be matched it is ignored.
 * The action is fully reactive, so shortcuts and handlers can be variables.
 *
 * Example:
 * ```svelte
 * <element use:keydown={{ 'F': handler(), 'Shift+Enter': handler(), 'Meta+A': handler() }} />
 * <element use:keydown={shortcuts} />
 * ```
 */
export function keydown(node: HTMLElement, keys: KeyMap) {
	let shortcuts: KeyMap = sanitizeKeyMap(keys);

	function execute(e: KeyboardEvent) {
		shortcuts[encode(e)]?.(e);
	}

	const unlisten = listen(node, 'keydown', execute as EventListener);

	return {
		update: (keys: KeyMap) => {
			shortcuts = sanitizeKeyMap(keys);
		},
		destroy: unlisten
	};
}

/**
 * Executes functions on keydown. Pass in a map of key names to functions.
 * Pass in modifier keys with the + symbol. The key to test for always comes last.
 *
 * Modifiers are sanitised (e.g. change `cmd` to `Meta`). If a modifier can't be matched it is ignored.
 * The action is fully reactive, so shortcuts and handlers can be variables.
 *
 * Example:
 * ```svelte
 * <element use:keyup={{ 'F': handler(), 'Shift+Enter': handler(), 'Meta+A': handler() }} />
 * <element use:keyup={shortcuts} />
 * ```
 */
export function keyup(node: HTMLElement, keys: KeyMap) {
	let shortcuts = sanitizeKeyMap(keys);

	function execute(e: KeyboardEvent) {
		shortcuts[encode(e)]?.(e);
	}

	const unlisten = listen(node, 'keyup', execute as EventListener);

	return {
		update: (keys: KeyMap) => {
			shortcuts = sanitizeKeyMap(keys);
		},
		destroy: unlisten
	};
}
