import type { PlaywrightTestConfig } from '@playwright/experimental-ct-svelte';
import { devices } from '@playwright/experimental-ct-svelte';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * See https://playwright.dev/docs/test-components
 */
const config: PlaywrightTestConfig = {
	testDir: 'tests',
	snapshotDir: '__snapshots__',
	fullyParallel: true,
	testMatch: '**/*.spec.ts',
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	reporter: [['html', { outputFolder: 'playwright/report' }]],
	use: {
		trace: 'on-first-retry',
		ctPort: 3100,
		ctViteConfig: {
			resolve: {
				alias: {
					// Setup the built-in $lib alias in SvelteKit
					$lib: resolve(__dirname, '../src/lib'),
					// Replace $app with our mocked variant.
					$app: resolve(__dirname, 'playwright/mock/app')
				}
			}
		},

		ctTemplateDir: 'playwright/template',
		ctCacheDir: 'playwright/.cache'
	},

	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome']
			}
		},
		{
			name: 'firefox',
			use: {
				...devices['Desktop Firefox']
			}
		},
		{
			name: 'webkit',
			use: {
				...devices['Desktop Safari']
			}
		}
	]
};

export default config;
