<script lang="ts">
	export let data;

	$: categories = data.categories;
</script>

<article>
	<h1>/svu</h1>
	<p>Svelte development, supercharged.</p>
	<p>
		svu started out as a collection of svelte-related utilities I copied from project to project.
		svu is currently in alpha, while the API settles. If you run into any issues, or have any
		questions or suggestions, feel free to open an issue
		<a href="https://github.org/nikolai-cc/svu">on GitHub</a>.
	</p>
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
