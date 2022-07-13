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
	import Article from '$docs/Article.svelte';
	import Sidebar from '$docs/Sidebar.svelte';
	import { setContext } from 'svelte';
	export let path: string;
	export let chapters: string[];

	setContext('chapters', chapters);
</script>

<Sidebar
	links={[
		...chapters.map((chapter) => ({
			name: chapter,
			href: `/docs/${path}/${chapter}`
		}))
	]}
	--b="var(--bg2)"
/>

<Article>
	<slot />
</Article>
