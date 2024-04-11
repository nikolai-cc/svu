# Focus

Focuses the element as soon as it's mounted. Only works on focusable elements.

## Usage

A common usecase is to focus the username field on loading of the login page.

```svelte
<script>
	import { focus } from 'svu/action';
</script>

<input type="text" placeholder="Username" use:focus />
```

## Options

This action has no options.

## Events

This action does not dispatch any events.

## Caveats

Keep accessibility in mind when using this. Suddenly changing focus to an unexpected element can lead to frustrated users.
