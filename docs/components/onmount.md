# OnMount

The `<OnMount>` component is a component that renders its contents when the page is loaded. It's a shorthand for setting a variable 'mounted' to true in the `onMount()` lifecycle function.

```svelte
<script>
	import OnMount from 'svu/components';
</script>

<OnMount>
	<p>I am not prerendered!</p>
</OnMount>
```
