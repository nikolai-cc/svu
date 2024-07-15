import { runAll, type Fn } from '$lib/meta/fn.js';
import { listen } from '../meta/event.js';
import type { ActionReturn } from 'svelte/action';
import { getElement, type ElementOrSelector } from '$lib/meta/element.js';

export type DropZoneError =
	| 'too-many-files'
	| 'invalid-mime-type'
	| 'no-files-dropped'
	| 'file-too-large';

export interface UseDropzoneOptions {
	files?: File[];
	mime?: string;
	limit?: number;
	replace?: boolean;
	maxFileSize?: number;
	uploadButton?: ElementOrSelector;
	resetButton?: ElementOrSelector;
	dragClass?: string;
	dropClass?: string;
	limitClass?: string;
	invalidClass?: string;
}

export interface Attributes {
	'on:!drop'?: (event: CustomEvent<File[]>) => void;
	'on:!drop:invalid'?: (event: CustomEvent<DropZoneError>) => void;
	'on:!drop:limit'?: (event: CustomEvent<File[]>) => void;
}

function setupButton(node: HTMLElement, action: EventListener) {
	node.style.cursor = 'pointer';
	node.setAttribute('tabindex', '0');
	node.setAttribute('role', 'button');

	const clickEvent = listen(node, 'click', action);
	const keydownEvent = listen(node, 'keydown', action);

	return [clickEvent, keydownEvent];
}

function removeButtonMeta(node: HTMLElement, unlisteners: Fn[]) {
	node.style.cursor = '';
	node.removeAttribute('tabindex');
	node.removeAttribute('role');
	runAll(unlisteners);
}

/**
 * Dropzone for files. Emits events when files are dropped or when the drop fails.
 *
 * Pass an object to `options.files` to change the files programmatically. Setting `options.files` to an empty array will reset the dropzone.
 *
 * Set `options.mime` to limit the accepted file types.
 * Set `options.limit` to limit the number of files that can be dropped. Set to 0 for no limit.
 * Set `options.replace` to `false` to add files when new files are dropped instead of replacing them. This option is only used when `options.limit` is set to anything other than 1.
 * Set `options.maxFileSize` to limit the size of the files that can be dropped. The value is per file and is in bytes.
 * Pass an element or a selector string to `options.uploadButton` to trigger the file browser when clicked. When no element is passed, the dropzone itself will be clickable.
 * Pass an element or a selector string to `options.resetButton` to reset the dropzone when clicked.
 * It is recommended to pass in button elements for both `options.uploadButton` and `options.resetButton`, though dropzone will attempt to set appropriate attributes for accessibility.
 *
 * Emits a `!drop` event with the `FileList` when files are dropped.
 * Emits a `!drop:invalid` event with the error message when the drop fails (e.g. too many files).
 * Emits a `!drop:limit` event with the `FileList` when the dropzone has reached the file limit (`options.limit`).
 *
 * The dropzone will add the class `options.dragClass` (`svu-dragover` by default) while files are dragged over the dropzone.
 * The dropzone will add the class `options.dropClass` (`svu-dropped` by default) when files are dropped.
 * The dropzone will add the class `options.limitClass` (`svu-droplimit` by default) when the dropzone has reached the file limit (`options.limit`).
 * The dropzone will add the class `options.invalidClass` (`svu-invalid` by default) when the drop fails.
 *
 * Example:
 * ```svelte
 * <div use:dropzone={{mime: 'image/*', limit: 4}}>
 *   Drop files here
 * </div>
 * ```
 */
