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
	import { page } from '$app/stores';
	export let categories: string[];
	const pages = [
		{
			name: 'why',
			href: '/why'
		},
		{
			name: 'getting started',
			href: '/quickstart'
		},
		{
			name: 'changelog',
			href: '/changelog'
		}
	];

	import 'greset';
	import '$docs/css/fonts.css';
	import '$docs/css/global.css';
	import '$docs/css/prism.css';

	import Sidebar from '$docs/Sidebar.svelte';
</script>

<main>
	<Sidebar expanded={$page.url.pathname === '/'} links={pages} --b="var(--bg4)">
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
		--b="var(--bg3)"
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
