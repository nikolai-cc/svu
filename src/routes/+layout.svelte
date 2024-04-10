<script lang="ts">
	import '@fontsource-variable/recursive/full.css';
	import '$docs/reset.css';
	import '$docs/base.css';

	import { draggable } from '$lib/action/draggable.js';
</script>

<div id="window" use:draggable={{ handle: '#header', container: 'html' }}>
	<header id="header">
		<div id="logo">/svu</div>
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
	}

	header {
		display: flex;
		justify-content: space-between;
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
		overflow-y: auto;
	}
</style>
