import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		exclude: [
			'**/*.spec.ts',
			'**/node_modules/**',
			'**/.svelte-kit/**',
			'**/.{idea,git,cache,output,temp}/**'
		]
	}
});
