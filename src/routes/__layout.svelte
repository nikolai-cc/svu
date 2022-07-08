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

	import 'greset';
	import '$docs/css/fonts.css';
	import '$docs/css/global.css';
</script>

<aside>
	<nav>
		<ul>
			<li>
				<a href="/">home</a>
			</li>
			<li>
				<a href="/quickstart">getting started</a>
			</li>
			<li>
				<a href="/features">features</a>
			</li>
			<li>
				<a href="/changelog">changelog</a>
			</li>
			<li>---</li>
			{#each categories as category}
				<li>
					<a href={`/docs/${category}`}>{category}</a>
				</li>
			{/each}
		</ul>
	</nav>
</aside>

<main>
	<slot />
</main>

<style>
	aside {
		margin: 1rem;
	}
	main {
		margin: 1rem;
	}
</style>
