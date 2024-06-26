# Copy

This action copies the `textContent` of the element (or the `value` in case of a `HTMLInputElement`) to the clipboard. It copies the element itself by default, but another element can be passed in.

- See also [use:paste](/action/paste)

## Usage

A common use case is to add a _click to copy_ button to a code block. You can see it in action in the code blocks in these docs.

```svelte
<script>
	import { copy } from 'svu/action';
</script>

<button use:copy={'#code'}>Copy code block.</button>

<pre id="code">
    <!-- this is your awesome code block -->
</pre>
```

## Options

### `target`

- optional: yes
- type: `HTMLElement | string`
- default value: the element itself

## Events

This action does not dispatch any events.

## Caveats

If the target is not a `HTMLInputElement`, this action copies the textContent of the element. This means its content is not parsed as HTML when copying elements with children, so `<p>` and `<br/>` tags (and associated line breaks) are not preserved.

This does not (yet) work on mobile devices.
