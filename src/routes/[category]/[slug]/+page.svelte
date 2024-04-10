<script lang="ts">
	import { marked } from 'marked';

	export let data;

	$: content = marked(data.doc.content);
</script>

<article>
	{@html content}
</article>

<style>
	article {
		padding: 1rem;
	}
</style>
