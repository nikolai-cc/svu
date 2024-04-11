# Paste

This action pastes the text content of the clipboard into the `textContent` of the element (or the `value` in case of an `HTMLInputElement`). It pastes into the element itself by default, but another element can be passed in.

- See also [use:copy](/docs/action/copy).

## Usage

A common use case is to add a _paste_ button in a form or editor.

```svelte
<script>
	import { paste } from 'svu/action';
	let input;
</script>

<input type="text" placeholder="enter code" bind:this={input} />

<button use:paste={input}>Paste from clipboard.</button>
```

## Options

### `target`

- optional: yes
- type: `HTMLElement | string`
- default value: the element itself

## Events

This action does not dispatch any events.

## Caveats

If the target is not a `HTMLInputElement`, this action pastes into the textContent of the element. This means you cannot use it to paste content that should be parsed as HTML. You probably won't want to do this (because that opens up the possibility of XSS attacks) anyway.

This does not (yet) work on mobile devices.
