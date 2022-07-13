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

	import { log, info, error } from '$lib/app';
	import { console } from '$lib/app';

	let target: HTMLElement;
	let input: HTMLElement;
	let render = false;
	let portalTarget: HTMLElement;
	let height = 2000;

	let observed = 'in';
	let multipress = 'multipress';
	let timedClick = '500-1000ms please';
</script>

<article>
	<h1 use:portal={portalTarget}>Welcome to PORTALkit</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

	<button
		use:timedclick={{ delay: 500, duration: 500 }}
		use:press={{ duration: 1000 }}
		on:timedclick:armed={() => console.info('armed')}
		on:timedclick={() => log('hello world')}
		on:press={() => error('too long!')}
	>
		Press for a length between 500 and 1000ms
	</button>

	<button
		on:pointerdown={() => (multipress = '......0ms')}
		use:press={{ duration: 500, handler: () => (multipress = '...500ms') }}
		use:press={{ duration: 1000, handler: () => (multipress = '..1000ms') }}
		use:press={{ duration: 1500, handler: () => (multipress = '..1500ms') }}
		use:press={{ duration: 2000, handler: () => (multipress = 'DONE!!!!') }}
		on:pointerup={() => (multipress = 'multipress')}
	>
		{multipress}
	</button>

	<button
		use:timedclick={{ delay: 500, duration: 500 }}
		on:timedclick:armed={() => (timedClick = 'release now!')}
		on:timedclick:aborted={() => (timedClick = 'try again')}
		on:timedclick={() => (timedClick = 'DONE!!!!')}
	>
		{timedClick}
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

	<br />

	<input type="text" value="Hi, mom!" use:select />

	<div
		style:height="{height}px"
		style:padding-top="{height / 2}px"
		style:background-color="palegoldenrod"
	>
		<p
			class="watchme"
			use:viewport={{
				// threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
				threshold: 0
			}}
			on:viewport:enter={(e) => {
				console.log('enter', e);
				observed = 'in';
			}}
			on:viewport:leave={(e) => {
				console.log('leave', e);
				observed = 'outside';
			}}
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

	.observer {
		position: fixed;
		bottom: 10px;
		right: 10px;
	}

	.watchme {
		background-color: rebeccapurple;
		color: white;
		height: 100px;
	}
</style>
