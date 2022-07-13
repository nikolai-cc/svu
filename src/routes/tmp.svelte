<script lang="ts">
	import { viewport } from '$lib/action';
	// @ts-nocheck

	import {
		focus,
		focustrap,
		timedclick,
		draggable,
		copy,
		paste,
		select,
		download,
		active,
		portal,
		press
	} from '$lib/action';

	let target: HTMLElement;
	let input: HTMLElement;
	let render = false;
	let portalTarget: HTMLElement;
	let height = 2000;

	let observed = 'in';
</script>

<article>
	<h1 use:portal={portalTarget}>Welcome to PORTALkit</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

	<button
		use:timedclick={{ delay: 500, duration: 500 }}
		use:press={{ duration: 1000 }}
		on:timedclick={() => console.log('hello world')}
		on:press={() => console.log('too long!')}
	>
		Press for a length between 500 and 1000ms
	</button>

	<input type="checkbox" bind:checked={render} />

	<p style:transform="translateX(30px)" id="haj">hello</p>

	{#if render}
		<div use:focustrap>
			<input disabled />
			<input />
			<input />
			<input />
		</div>
	{/if}

	<input bind:this={input} />

	<div id="kip" style:color="blue" use:draggable bind:this={target}>hello there</div>

	<button use:copy={input}> copy </button>
	<button use:paste={target}> paste </button>
	<button use:select={target}> select </button>

	<button use:download={target}> download </button>

	<a href="/" use:active>home</a>
	<a href="/not" use:active>not</a>
	<a href="/not/home" use:active>not/home</a>
	<a href="/wow" use:active>wow</a>

	<input type="number" bind:value={height} />

	<div
		style:height="{height}px"
		style:padding-top="{height / 2}px"
		style:background-color="palegoldenrod"
	>
		<p
			use:viewport
			on:viewport:enter={() => (observed = 'in')}
			on:viewport:leave={() => (observed = 'outside')}
			style:margin-top="{height / 2}px"
		>
			I am afraid I'm being watched.
		</p>
	</div>

	<p class="observer">
		👮‍♀️ I see that you're {observed} the viewport
	</p>

	<div bind:this={portalTarget}>
		<p>hello there</p>
	</div>
</article>

<style>
	article {
		max-height: 100vh;
		max-width: 1200px;
		margin-left: auto;
		margin-right: auto;
		padding-left: 2rem;
		padding-right: 2rem;
		padding-top: 3rem;
		padding-bottom: 3rem;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
	}

	:global(.active) {
		background-color: red;
		font-weight: bold;
	}

	.observer {
		position: fixed;
		bottom: 10px;
		right: 10px;
	}
</style>
