# Sessionstore

A writable store that is synced with localstorage. On mount it will read from localstorage and on set it will write to localstorage. It falls back to a standard resettable store

- See also: [resettable](/store/resettable) and [localstore](/store/localstore)

```svelte
<script>
	import { sessionstore } from 'svu/store';
	let name = sessionstore('name', 'Unnamed');
</script>

<input bind:value={$name} />
<button on:click={name.reset}>Reset</button>
```
