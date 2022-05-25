# SVUTIL α(lpha)

This is a collection of various useful Svelte-specific _utilities_, _actions_, _stores_ and _components_ curated by nikolai-cc. Some require SvelteKit specific features (such as the `$app` store), the rest is also usable in vanilla Svelte projects.



## Why

During development of Svelte(Kit) projects, I usually have a number of utility functions stores and actions that I have found to make my life in Svelte projects a bit easier. Due to their small size and often flexible implementation, these do not warrant bein their own package, so I copy over from project to project. For a long time, I have preferred that approach over the inclusion of a bunch of tiny dependencies, but as times change so do humans, and I've started entertaining the idea to bundle them in a single tree-shakeable dependency so that they are always at hand. A sort-of mini personal standard library.



### Status

The library is still under development and currently in alpha. During this stage I'm figuring out how to best collect and categorise utilities, what to include, and what to skip (e.g. I am not sure what to do with the `meta` category). I still need to formalise those and other high(er) level design decisions (e.g. `use:actions` are all lowercase even when consisting of multiple words).

> 🏗 During the *alpha stage* the API *can* and probably **will** change between versions without warning. ⚠️



### Collaboration

As stated in the `why`, currently the primary goal is to combine things *I* use often into a sort of standard library, but if it turns out there is a broader interest for this sort of thing, I am definitely willing to accomodate. So if you are not me but like the idea, want to use it and/or have an opinion, I am open to suggestions. Don't be afraid to open an issue and we'll discuss how to best move forward. 

⚠️ Especially do so before opening a PR since I do not plan to accept any unsolicited PRs during the alpha stage.



## Contents

### Meta

Not Svelte-Specific, used by other svutils. A couple are direct clones from `svelte/internal`.

- [x] function utilities
- [x] event listener utilities
- [x] port of python range function
- [x] object clone
- [x] random functions
- [x] memoize
- [x] debounce



### App

Svelte(Kit) specific utilities

- [x] `log` – Console.log (and other console.x) functions that only log in development mode.



### Action

- [x] `use:clickoutside` - calls handler / dispatches an event when this node is not clicked
- [x] `use:keydown` - calls handler / dispatches an event when a certain key is pressed
- [x] `use:keyup` - calls handler / dispatches an event when a certain key is released
- [x] `use:focus` - sets element focus on mount
- [x] `use:focustrap` - traps focus to element + children
- [x] `use:draggable` - allows an element to be dragged across the screen or inside a viewport
- [ ] `use:scrolldrag` - enable carousel-like horizontal scroll by mouse dragging?
- [ ] `use:dnd` - drag element between multiple containers
- [ ] `use:multitouch` - (multi)touch events and handlers
- [ ] `use:reducedmotion` - provide fallback animation for reduced-motion users
- [ ] `use:select` - select text on click/tap or element focus?
- [x] `use:copy` - copy target to clipboard
- [x] `use:paste` - paste clipboard to target
- [x] `use:download` - provides blob download on click
- [x] `use:press` - emits event / calls callback after certain time pressed (or released)
- [x] `use:timedclick` - emits event / calls handler if button is held down a specified duration
- [x] `use:viewport` - detect wether element is inside the viewport
- [ ] `use:lazyload` - lazy load this element? lazily add properties to element?
- [x] `use:onclose` - adds a handler to the window's beforeunload event and displays the browsers native 'are you sure?' modal.
- [ ] `use:validate` - input validation?
- [x] `use:active` - toggle class to a link based on wether the current path == or contains the links src?
- [x] `use:portal` - mounts children to another place in the dom (e.g. to define modals in context but mount them in a top layer)



### Store

- [x] resettable store
- [x] localstore - store that's synced with localstorage
- [ ] paramstore - store that's synced with URL search params
- [ ] hashstore - store that returns hashed version of param after assignment



### Client

- [x] window - window size
- [x] mouse - mouse position
- [x] scroll - scroll position

- [ ] modifier - available modfier keys for the os for use in kb-shortcuts and labels (cmd vs ctrl etc)
- [ ] os?
- [ ] breakpoints?



### Components

- [x] `<OnMount>` - mounts children on page / parent mount (e.g. so their intro animations play)



---

---



### Braindump for future ideas

- uuid generation
- global event loop (?) / requestAnimationFrame (?)
- animation functions (?)

- set actions?? classes on body element
- guard - simple env-based password protected page?
- notifications (in-page such as toast or in-os)?
- modals?
- focus trap?
