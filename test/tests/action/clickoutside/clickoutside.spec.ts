import Component from './Component.svelte';
import { test, expect } from '@playwright/experimental-ct-svelte';

test('ClickOutside event should only fire on click outside of target node.', async ({ mount, page }) => {
	await mount(Component);
	
	const target = page.locator('button');
	const container = page.locator('main');
	const eventTarget = page.locator('#event-target')
	
	await expect(eventTarget).toHaveText('unchanged');
	
	await target.click();
	await expect(eventTarget).toHaveText('unchanged');
	
	await container.click();
	await expect(eventTarget).toHaveText('changed');
});

test('ClickOutside callback should only fire on click outside of target node.', async ({ mount, page }) => {
	await mount(Component);
	
	const target = page.locator('button');
	const container = page.locator('main');
	const callbackTarget = page.locator('#callback-target')
	
	await expect(callbackTarget).toHaveText('unchanged');
	
	await target.click();
	await expect(callbackTarget).toHaveText('unchanged');
	
	await container.click();
	await expect(callbackTarget).toHaveText('changed');
});