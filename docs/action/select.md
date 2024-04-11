# Select

Selects the content of the element (or a specified target) on click. If the element is an input element, it selects the value, otherwise it selects all childNodes (text and elements).

## Usage

A common usecase is to select the content of a `<input>` element.

```svelte
<script>
	import { select } from 'svu/action';
	let value = 'initial value';
</script>

<input type="text" bind:value use:select />
```

## Options

This action has one option:

### `target`

The element whose content should be selected. If not specified, the element itself is used.

- Optional: yes
- Type: `HTMLElement`
- Default value: The node itself.

## Events

This action does not dispatch any events.

## Caveats

This action does not yet support passing in a target using a query selector, unlike many other svus.
