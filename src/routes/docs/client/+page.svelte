<script>
	import { getContext } from 'svelte';
	import { page } from '$app/stores';

	let chapters = getContext('chapters');
</script>

<h1>Client</h1>

<p>Client related stores and utils.</p>

<ul>
	{#each chapters as chapter}
		<li>
			<a href="{$page.url.pathname}/{chapter}">
				{chapter}
			</a>
		</li>
	{/each}
</ul>
