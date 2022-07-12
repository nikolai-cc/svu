<script context="module" lang="ts">
	import type { LoadEvent } from '@sveltejs/kit';

	export const load = async ({ fetch, url }: LoadEvent) => {
		const path = url.pathname;
		const chapters = await fetch(`${path}.json`);
		const json = await chapters.json();

		return {
			props: {
				path: path.split('/')[2],
				chapters: json.chapters
			}
		};
	};
</script>

<script lang="ts">
	import Sidebar from '$docs/Sidebar.svelte';
	export let path: string;
	export let chapters: string[];
</script>

<Sidebar
	links={[
		...chapters.map((chapter) => ({
			name: chapter,
			href: `/docs/${path}/${chapter}`
		}))
	]}
/>

<article>
	<slot />
</article>

<style>
	article {
		max-height: 100vh;
		max-width: 1200px;
		margin-left: auto;
		margin-right: auto;
		padding-left: 2rem;
		padding-right: 2rem;
		padding-top: 3rem;
		padding-bottom: 3rem;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
	}
</style>
