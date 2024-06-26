# Viewport

Dispatches events when the element enters or leaves the viewport. Uses `IntersectionObserver`.

## Usage

Use it to check wether an element is inside the viewport.

```svelte
<script>
	import { viewport } from 'svu/action';
</script>
```

## Options

You can pass in an optional `options` object with the following parameters:

### `root`

Which root element to observe. Defaults to the browser viewport when not specified.

- Optional: yes
- Type: `HTMLElement`
- Default value: the browser viewport

### `rootMargin`

Optional margin around the root to consider when checking for intersection. Can have the same values as the CSS `margin` property.

- Optional: yes
- Type: `string`
- Default value: `'0px'`

### `threshold`

Enter a number between 0 and 1 or an array of numbers between 0 and 1. The `viewport:enter` event will as soon as the visible percentage of the element is past the threshold. The `viewport:leave` event will as soon as the visible percentage of the element is below the threshold. By default the value is `0`, which means that as soon as 1 pixel of the element is visible, the `viewport:enter` will be triggered, and once the last pixel of the element is hidden, the `viewport:leave` event fires.

- Optional: yes
- Type: `number`
- Default value: `0`

## Events

This action dispatches two events:

### `viewport:enter`

Emitted every time the element enters the viewport. Returns the `InterSectionObserverEntry` in the `detail` property.

### `viewport:leave`

Emitted every time the element leaves the viewport. Returns the `InterSectionObserverEntry` in the `detail` property.

## Caveats

This is a very basic implementation that does not (yet) share IntersectionObservers, so you may issue slight performance issues if you have a lot of elements using this action.

It also doesn't yet support a `number[]` threshold for multiple events based on a visible percentage.

Both the above caveats are planned for a future version.
