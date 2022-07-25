import Component from './Component.svelte';
import { test, expect } from '@playwright/experimental-ct-svelte';

test('Should change only on click-outside', async ({ mount, page }) => {
	await mount(Component);
	
	const target = page.locator('button');
	const container = page.locator('main');

	await expect(target).toHaveText('unchanged');
	
	await target.click();
	await expect(target).toHaveText('unchanged');
	
	await container.click();
	await expect(target).toHaveText('changed');
});
