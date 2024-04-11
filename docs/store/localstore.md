# Localstore

A writable store that is synced with localstorage. On mount it will read from localstorage and on set it will write to localstorage. It falls back to a standard resettable store

- See also: [resettable](/docs/store/resettable) and [sessionstore](/docs/store/sessionstore)

```svelte
<script>
	import { localstore } from 'svu/store';
	let name = localstore('name', 'Unnamed');
</script>

<input bind:value={$name} />
<button on:click={name.reset}>Reset</button>
```
