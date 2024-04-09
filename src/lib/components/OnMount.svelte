<!--@component
    OnMount component. Renders any children when the page is loaded. Allows to bind to state to check status outside of component.
-->
<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	export let mounted = false;

	onMount(() => (mounted = true));
	onDestroy(() => (mounted = false));
</script>

{#if mounted}
	<slot />
{/if}
