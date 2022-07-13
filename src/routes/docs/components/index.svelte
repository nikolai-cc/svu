<script>
	import { getContext } from 'svelte';
	import { page } from '$app/stores';

	let chapters = getContext('chapters');
</script>

<h1>Components</h1>

<p>Utility components.</p>

<ul>
	{#each chapters as chapter}
		<li>
			<a href="{$page.url.pathname}/{chapter}">
				&lt;{chapter}&gt;
			</a>
		</li>
	{/each}
</ul>
