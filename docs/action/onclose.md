# Onclose

Executes an optional function on the window's beforunload event, and displays an _'are you sure?'_ dialog. You can pass in a condition to only execute when the condition is met.

## Usage

A common usecase is to display a confirmation dialog when the user tries to close the window when there are unsaved changes.

```svelte
<script>
	import { onclose } from 'svu/action';
</script>
```

## Options

this has the following options:

### `option`

changes the behaviour of this thing

- Optional: yes
- Type: `any`
- Default value: `'default`

## Events

this dispatches one event:

### `event`

emitted every time something happens
