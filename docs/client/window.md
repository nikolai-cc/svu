# Window

Window is a collection of stores that store the window size and scroll position.

You can either get the window size in the form of `wx` and `wh` or acces the `windowSize` store which is an object in the form of `{ w, h }`.

You can get the scroll position in the form of `sx` and `sy` or access the `scroll` store which is an object in the form of `{ x, y }`.

## Usage

It can be used in any place you would need to add `<svelte:window bind:innerWidth={ww} />` instead.

```svelte
<script>
	import { ww, wh, sx, sy } from 'svu/client';
</script>

<p>
	width: {$ww}, height: {$wh}, scrollX: {$sx}, scrollY: {$sy}
</p>
```
