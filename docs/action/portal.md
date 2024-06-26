# Portal

Mount a component elsewhere in the DOM. Pass in the DOM node to mount it to.

## Usage

A common usecase is to mount a modal dialog to a top level element while keeping the modal logic in the relevant component.

```svelte
<script>
    import { portal } from 'svu/action'
</script>

<div use:portal="#modal-container">
    <!-- your awesome modal content -->
</div>
```

## Options

This action has one option:

### `target`

The DOMnode to mount the component to. Can be passed in by Element or query selector.

- Optional: no
- Type: `HTMLElement | string`
- Default value: none

## Events

This action does not emit any events.
