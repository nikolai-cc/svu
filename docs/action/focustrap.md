# Focustrap

Traps focus within an element. Only works on focusable elements. Releases focus when the element is unmounted or the `escape` key is pressed.

## Usage

A common usecase is to trap focus within a modal dialog.

```svelte
<script>
	import { focustrap } from 'svu/action';
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
