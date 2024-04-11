# Mediaquery

A store that syncs to media query changes.
Add in a `media` + `value` pair or a single 'media' value.
Uses window.matchMedia under the hood.

There are many predefined queries available from [svu/client](/client/media).

- See also: [media](/client/media)

```svelte
<script>
	import { mediaquery } from 'svu/store';
	let darkMode = mediaquery('prefers-color-scheme', 'dark');
</script>

{#if darkMode}
	I see a window and I want to paint it black.
{/if}
```
