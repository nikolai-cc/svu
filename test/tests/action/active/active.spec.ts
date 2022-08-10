import Component from './Component.svelte';
import { test, expect } from '@playwright/experimental-ct-svelte';

test('Action class should be given to the correct link.', async ({ mount, page }) => {
	await mount(Component);

	const activeLink = page.locator('#active');
	const inactiveLink = page.locator('#inactive');

	await expect(activeLink).toHaveClass('active');
	await expect(inactiveLink).not.toHaveClass('active');

	await inactiveLink.click();

	await expect(activeLink).not.toHaveClass('active');
	await expect(inactiveLink).toHaveClass('active');
});