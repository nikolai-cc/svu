import { writable } from 'svelte/store';
import { browser } from '$app/env';

// A map of OS to regex User Agent string match.
let osMap = {
	iOS: /(iPhone|iPad|iPod)/, // string also contains Mac
	Android: /(Android)/, // string also contains Linux
	'Chrome OS': /CrOS/, // string also contains X11
	Windows: /(Win)/,
	macOS: /Mac/,
	Linux: /(Linux|X11)/
};

// Function that checks the User Agent string and returns OS name.
const extractOS = () => {
	let ua = window.navigator.userAgent;
	if (!!ua.match(osMap['macOS'])) return 'macOS';
	if (!!ua.match(osMap['Android'])) return 'Android';
	if (!!ua.match(osMap['Chrome OS'])) return 'CrOS';
	if (!!ua.match(osMap['iOS'])) return 'iOS';
	if (!!ua.match(osMap['Windows'])) return 'Windows';
	if (!!ua.match(osMap['Linux'])) return 'Linux';
	return 'Unknown';
};

const createOS = () => {
	const { subscribe, set } = writable();
	if (!browser) return { subscribe };
	set(extractOS());
	return { subscribe };
};

/**
 * A readable store that contains the OS name.
 * It's used to determine the correct modifier key.
 * In general, don't use it for feature detection (why? see [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent))
 *
 */
export const os = createOS();

const createModKey = () => {
	const { subscribe, set } = writable();
	if (!browser) return { subscribe };
	set(extractOS() === ('macOS' || 'iOS') ? 'Command' : 'Control');
	return { subscribe };
};

/**
 * The 'Modifier' key is the key that's generally used for shorcuts.
 * On macOS (and iOS with external keyboards) this is the command key.
 * On other platforms this is the control key.
 * You can use it in conjunction with the use:keydown action.
 */
export const modKey = createModKey();
