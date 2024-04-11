# Keydown

Execute a function on `keydown`. Pass in a map of key names to functions to execute the function on key.

- See also: [use:keyup](/docs/action/keyup)

## Usage

A common use case is to add keyboard shortcuts, e.g. to close a modal with the escape key.

```svelte
<script>
	import { keydown } from 'svu/action';
	let modal = true;
	let close = () => (modal = false);
</script>

<div on:keydown={{ 'Shift+Escape': close }}>
	<!-- modal closes on shift + escape -->
</div>
```

## Options

This action has one option:

### `keys`

A map of key strings to functions to execute.

The key string is a valid Key string like `'a'` `'Shift` or `'Escape'`. It supports modifiers separated with a `+` sign. The key to test for always comes last. We sanitise modifiers (e.g. change `cmd`, `Win`, or `Super` to `Meta`), if we are unable to match an invalid modifier, it is ignored.

- `Cmd+Shift+A`

  Is a valid key string. (`Cmd` will be interpreted as `Meta`)

- `Shift+A+B`

  Is not a valid key string. This will be interpreted as `Shift+B` (since `A` is treated as an invalid modifier and we are unable to sanitise it into a known value).

- `A+Shift`

  Is not a valid key string. The key to test for should come last. This will be interpreted as `Shift` (since `A` is treated as an invalid modifier and we are unable to sanitise it into a known value).

.

- Optional: no
- Type: `{ [key: string]: Function }`
- Default value: none

## Events

This action does not dispatch any events.

## Caveats

keyboard modifiers (shift, ctrl, alt, meta) are not yet supported.

If you need to handle a function on keyup see [use:keyup](/docs/action/keyup). If you need something to happen while the key is pressed down you can use keydown and keyup in conjunction with each other.
