# Typewriter

This is the typewriter effect from the [Svelte Tutorial](https://svelte.dev/tutorial/custom-js-transitions).

## Usage

It's used on this site to give the `/svu` text on the home page a typed effect.

```svelte
<script>
	import { typewriter } from 'svu/transition';
</script>

{#if condition}
	<div transition:typewriter>This text will be typed.</div>
{/if}
```

## Options

The typewriter transition accepts an options object with the following parameters:

### `delay`

Milliseconds before starting the transition.

- Optional: yes
- Type: `number`
- Default value: `0`

### `speed`

Milliseconds per typed letter. Higher values give a lower type speed.

- Optional: yes
- Type: `number`
- Default value: `100`
