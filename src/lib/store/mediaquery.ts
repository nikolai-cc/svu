import { writable } from 'svelte/store';
import { browser } from '../meta/env.js';
import { listen } from '../meta/event.js';

/**
 * This is a readable store that syncs to the state of a media query.
 * It uses window.MatchMedia under the hood.
 *
 * Initialise the query with `let query = mediaquery(media, value)`, then track the state of the query by subscribing to the store using `$query`.
 *
 * There are many built-in stores available in `svu/store`!
 *
 * Example:
 * ```svelte
 * let darkMode = mediaquery('prefers-color-scheme', 'dark');
 * let prefersReducedMotion = mediaquery('prefers-reduced-motion');
 *
 * {#if $darkMode}
 *     <p>Dark mode is enabled!</p>
 * {/if}
 *
 * {#if $prefersReducedMotion}
 *    <p>Reduced motion is enabled!</p>
 * {/if}
 * ```
 */
export function mediaquery(media: string, value?: string) {
	media = value ? `(${media}: ${value})` : media;

	const { subscribe, set } = writable();

	if (!browser) return { subscribe };

	function update(e: MediaQueryListEvent) {
		set(e.matches);
	}

	const query = window.matchMedia(media);
	const unlisten = listen(query, 'change', update as EventListener);

	set(query.matches);

	const unsubscribe = () => unlisten();

	return { subscribe, unsubscribe };
}
