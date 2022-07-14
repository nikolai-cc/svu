<script lang="ts">
	import { active, clickoutside } from '$lib/action';
	import { slide } from '$lib/transition';
	export let links: { name: string; href: string }[];

	export let expanded = false;
	let toggle = () => (expanded = !expanded);
	let collapse = () => (expanded = false);
</script>

<nav in:slide={{ delay: 100, duration: 250 }} class:expanded use:clickoutside={collapse}>
	<div class="header">
		<slot>
			<button on:click={toggle}>
				{expanded ? '⤵' : '⤴'}
			</button>
		</slot>
	</div>
	<ul class:expanded>
		{#each links as { href, name }}
			<li class:expanded>
				<a {href} use:active={{ includeDescendants: true }} on:click>{name}</a>
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
		background-color: var(--b, var(--bg));
	}

	nav::-webkit-scrollbar {
		display: none;
	}

	nav.expanded {
		width: 150px;
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
		transition: transform 500ms ease-in-out, max-height 300ms ease-in-out;
		max-height: 300px;
	}

	li.expanded {
		transform: rotate(-90deg) translateY(-50px);
		max-height: 24px;
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

	button {
		width: 100%;
		height: 36px;
		border: none;
		background-color: var(--b, var(--bg));
		color: var(--fg);
		margin: 0 auto;
		padding: 0;
	}
</style>
