<script lang="ts">
	import { copy, paste } from '$lib/action';

	let copyTarget;
	let pasteTarget;
</script>

<div>
	<div id="copy-target-selector">Text to copy/paste</div>
	<div id="paste-target-selector">Unchanged</div>
	<button id="copy-button-selector" use:copy={'#copy-target-selector'}>Copy by selector</button>
	<button id="paste-button-selector" use:paste={'#paste-target-selector'}>Paste by selector</button>
</div>

<div>
	<div id="copy-target-element" bind:this={copyTarget}>Text to copy/paste</div>
	<div id="paste-target-element" bind:this={pasteTarget}>Unchanged</div>
	<button id="copy-button-element" use:copy={copyTarget}>Copy by element</button>
	<button id="paste-button-element" use:paste={pasteTarget}>Paste by element</button>
</div>

<div>
	<button id="copy-button-self" use:copy>Text to copy/paste</button>
	<button id="paste-button-self" use:paste>Unchanged</button>
</div>
