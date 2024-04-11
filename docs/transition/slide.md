# Slide

This is a drop-in replacement for Svelte's built-in `slide` transition with one difference: it supports horizontally sliding transitions. It transitions horizontally by default, so changing `import { slide } from 'svelte/transition'` to `import { slide } from 'svu/transition'` will change the direction of your transition. You can change the `axis` option from `'x'` to `'y'` to change the direction back to vertical.

## Usage

It's used on this site to slide out the navigation when the user (that would be you) moves between docs pages.

```svelte
<script>
    import { slide } from 'svu/transition';
</script>

{#if condition}
    <div transition:slide="{{ axis: 'x' }}"
        Slides horizontally.
    </div>
{/if}
```

## Options

The slide function accepts an option object with the following parameters:

### `delay`

Milliseconds before starting the transition.

- Optional: yes
- Type: `number`
- Default value: `0`

### `duration`

Transition length in milliseconds.

- Optional: yes
- Type: `number`
- Default value: `400`

### `easing`

The [Svelte easing function](https://svelte.dev/docs#run-time-svelte-easing) to apply.

- Optional: yes
- Type: `function`
- Default value: `cubicOut` – _[more info](https://svelte.dev/examples/easing)_

### `axis`

The direction to slide the element in.

- Optional: yes
- Type: `'x' | 'y'`
- Default value: `'x'`
