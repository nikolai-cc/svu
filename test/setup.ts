import fs from 'node:fs';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import fg from 'fast-glob';
import { compile } from 'svelte/compiler';

/**
 * This script sets up tests for playwright
 */

// Making sure .svelte-kit/output is present (needed for playwright to work)
if (!(fs.readdirSync('./.svelte-kit/output')?.length > 0)) {
	const run = promisify(exec);
	await run('npm run build');
}

// Compiling all svelte components in test dir
const svelte_components = await fg('./test/**/*/*.svelte');

svelte_components.forEach(compile_svelte_component);

function compile_svelte_component(component_path: string) {
	const source = fs.readFileSync(component_path, 'utf-8');
	const { js } = compile(source);
	const new_path = component_path.replace('.svelte', '.svelte.js');
	fs.writeFileSync(new_path, js.code);
	return new_path;
}
