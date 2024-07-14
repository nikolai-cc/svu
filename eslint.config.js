import svelte_config from '@sveltejs/eslint-config';

// eslint.config.js
export default [
	...svelte_config,
	{
		rules: {
			'no-duplicate-imports': 'off', // Allows importing types and code separately
			'svelte/no-at-html-tags': 'off', // For markdown
			'no-undef': 'off', // Seems to error with $stores and use:actions in .svelte files
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
			]
		}
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/*', '**/*.d.ts']
	}
];
