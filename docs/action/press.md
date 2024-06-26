# Press

Dispatches an event and calls an optional handler if an element is _pressed down_ for a certain amount of time. Can be added multiple times in order to have different things happen after different amounts of time.

- See also: [use:timedclick](/action/timedclick)

## Usage

Most commonly used on button elements.

```svelte
<script>
	import { press } from 'svu/action';
	let buttonText = 'Press me for 1s';
	const changeText = () => (buttonText = 'You did it!');
</script>

<button use:press={{ duration: 1000, handler: changeText }}>
	{buttonText}
</button>
```

## Options

You can pass in an `options` object with the following parameters:
You can also pass in a number, which will be interpreted as the duration.

### `duration`

The time in milliseconds how long the element needs to be pressed down for.

- Optional: no
- Type: `number`
- Default value: none

### `handler`

The function to call when the element is pressed down for the specified amount of time.

- Optional: yes
- Type: `function`
- Default value: `noop`

## Events

This action dispatches one event:

### `press`

Emitted when the button has been pressed for `duration` milliseconds. The event payload is the duration of the press. This can be used to distinguish between different events if multiple press actions are added.

## Caveats

This action is fired while the button is pressed down. If you want to release a button after or within a certain time, you will need the [timedclick](/action/timedclick) action.

In order to have a complicated interaction on the button element, you can use the `press` and `timedclick` actions in conjunction with each other. You can also add multiple `press` actions to the same element. The `press` action can also be used with any standard events such as `on:pointerdown` and `on:pointerup`.
