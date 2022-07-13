<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/stores';

	const chapters: string[] = getContext('chapters');
</script>

<h1>Action</h1>

<p>Lights, camera, use:action!</p>

<ul>
	{#each chapters as chapter}
		<li>
			<a href="{$page.url.pathname}/{chapter}">
				use:{chapter}
			</a>
		</li>
	{/each}
</ul>
