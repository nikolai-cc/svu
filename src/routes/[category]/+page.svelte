<script lang="ts">
	import { page } from '$app/stores';

	export let data;

	$: pages = data.pages;
</script>

<article>
	<h1>Category: {$page.params.category}</h1>
	<p>Choose a module for more information:</p>
	<ul>
		{#each pages as slug}
			<li>
				<a href="/{$page.params.category}/{slug}">{slug}</a>
			</li>
		{/each}
	</ul>
</article>

<style>
	article {
		padding: 1rem;
	}
</style>
