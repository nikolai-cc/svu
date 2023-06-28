<script>
	import { getContext } from 'svelte';
	import { page } from '$app/stores';

	let chapters = getContext('chapters');
</script>

<h1>Store</h1>

<p>Custom stores with extra functions.</p>

<ul>
	{#each chapters as chapter}
		<li>
			<a href="{$page.url.pathname}/{chapter}">
				${chapter}
			</a>
		</li>
	{/each}
</ul>
