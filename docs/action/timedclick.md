# Timedclick

Dispatches an event and calls an optional handler if an element is _pressed down_ and _released_ within a certain amount of time. Starts checking after an optional `delay` so can be used for fairly precise timings.

- See also: [use:press](/action/press)

## Usage

Most commonly used on button elements.

```svelte
<script>
	import { timedclick } from 'svu/action';
	let timedClick = "let's go";
</script>

<p>Release the button between 500ms and 1s to trigger the handler</p>
<button
	use:timedclick={{ delay: 500, duration: 500 }}
	on:timedclick:armed={() => (timedClick = 'release now!')}
	on:timedclick:aborted={() => (timedClick = 'try again')}
	on:timedclick={() => (timedClick = 'DONE!!!!')}
>
	{timedClick}
</button>
```

## Options

You can pass in an `options` object with the following parameters:
You can also pass in a number, which will be interpreted as the `duration` (and a `delay` of 0).

### `duration`

The time in milliseconds how long the element needs to be pressed down for. The duration starts counting after the delay has passed. With a delay of 500ms and duration of 500ms, the element needs to be released between 500ms and 1000ms after being pressed down.

- Optional: no
- Type: `number`
- Default value: none

### `delay`

The time in milliseconds after the element has been pressed down before the duration starts counting.

- Optional: yes
- Type: `number`
- Default value: `0`

## Events

This action dispatches three events:

### `timedclick:armed`

Emitted when the 'delay' has passed. Can be used to signal that this is the correct time to release the button.

### `timedclick`

Emitted after the `delay` has passed and before the `duration` is over.

### `timedclick:canceled`

Emitted when the button has been pressed for `duration` milliseconds. The event payload is the duration of the press. This can be used to distinguish between different events if multiple press actions are added.

## Caveats

This action used to handle a timed click event. If you simply want to handle a button that is pressed down fow a certain time, you can better use the [press](/action/press) action.

In order to have a complicated interaction on the button element, you can use the `press` and `timedclick` actions in conjunction with each other. The `timedclick` action can also be used with any standard events such as `on:pointerdown` and `on:pointerup`.
