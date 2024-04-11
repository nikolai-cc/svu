# Draggable

Allows positioning of an element by dragging it with the pointer. Drag any part of the element by default, but optionally enter a handle element to restrict drag to that element. Update the `pos` property from anywhere to programmatically reposition the element.

Uses `translate3d` to improve performance.

## Usage

A common usecase is to add fun!

```svelte
<script>
	import { draggable } from 'svu/action';
</script>

<div use:draggable>Drag me around!</div>
```

## Options

You can pass in an `options` object with the following parameters:

### `pos`

The initial position of the element. You can change the position programmatically by updating the `pos` property.

- Optional: yes
- Type: `{ x: number, y: number }`
- Default value: `{ x: 0, y: 0 }`

### `handle`

## Events

This action dispatches three events:

### `drag:start`

Emitted when the drag event is initialised.

### `drag:update`

Emitted when the element is dragged. The event object contains the current position of the element. When updating the position of the element programmatically, you can use this event to update the position of the element while it's dragged.

### `drag:end`

Emitted when the element is released. The event object contains the current position of the element. When updating the position of the element programmatically, you can use this event to update the position of the element after it's dragged.
