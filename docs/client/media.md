# Media

A collecion of mediaquery based stores.

## Motion

### motionOK

`$motionOK` is true when `prefers-reduced-motion` is `no-preference`.

### reduceMotion

`$reduceMotion` is true when `prefers-reduced-motion` is `reduce`.

## Media

### print

`$print` is true when the page is (pre)viewed for printing.

### screen

`$screen` is true when the page is viewed on a screen;

## Orientation

### landscape

`$landscape` is true when the viewport is wider than it is tall;

### portrait

`$portrait` is true when the viewport is taller than it is wide;

## Color Scheme

### dark

`$dark` is true when the user has `prefers-color-scheme` set to `dark`.

### light

`$light` is true when the user has `prefers-color-scheme` set to `light`.

## Contrast

### highContrast

`$highContrast` is true when the user has `prefers-contrast` set to `high`.

### lowContrast

`$lowContrast` is true when the user has `prefers-contrast` set to `low`.

### defaultContrast

`$defaultContrast` is true when the user has `prefers-contrast` set to `default`.

## Pointer

### hover

`$hover` is true when the device can display a hover state. (You can do so with a mouse, but not with a finger + touchscreen.)

### noPointer

`$noPointer` is true the client does not have a pointer available.

### coarsePointer

`$coarsePointer` is true when the client has a coarse pointer (e.g. a finger) available.

### finePointer

`$finePointer` is true when the client has a fine pointer (e.g. a mouse) available.
