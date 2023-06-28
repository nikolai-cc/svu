<script lang="ts" context="module">
	import type { LoadEvent } from '@sveltejs/kit';

	export const load = ({ error, status }: LoadEvent) => {
		return {
			props: {
				error,
				status
			}
		};
	};
</script>

<script lang="ts">
	export let error: Error;
	export let status: number;

	console.log(error);
</script>

<article>
	<h1>{status}</h1>
	<p>
		{error.message}
	</p>
	<pre>{error.stack}</pre>
</article>

<style>
	article {
		flex: 1;
		padding: 2rem;
		height: 100%;
		width: 100%;
		overflow-y: auto;
	}
</style>
