<script>
	import { typewriter } from '$lib/transition';
	import { onMount } from 'svelte';

	let frame = 0;
	let started = false;

	onMount(() => {
		setTimeout(animate, 2500);
	});

	let animate = () => {
		if (started) return;
		started = true;
		setTimeout(() => (frame = 1), 0);
		setTimeout(() => (frame = 2), 2000);
		setTimeout(() => (frame = 3), 3500);
		setTimeout(() => (frame = 0), 6500);
		setTimeout(() => (started = false), 6500);
	};
</script>

<h1 style:--cursor={started ? 'not-allowed' : 'pointer'} on:click={animate}>
	<code>
		{#if frame === 1}
			/s<span in:typewriter={{ speed: 150, delay: 250 }} out:typewriter={{ speed: 25 }}
				>vultimate</span
			>
		{:else if frame === 2}
			/s<span in:typewriter={{ speed: 150, delay: 250 }} out:typewriter={{ speed: 25 }}>velte</span>
		{:else if frame === 3}
			/s<span in:typewriter={{ speed: 150, delay: 250 }} out:typewriter={{ speed: 25 }}
				>vutilities</span
			>
		{:else}
			/s<span in:typewriter={{ speed: 150, delay: 250 }} out:typewriter={{ speed: 25 }}>vu</span>
		{/if}
	</code>
</h1>

<style>
	code::after {
		content: '|';
		color: var(--bg4);
		animation: blink 1s infinite;
	}

	code,
	span {
		cursor: var(--cursor);
	}

	code {
		transition: all 150ms ease-in-out;
	}

	code:hover {
		box-shadow: 0 0 10px 10px var(--bg4);
	}

	@keyframes blink {
		0% {
			opacity: 0;
		}
		1% {
			opacity: 1;
		}
		50% {
			opacity: 1;
		}
		51% {
			opacity: 0;
		}
		100% {
			opacity: 0;
		}
	}
</style>
