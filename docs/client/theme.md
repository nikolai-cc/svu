# Theme

Store to track and change the root element's `data-theme` attribute. It works well with the themetoggle action, but will work equally well with any other theme-change library that sets the `data-theme` attribute on the root element. It's powered by a MutationObserver that checks for any changes to the element.

- See also: [themetoggle](/action/themetoggle)

## Usage

A common usecase is to change the text on the themetoggle button based on the currently active theme. It's used in the theme toggle button at the top of this page.

```svelte
<script>
	import { theme } from 'svu/client';
	import { themetoggle } from 'svu/action';
</script>

<button use:themetoggle={['dark', 'light']}>
	{$theme === 'dark' ? '☀️' : '🌙'}
</button>
```

## Options

this has the following options:

### `option`

changes the behaviour of this thing

- Optional: yes
- Type: `any`
- Default value: `'default`

## Events

this dispatches one event:

### `event`

emitted every time something happens

## Caveats

caveats

## Alternatives

–
