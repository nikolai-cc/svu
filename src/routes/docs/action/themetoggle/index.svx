# Themetoggle

Sets the `data-theme` attribute of the `html` element to a theme or the next of a list of themes on click.

- see also: [theme](/docs/client/theme)

## Usage

It's commonly used to toggle the theme of a site between a predefined list. It's used in the theme toggle button at the top of this page.

```svelte
<script>
    import { themetoggle } from 'svu/action'
</script>

<button use:themetoggle="['light', 'dark']">
    Toggle theme
</button>

<button use:themetoggle={"dark"}>
    Set theme to dark
</button>

<style>
    :global([data-theme='light']) {
        background: #fafafa;
    }

    :global([data-theme='dark']) {
        background: #333;
    }
</style>
```

## Options

This takes one option, which can be either a theme or a list of themes. If it's a theme it sets the theme on click, if it's a list it loops through the list.

- Optional: yes
- Type: `string | string[]`
- Default value: `['light', 'dark']`
