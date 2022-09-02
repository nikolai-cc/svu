<script lang="ts">
	import { active } from '$lib/action';
	import { onMount } from 'svelte';

	onMount(() => {
		history.replaceState({}, '', '/');
	});

	const fakePageNavigation = () => {
		history.replaceState({}, '', '/inactive');
	};
</script>

<nav>
	<a id="active" href="/" use:active>Active</a>
	<a id="inactive" href="/inactive" use:active on:click|preventDefault={fakePageNavigation}>
		Inactive
	</a>
</nav>
