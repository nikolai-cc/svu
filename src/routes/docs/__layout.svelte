<script context="module" lang="ts">
	import type { LoadEvent } from '@sveltejs/kit';

	export const load = async ({ fetch, url }: LoadEvent) => {
		const path = url.pathname;
		const chapters = await fetch(`${path}.json`);
		const json = await chapters.json();

		return {
			props: {
				path,
				chapters: json.chapters
			}
		};
	};
</script>

<script lang="ts">
	export let path: string;
	export let chapters: string[];
</script>

<nav>
	<ul>
		{#each chapters as chapter}
			<li>
				<a href={`${path}/${chapter}`}>{chapter}</a>
			</li>
		{/each}
	</ul>
</nav>

<article>
	<slot />
</article>

<style>
	article {
		margin: 1rem;
	}
</style>
