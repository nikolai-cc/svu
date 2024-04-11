# Resize

Action that adds a `resize` event and optionally calls a handler function when an element is resized. This can be when the size is changed by the user, but also when children are added or removed. Uses ResizeObserver under the hood.

Want to track the window size? Go for the `window` store in `svu/client` or use the window.onresize event.

- See also [window](/docs/client/window)

## Usage

It's commonly used to track the size of an element, but I guess you've figured that out by now.

```svelte
<script>
    import { resize } from 'svu/resize';
    let h = 40;
</script>

<input type="number" bind:value={h} />

<div use:resize on:resize={() => console.log('do something')} style:height="{h}px">
    I will fire an event when I change size.
<div>
```

## Options

This action takes an options object with the following parameters:

### `handler`

The handler to call when the element is resized.

- Optional: yes
- Type: `Function`
- Default value: `noop`

## Events

This action dispatches one event:

### `resize`

Emitted every time the node is resized. Contains a reference to the node in it's detail, which you can use to get the new size (using `node.getBoundingClientRect()` or similar).

## Caveats

Each action generates a new ResizeObserver, which _might_ lead to degraded performance when used in really large numbers, but this is considered an edge case and is as of yet untested.
