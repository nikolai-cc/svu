<script>
	import { getContext } from 'svelte';
	import { page } from '$app/stores';

	let chapters = getContext('chapters');
</script>

<h1>Transition</h1>

<p>For when the built-in transitions are just not enough.</p>

<ul>
	{#each chapters as chapter}
		<li>
			<a href="{$page.url.pathname}/{chapter}">
				transition:{chapter}
			</a>
		</li>
	{/each}
</ul>
