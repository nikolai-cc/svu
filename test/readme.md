Vitest vs Playwright

\*.spec.ts == running unit test with playwright
\*.test.ts == running code test with vitest

Having trouble testing with Playwright after tweaking a `./Component.svelte` file? This might well be a cache error. You can remove the `/test/playwright/.cache` folder or simply run `npm run test:clean` (which will do that for you).
