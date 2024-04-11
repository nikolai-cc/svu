# Log

Various logging utilities that are only used in the dev environment.
Supports all `console.*` functions (log, trace, warn, error).

## Usage

Alternative logging functions, or drop-in replacement for `console.log`, but without having to remove them before moving to prod.

```svelte
<script>
	import { log, error } from 'svu/app'; // use as separate functions
	import { console } from 'svu/app'; // use as drop-in replacement
</script>

<button on:click={() => log('log')}>log</button>
<button on:click={() => console.info('info')}>info</button>
<button on:click={() => error('error')}>error</button>
```

## Functions

- `log()` - wraps `console.log()`
- `trace()` - wraps `console.trace()`
- `debug()` - wraps `console.debug()`
- `info()` - wraps `console.info()`
- `warn()` - wraps `console.warn()`
- `error()` - wraps `console.error()`
- `assert()` - wraps `console.assert()`
- `count()` - wraps `console.count()`
- `countReset()` - wraps `console.countReset()`
- `dir()` - wraps `console.dir()`
- `dirxml()` - wraps `console.dirxml()`
- `clear()` - wraps `console.clear()`

## Caveats

When using the drop-in replacement, currently some console functions (`group*`, `profile*`, `screenshot`, `time*`, `takeHeapSnapshot`) are not available.
