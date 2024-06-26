# Clickoutside

This action dispatches an clickoutside Custom Event and executes an optional handler when the user clicks on any part of the website other than the element itself.

## Usage

A common usage is to close modals by clicking on the background. It's used to collapse the sidebar on this site.

```svelte
<script>
	import { clickoutside } from 'svu/action';

	let modal = true;
</script>

{#if modal}
	<div use:clickoutside={() => (modal = false)}>
		<!-- your awesome modal content here -->
	</div>
{/if}
```

## Options

### `handler`

You can pass in an event handler that is executed every time the clickoutside event is triggered. This will not prevent the clickoutside event to fire, so they can be used in conjunction with each other.

- Optional: yes
- Type: `Function`
- Default value: `null`

## Events

This action dispatches one event:

### `clickoutside`

Emitted every time the user clicks on any part of the website other than the element itself.
