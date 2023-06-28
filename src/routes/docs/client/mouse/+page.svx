# Mouse

Mouse is a collection of stores that contain the mouse position. You can either get the x position through `mx` and y position through `my`, or access the `mouse` store which is an object in the form of `{x, y}`.

- see also: [window](/docs/client/window)

## Usage

This can be used for anything that needs the mouse position. Here is a purple square following the mouse:

```svelte
<script>
	import { my } from '$lib/client';
	import { mouse } from 'svu/client';
</script>

<div style:transform="translate3d({$mouse.x}px, {$mouse.y}px, 0)" />

<style>
	div {
		position: fixed;
		width: 10px;
		height: 10px;
		top: 0;
		left: 0;
		background-color: rebeccapurple;
		pointer-events: none;
	}
</style>
```

## Caveats

It's a readable store, thus cannot be used to change the mouse position programmatically. (Moving the mouse using JavaScript is impossible. If you think you want it, you don't.)
