import { listen } from '$lib/meta';

/** Select the textContent of the element (or a specified target) to clipboard on click. */
export const select = (node: HTMLElement, target: HTMLElement) => {
    let object = target ?? node;
    const selectObject = () => {
        let text = (object instanceof HTMLInputElement) ? object.value : object.textContent || '';
        navigator.clipboard.writeText(text)
    }

    const unlisten = listen(node, 'click', selectObject);

    return {
        update: (target: HTMLElement) => object = target ?? node,
        destroy: unlisten
    }
}