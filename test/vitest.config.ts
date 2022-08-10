import { defineConfig } from 'vitest/config';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
	test: {
		globals: true,
		include: ["test/**/*.test.ts"],
		setupFiles: ['test/vitest/setup.ts'],
	},
	resolve: {
		alias: {
			'$lib': resolve(__dirname, '../src/lib'),
		}
	}
});
