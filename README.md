# /svu

Svelte development, supercharged.

svu started out as a collection of svelte-related utilities I copied from project to project. svu is currently in alpha, while the API settles. If you run into any issues, or have any questions or suggestions, feel free to open an issue on GitHub.

## Features

Check out the various parts of the docs:

- [`/action`](http://svu.vercel.app/docs/action): A huge collection of svelte:actions.

- [`/app`](http://svu.vercel.app/docs/app): App related utilities.

- [`/client`](http://svu.vercel.app/docs/client): Client related stores and utils.

- [`/components`](http://svu.vercel.app/docs/components): Useful components.

- [`/store`](http://svu.vercel.app/docs/store): Custom stores.

- [`/transition`](http://svu.vercel.app/docs/transition): Custom transition functions.

## Getting Started

1. Install from npm:

```bash
npm i -D svu
```

2. For SvelteKit: add this to your vite.config.js:

This tells Vite to treat this package as part of our application code. We need this because for some SvelteKit `/svu`'s are using SvelteKit utilities like the `$app` syntax.

```js
optimizeDeps: {
    exclude: ['svu', 'svu/*'],
},
ssr: {
    noExternal: ['svu', 'svu/*'],
},
```

3. Import only what you need.

For SvelteKit:

```svelte
<script>
	import { draggable } from 'svu/action';
</script>

<p use:draggable>Be Happy</p>
```

For Svelte:

```svelte
<script>
	import { draggable } from 'svu/svelte/action';
</script>

<p use:draggable>Be Happy</p>
```

Find out wether you need one of our [actions](/docs/action), [custom stores](/docs/stores), [app-related stores](/docs/app), [client-related stores](/docs/client) and [components](/docs/components).

4. <p use:draggable on:drag:start={dragStart} on:drag:end={dragEnd} bind:this={happy} style:transition="all 50ms ease-in-out">Be happy!</p>

## Status

The API is in flux and may change without warning in 0.X.0 updates.
