<script lang="ts">
	import '@fontsource-variable/recursive/full.css';
	import '$docs/reset.css';
	import '$docs/base.css';

	import { page } from '$app/stores';
	import { draggable } from '$lib/action/draggable.js';
</script>

<div id="window" use:draggable={{ handle: '#logo', container: 'html' }}>
	<header id="titlebar">
		<div id="logo">/svu</div>
		<div id="address">
			<span class="partial"> https:// </span>
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
			<a href="https://github.com/nikolai-cc/svu">
				<span id="source">
					{'</>'}
				</span>
			</a>
		</div>
	</header>
	<main>
		<slot />
	</main>
</div>

<style>
	#window {
		width: 80vw;
		height: calc(100dvh - 2rem);
		max-width: 800px;
		max-height: 800px;
		margin: auto;
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
		background-color: rgba(255, 255, 255, 0.1);
	}

	#logo {
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		background-color: #323232;
		color: white;
		cursor: grab;
	}

	#logo:active {
		cursor: grabbing;
	}

	#logo:hover,
	#logo:active {
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
		overflow-x: auto;
	}

	a {
		cursor: pointer;
	}

	a:hover {
		color: var(--c);
	}

	#controls {
		display: flex;
		gap: 0.25rem;
		padding: 0.25rem;
	}

	#source {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.5rem;
		height: 1.5rem;
		margin: -0.125rem;
		font-size: 0.667rem;
		border-radius: 100%;
		background-color: #bcbcbc;
		color: white;
	}

	#source:hover {
		background-color: var(--c);
		color: #e0e0e0;
	}
</style>
