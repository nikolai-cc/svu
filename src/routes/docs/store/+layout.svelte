<script lang="ts">
	import Article from '$docs/Article.svelte';
	import Sidebar from '$docs/Sidebar.svelte';

	export let data;
	const { path, chapters } = data;

	import { setContext } from 'svelte';

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
