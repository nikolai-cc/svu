<script lang="ts">
	import { active } from '$lib/action';
	import { page } from '$app/stores';

	// Page is a readable store, but the mocked page is writable. This way we can easily fake a navigation event.
	const fakePageNavigation = () => {
		//@ts-ignore
		page.update((p) => ({ ...p, url: new URL('http://svu.dev/inactive') }));
	};
</script>

<nav>
	<a id="active" href="/" use:active>Active</a>
	<a id="inactive" href="/inactive" use:active on:click|preventDefault={fakePageNavigation}>
		Inactive
	</a>
</nav>
