<script lang="ts">
	import { page } from '$app/stores';
	const { error, status } = $page;
</script>

<article>
	<h1>{status}</h1>
	<p>
		{error?.message}
	</p>
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
