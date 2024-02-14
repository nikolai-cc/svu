/**
 * This function is used to monkey-patch the history API in order to dispatch
 * events when the history state changes. This is necessary because the
 * `popstate` event is only dispatched when the user presses the back button.
 *
 * Since even though it's 2022 and we have drones and AR sunglasses, we still have no way to detect URL changes,
 * there are three 'workarounds' to reliably change the active class when the URL is changed:
 *
 * - Use the svelte 'page' store, which would not allow use:active to be used in vanilla Svelte projects, does not work when the user calls `history.pushState()` or `history.replaceState()`.
 * - Use polling, which is inefficient, and uglier than monkey-patching.
 * - Monkey-patch the history API, which is the approach I've taken here.
 *
 * An additional benefit is that this approach makes use:active compatible with any router, not just SvelteKit.
 *
 * I am open to suggestions for a better approach.
 * Please open an issue in the 'svu' repo if you an idea, but keep the above rationale in mind.
 */
export const patchHistoryAPI = () => {
	if (!history.replaceState.toString().includes('replacestate')) {
		const rs = history.replaceState;
		history.replaceState = function (...args) {
			rs(...args);
			window.dispatchEvent(new CustomEvent('replacestate'));
		};
	}
	if (!history.pushState.toString().includes('pushstate')) {
		const ps = history.pushState;
		history.pushState = function (...args) {
			ps(...args);
			window.dispatchEvent(new CustomEvent('pushstate'));
		};
	}
};
