<script lang="ts">
	import { theme } from '$lib/client';
	import { themetoggle } from '$lib/action';

	export let data;
	let { categories } = data;

	const pages = [
		{
			name: 'why',
			href: '/why'
		},
		{
			name: 'quickstart',
			href: '/quickstart'
		},
		{
			name: 'changelog',
			href: '/changelog'
		}
	];

	import '$docs/css/reset.css';
	import '$docs/css/fonts.css';
	import '$docs/css/global.css';
	import '$docs/css/prism.css';

	import Sidebar from '$docs/Sidebar.svelte';
</script>

<main>
	<Sidebar links={pages} --b="var(--bg4)" logo />
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

<button use:themetoggle={['dark', 'light']}>
	{$theme === 'dark' ? '☀️' : '🌙'}
</button>

<style>
	main {
		display: flex;
		flex-direction: row;
		overflow: hidden;
	}

	button {
		background: var(--dark);
		border: 2px solid var(--fg);
		padding: 0.25rem;
		border-radius: 50%;
		position: fixed;
		top: 8px;
		right: 16px;
		font-size: 16px;
	}
</style>