export function dropzone(
	node: HTMLElement,
	options?: UseDropzoneOptions
): ActionReturn<UseDropzoneOptions, Attributes> {
	let files = options?.files ? options.files : [];
	let mime = options?.mime || '';
	let limit = options?.limit || 0;
	let replace = options?.replace !== undefined ? options.replace : true;
	let maxFileSize = options?.maxFileSize || Infinity;
	let uploadButton = getElement(options?.uploadButton, node);
	let resetButton = getElement(options?.resetButton);
	let dragClass = options?.dragClass || 'svu-dragover';
	let dropClass = options?.dropClass || 'svu-dropped';
	let limitClass = options?.limitClass || 'svu-droplimit';
	let invalidClass = options?.invalidClass || 'svu-invalid';

	function reset() {
		node.classList.remove(dragClass, dropClass, invalidClass, limitClass);
		files = [];
	}

	function invalid(e: DropZoneError) {
		node.classList.add(invalidClass);
		node.dispatchEvent(new CustomEvent('!drop:invalid', { detail: e }));
	}

	function handleFileList(list: FileList | null) {
		// no files dropped
		if (!list || list.length === 0) {
			return invalid('no-files-dropped');
		}

		// too many files
		if (limit && list.length > limit) {
			return invalid('too-many-files');
		}

		// too many files
		if (limit && !replace && files.length + list.length > limit) {
			return invalid('too-many-files');
		}

		// change FileList to Array so we can use Array methods
		const newFiles = Array.from(list);

		// file too large
		if (newFiles.some((file) => file.size > maxFileSize)) {
			return invalid('file-too-large');
		}

		// invalid file type
		if (mime && !newFiles.every((file) => file.type.match(mime))) {
			return invalid('invalid-mime-type');
		}

		// add new files
		files = replace ? newFiles : [...files, ...newFiles];

		node.classList.add(dropClass);
		node.dispatchEvent(new CustomEvent('!drop', { detail: files }));

		if (limit && files.length >= limit) {
			node.classList.add(limitClass);
			node.dispatchEvent(new CustomEvent('!drop:limit', { detail: files }));
		}
	}

	function fileBrowser(event: PointerEvent | KeyboardEvent) {
		if (event instanceof KeyboardEvent && event.key !== 'Enter') return;
		event.preventDefault();

		const input = document.createElement('input');
		input.type = 'file';
		input.accept = mime;
		input.multiple = limit !== 1;

		const unlistenFileChange = listen(input, 'change', () => {
			handleFileList(input.files);
			unlistenFileChange();
			input.remove();
		});

		input.click();
	}

	function dropFiles(event: DragEvent) {
		event.preventDefault();
		node.classList.remove(dragClass);

		// check if there are files to add
		if (event.dataTransfer && event.dataTransfer.files) {
			handleFileList(event.dataTransfer.files);
		} else {
			invalid('no-files-dropped');
		}
	}

	function dragOver(event: DragEvent) {
		event.preventDefault();
		node.classList.add(dragClass);
	}

	function dragLeave(event: DragEvent) {
		event.preventDefault();
		node.classList.remove(dragClass);
	}

	const unlistenDrop = listen(node, 'drop', dropFiles as EventListener);
	const unlistenDragOver = listen(node, 'dragover', dragOver as EventListener);
	const unlistenDragLeave = listen(node, 'dragleave', dragLeave as EventListener);

	let uploadEvents = setupButton(uploadButton, fileBrowser as EventListener);
	let resetEvents = resetButton ? setupButton(resetButton, reset) : [];

	return {
		update: (options: UseDropzoneOptions) => {
			mime = options.mime || mime;
			limit = options.limit || limit;
			replace = options.replace !== undefined ? options.replace : replace;
			maxFileSize = options.maxFileSize || maxFileSize;

			dragClass = options.dragClass || dragClass;
			dropClass = options.dropClass || dropClass;
			limitClass = options.limitClass || limitClass;
			invalidClass = options.invalidClass || invalidClass;

			if (options.files === undefined || options.files.length === 0) {
				reset();
			} else if (options.files !== files) {
				files = options.files;

				node.classList.add(dropClass);

				if (limit && files.length >= limit) {
					node.classList.add(limitClass);
				} else {
					node.classList.remove(limitClass);
				}
			}

			if (options.resetButton !== resetButton) {
				resetButton && removeButtonMeta(resetButton, resetEvents);
				resetButton = getElement(options.resetButton, node);
				resetEvents = setupButton(resetButton, reset);
			}

			if (options.uploadButton !== uploadButton) {
				removeButtonMeta(uploadButton, uploadEvents);
				uploadButton = getElement(options.uploadButton, node);
				uploadEvents = setupButton(uploadButton, fileBrowser as EventListener);
			}
		},
		destroy() {
			unlistenDrop();
			unlistenDragOver();
			unlistenDragLeave();
			removeButtonMeta(uploadButton, uploadEvents);
			resetButton && removeButtonMeta(resetButton, resetEvents);
		}
	};
}
