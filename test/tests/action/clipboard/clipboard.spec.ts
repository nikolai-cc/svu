import Component from './Component.svelte';
import { test, expect } from '@playwright/experimental-ct-svelte';

const clearClipboard = async (page: any) => {
	await page
		.evaluate(() => {
			navigator.clipboard.writeText('');
		})
		.catch(() => {});
};

const setPermissions = async (browserName: string, context: any) => {
	switch (browserName) {
		case 'chromium':
			await context.grantPermissions(['clipboard-read', 'clipboard-write']);
			break;
		case 'firefox':
			console.warn('Skipping test because Firefox does not support clipboard paste operations.');
			test.fail();
			break;
		default:
			break;
	}
};

test('The button should copy/paste from/to itself on click.', async ({
	mount,
	page,
	context,
	browserName
}) => {
	setPermissions(browserName, context);
	await mount(Component);
	clearClipboard(page);

	const copyButtonSelf = page.locator('#copy-button-self');
	const pasteButtonSelf = page.locator('#paste-button-self');

	await copyButtonSelf.click();
	await pasteButtonSelf.click();

	await expect(pasteButtonSelf).toHaveText('Text to copy/paste');
});

test('The button should copy/paste from/to the target selector on click', async ({
	mount,
	page,
	context,
	browserName
}) => {
	if (!setPermissions(browserName, context)) return;
	await mount(Component);
	clearClipboard(page);

	const copyButtonSelector = page.locator('#copy-button-selector');
	const pasteButtonSelector = page.locator('#paste-button-selector');
	const pasteTargetSelector = page.locator('#paste-target-selector');

	await copyButtonSelector.click();
	await pasteButtonSelector.click();

	await expect(pasteTargetSelector).toHaveText('Text to copy/paste');
});

test('The button should copy/paste from/to the target element on click', async ({
	mount,
	page,
	context,
	browserName
}) => {
	if (!setPermissions(browserName, context)) return;
	await mount(Component);
	clearClipboard(page);

	const copyButtonElement = page.locator('#copy-button-element');
	const pasteButtonElement = page.locator('#paste-button-element');
	const pasteTargetElement = page.locator('#paste-target-element');

	await copyButtonElement.click();
	await pasteButtonElement.click();

	await expect(pasteTargetElement).toHaveText('Text to copy/paste');
});
