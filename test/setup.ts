import fs from 'node:fs';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

/**
 * This script sets up tests for playwright
 */

// Making sure .svelte-kit/output is present (needed for playwright to work)
if (!(fs.existsSync('./.svelte-kit/output'))) {
	const run = promisify(exec);
	await run('npm run build');
}