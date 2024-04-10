<script lang="ts">
	import '@fontsource-variable/recursive/full.css';
	import '$docs/reset.css';
	import '$docs/base.css';

	import { page } from '$app/stores';
	import { draggable } from '$lib/action/draggable.js';
</script>

<div id="window" use:draggable={{ handle: '#titlebar', container: 'html' }}>
	<header id="titlebar">
		<div id="logo">/svu</div>
		<div id="address">
			<span class="partial">
				<a href="/"> svu </a>
			</span>
			{#if $page.params.category}
				<span class="seperator">/</span>
				<span class="partial">
					<a href="/{$page.params.category}">
						{$page.params.category}
					</a>
				</span>
			{/if}
			{#if $page.params.slug}
				<span class="seperator">/</span>
				<span class="partial">
					<a href="/{$page.params.category}/{$page.params.slug}">
						{$page.params.slug}
					</a>
				</span>
			{/if}
		</div>
		<div id="controls">
			<button id="minimize">_</button>
			<button id="maximize">[]</button>
			<button id="close">X</button>
		</div>
	</header>
	<main>
		<slot />
	</main>
</div>

<style>
	#window {
		max-width: 800px;
		width: 80%;
		height: calc(100dvh - 2rem);
		margin: 1rem auto;
		border-radius: 0.25rem;
		background-color: rgba(255, 255, 255, 0.25);
		border: 2px solid #323232;
		backdrop-filter: blur(0.25rem);
		-webkit-backdrop-filter: blur(0.25rem);
		overflow: hidden;
	}

	header {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		border-bottom: 2px solid #323232;
		padding: 0.5rem;
		cursor: grab;
		background-color: rgba(255, 255, 255, 0.1);
	}

	header:active {
		cursor: grabbing;
	}

	#logo {
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		background-color: #323232;
		color: white;
	}

	header:hover #logo,
	header:active #logo {
		font-weight: bold;
		color: var(--c);
	}

	main {
		height: calc(100% - 2rem);
		overflow-y: auto;
	}

	#address {
		display: flex;
		gap: 0.25rem;
		padding: 0.25rem 1rem;
		background-color: #e0e0e0;
		flex: 1;
		border-radius: 0.25rem;
		color: #bcbcbc;
		cursor: default;
	}

	a {
		cursor: pointer;
	}

	a:hover {
		color: var(--c);
	}
</style>
