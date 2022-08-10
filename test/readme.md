# Testing svu

You'll find everything related to testing in the `/test` folder. In order to fully test every svu we make use of [Vitest](https://vitest.dev) and [Playwright CT](https://playwright.dev/docs/test-components). Vitests allows us to perform code tests, while Playwright allows us to test components and actions in a real browser environment.

## Writing tests

The `test/tests` folder contains all tests. This folder is structured the same way as the `$lib` folder, so if multiple actions are combined in a single module (e.g. `copy` and `paste` are found in `$lib/clipboard`), create a single test folder (`/test/tests/clipboard`) for them as well.

- Files named `*.spec.ts` are run with Playwright CT.
- Files named `*.test.ts` are run with Vitest.

### Testing with Playwright

E.g. in order to test an action, define a `Component.svelte` that implements the action. Import this component in your `action.spec.ts` file test it there.

The real SvelteKit context (and thus `$app`) is not available in these tests. You can import things from `$app` like you would in SvelteKit, though it resolves to `/test/playwright/mock/app`. There you will find a mocked version of the relevant stores. Feel free to add more if you deem it nessecary. Keep in mind that many `readable` stores are implemented as `writable`, in order to enable us to do things like faking browser navigation by updating the `$page` store in order to test the `active` action. Similarly, feel free to change a mocked store from `readable` to `writable` if a test requires it.

### Testing with Vitest

E.g. in order to test a meta function, simply create a `function.test.ts` file that describes your tests.

Similarly to Playwright, no SvelteKit context is available. You will probably not need to import from `$app`, though a mocked variant is available here as well. See also `/test/vitest/setup.ts`.

## Running tests

The following commands are available:

- `npm run test` runs all tests with both Vitest and Playwright.
- `npm run test:vitest` runs Vitest only.
- `npm run test:playwright` runs Playwright only.
- `npm run test:clean` clears the test cache (see below).

## Troubleshooting:

Having trouble testing with Playwright after tweaking a `./Component.svelte` file? This might well be a cache error. You can remove the `/test/playwright/.cache` folder or simply run `npm run test:clean` (which will do that for you).
