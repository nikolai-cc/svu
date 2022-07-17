# `/svu`

`/svu` is a collection of Svelte(Kit) utillities that make developing webapps even more easy and fun.

Read the docs at http://svutil.vercel.app

## Why

Svelte and SvelteKit make web development easy and fun. No wonder it’s the most loved web framework in the world. Although Svelte, especially in conjunction with SvelteKit is fairly batteries-included, there are a bunch of small things they rightfully leave up to the developer.

This package aims to be a collection of all of those small things that bring a little spark of joy to your next Svelte(Kit) app.

## Features

Check out the various parts of the docs:

- [`/action`](http://svutil.vercel.app/docs/action): A huge collection of svelte:actions.

- [`/app`](http://svutil.vercel.app/docs/app): App related utilities.

- [`/client`](http://svutil.vercel.app/docs/client): Client related stores and utils.

- [`/components`](http://svutil.vercel.app/docs/components): Useful components.

- [`/store`](http://svutil.vercel.app/docs/store): Custom stores.

- [`/transition`](http://svutil.vercel.app/docs/transition): Custom transition functions.

## Principles

Some design principles:

- 🥇 `One dependency`

  The utilities by themselves are too small to warrant their own package. In the past, I have manually copied them from project to project for exactly that reason.

- 🔋 `Batteries Included`

  Svutil comes with a actions, stores, utility-functions and more. The real value is in the fact that everything you need is at your fingertips.

- 🪶 `Small sizes please`

  The library is fully tree shakeable so it's safe too include even if you need just one utillity. It won't harm your bundle size.

- ❤️ `Pareto Principle`

  These utilities are designed to solve 80% of usecases with 20% of the code. It might well be that your specific use-case outgrows the capabilities of a specific svutil. No hard feelings! The docs will tell you were to find more elaborate packages, if applicable.

## Status

Svutil started out as a collection of Svelte stuff I often use. Svutil is currently in alpha, while the API settles.

Feel free to take it for a test drive! Be aware that some svutils are not fully production ready, and the API may change in the near future.

If you run into any issues, or have any questions or suggestions, feel free to open an issue on GitHub.
