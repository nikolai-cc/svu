<script context="module" lang="ts">
	import type { LoadEvent } from '@sveltejs/kit';
	export const load = async ({ fetch }: LoadEvent) => {
		const categories = await fetch('/docs/categories.json');
		const json = await categories.json();

		return {
			props: {
				categories: json.categories
			}
		};
	};
</script>

<script lang="ts">
	export let categories: string[];
	const pages = [
		{
			name: 'getting started',
			href: '/quickstart'
		},
		{
			name: 'features',
			href: '/features'
		},
		{
			name: 'changelog',
			href: '/changelog'
		}
	];

	import 'greset';
	import '$docs/css/fonts.css';
	import '$docs/css/global.css';

	import Sidebar from '$docs/Sidebar.svelte';
</script>

<main>
	<Sidebar links={pages}>
		<a href="/" class="logo">
			<code>/s </code>
		</a>
	</Sidebar>
	<Sidebar
		links={[
			...categories.map((category) => ({
				name: category,
				href: `/docs/${category}`
			}))
		]}
	/>
	<slot />
</main>

<style>
	main {
		display: flex;
		flex-direction: row;
		overflow: hidden;
	}

	.logo {
		display: block;
		text-align: center;
	}
</style>
