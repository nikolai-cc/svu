import { readdir } from 'fs/promises';

/**
 * Returns a list of files and/or directories in a directory.
 */
export const ls = async (path: string, types: 'all' | 'files' | 'dirs' = 'all') => {
	const dir = await readdir(path, { withFileTypes: true });
	if (types === 'files') return dir.filter((d) => !d.isDirectory()).map((d) => d.name);
	if (types === 'dirs')
		return dir.filter((d) => d.isDirectory() && !d.name.startsWith('[')).map((d) => d.name);
	return dir.map((d) => d.name);
};
