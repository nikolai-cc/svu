<script lang="ts">
	export let data;

	$: categories = data.categories;
</script>

<article>
	<h1>/SVU</h1>
	<p>Svelte development, supercharged.</p>

	<p>Choose a Category:</p>
	<ul>
		{#each categories as category}
			<li>
				<a href="/{category}">{category}</a>
			</li>
		{/each}
	</ul>
</article>

<style>
	article {
		padding: 1rem;
	}
</style>
