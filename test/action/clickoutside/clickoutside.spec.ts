import Component from './Component.svelte';
import { test, expect } from '@playwright/experimental-ct-svelte';

const outside_selector = 'data-testid=outside';
const foo_selector = 'data-testid=foo';

test('should work', async ({ mount, page }) => {
	await mount(Component);
	await expect(page.locator(foo_selector)).toHaveAttribute('data-where', 'inside');
	await page.locator(foo_selector).click();
	await expect(page.locator(foo_selector)).toHaveAttribute('data-where', 'inside');
	await page.locator(outside_selector).click();
	await expect(page.locator(foo_selector)).toHaveAttribute('data-where', 'outside');
});
