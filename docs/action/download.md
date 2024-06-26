# Download

Downloads the textContent of an element to a .txt file on click. Uses the element itself by default, but another element can be specified.

## Usage

A common usecase is to add a download button to your page.

```svelte
<script>
	import { download } from 'svu/action';
	let target;
</script>

<p bind:this={target}>This text will be downloaded</p>

<button use:download={target}>download</button>
```

## Options

You can either pass in the `target` option (as seen below) as an `HTMLElement`, or an `options` object with the following properties:

### `target`

changes the behaviour of this thing

- Optional: yes
- Type: `HTMLElement`
- Default value: the element itself

### `name`

The name of the downloaded file (including extension).

- Optional: yes
- Type: `string`
- Default value: `'download.txt'`

## Events

This action does not emit any events.

## Caveats

This currently only supports the 'text/plain' MIME type.

You can not yet pass in the target by query selector, unlike most other svus.
