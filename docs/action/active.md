# Active

This action adds a class to an element when the URL of the page matches a given pattern. When used on an element with a `href` attribute, it uses it's value by default.

## Usage

A common usecase is to add a different styling to the link of the currently active page in a navigation component. This is how it's used in the navigation in these.

```svelte
<script>
	import { active } from 'svu/action';
</script>

<nav>
	<a use:active href="/">Home</a>
	<a use:active href="/docs">Docs</a>
	<a use:active href="/contact">Contact</a>
</nav>

<style>
	:global(a.active) {
		color: red;
	}
</style>
```

## Options

Pass in options with `<a use:active={options}>`

`options` is an object with the following parameters:

### `className`

Name of the class that is added to the active element.

- Optional: yes
- Type: `string`
- Default value: `'active'`

### `includeDescendants`

If this is set to false, the className is added on an exact match to the path. If it's set to true, it's added on routes that include the path or any of its descendants.

- Optional: yes
- Type: `boolean`
- Default value: `false`

### `path`

The path to match the URL to.

- Optional: yes
- Type: string
- Default: same as `href` attribute if present, otherwise `'/'`

## Events

This action dispatches no events.

## Caveats

Since the class is added programatically, the svelte compiler does not know about it and it is not scoped to the component.
The styling has to be done in a global css file or with the `:global(.className)` selector.
You'll have to make sure to pick a `className` that does not interfere with any other styles in your app.

The current matcher for the `includeDescendants` route is a simple string comparison to the `url.pathname`, which can result in unwanted behaviour when there are multiple pages with the same name. For example: When we have both a link to `/foo` and to `/bar/foo/baz` in our nav, the link to `/foo` will be set to active when we're on the `/bar/foo/baz` route.
