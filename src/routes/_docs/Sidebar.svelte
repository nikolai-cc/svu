<script lang="ts">
	import { active } from '$lib/action';
	export let links: { name: string; href: string }[];
</script>

<nav>
	<div class="header">
		<slot />
	</div>
	<ul>
		{#each links as { href, name }}
			<li>
				<a {href} use:active={{ includeDescendants: true }}>{name}</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		height: 100vh;
		width: 36px;
		flex-shrink: 0;
		border-right: 2px solid black;
		overflow-y: auto;
		-ms-overflow-style: none;
		scrollbar-width: none;
		transition: width 500ms ease-in-out;
		padding-top: 0.5rem;
		padding-bottom: 3rem;
		background-color: var(--b, --bg);
	}

	nav::-webkit-scrollbar {
		display: none;
	}

	.header {
		height: 36px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	ul,
	li {
		list-style: none;
		margin: none;
		padding: none;
	}

	ul {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
	}

	li {
		writing-mode: vertical-rl;
		transition: transform 500ms ease-in-out;
	}

	a {
		white-space: nowrap;
	}

	a::before {
		content: '/';
	}

	a:active::before {
		content: '|';
	}
</style>
