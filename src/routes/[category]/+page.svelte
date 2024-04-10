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
				<a href="{$page.url.href}/{slug}">{slug}</a>
			</li>
		{/each}
	</ul>
</article>

<style>
	article {
		padding: 1rem;
	}

	a:hover {
		text-decoration: underline;
		text-decoration-color: var(--c);
		text-decoration-thickness: 0.25rem;
		text-underline-offset: 0.25rem;
	}

	li::before {
		content: '> ';
		color: var(--c);
	}
</style>
