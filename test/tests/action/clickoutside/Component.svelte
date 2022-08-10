<script lang="ts">
	import { clickoutside } from '$lib/action/clickoutside';

	let callbackText = 'unchanged';
	let eventText = 'unchanged';
</script>

<p id="event-target">{eventText}</p>
<p id="callback-target">{callbackText}</p>

<main>
	<button
		use:clickoutside={() => (callbackText = 'changed')}
		on:clickoutside={() => (eventText = 'changed')}
	>
		Click outside me.
	</button>
</main>
