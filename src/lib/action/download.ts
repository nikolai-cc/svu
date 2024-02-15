import { listen } from '../meta/index.js';

export interface UseDownloadOptions {
	name?: string;
	type?: string;
	data?: string | Record<string, unknown>;
	formatted?: boolean;
}

/**
 * Downloads the passed-in `options.data` to a file when the element is clicked.
 * Pass an object to `options.data` and download it as `JSON`, or pass in a string and choose your own MIME type using `options.type`.
 * Set `options.formatted` to `true` to format the JSON (default is minimised).
 * The `options.name` parameter sets the filename including the extension (default is `download.txt`).
 *
 * Example:
 * ```svelte
 * <button use:download={{name: 'data.json', data: { "hello": "world" }, formatted: true}}>Download</button>
 */
export function download(node: HTMLElement, options?: UseDownloadOptions) {
	let { name = 'download.txt', type, data = '' } = options || {};

	type = type || typeof data === 'object' ? 'application/json' : 'text/plain';
	let spaces = options?.formatted ? 2 : 0;

	function downloadFile() {
		let blob;
		if (typeof data === 'object') {
			blob = new Blob([JSON.stringify(data, null, spaces)], { type });
		} else {
			blob = new Blob([data], { type });
		}
		const url = URL.createObjectURL(blob);
		console.log({ url });
		const a = document.createElement('a');
		a.href = url;
		a.download = name;
		a.click();
		URL.revokeObjectURL(url);
	}

	const unlisten = listen(node, 'click', downloadFile);

	return {
		update: (options: UseDownloadOptions) => {
			name = options.name || 'download';
			type = options.type || 'text/plain';
			data = options.data || '';
			spaces = options.formatted ? 2 : 0;
		},
		destroy: unlisten
	};
}
