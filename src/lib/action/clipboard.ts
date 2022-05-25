import { listen } from "$lib/meta"

/** Copy the textContent of the element (or a specified target) to clipboard on click. */
export const copy = (node: HTMLElement, target: HTMLElement) => {
    let object = target ?? node;
    const copyObject = () => {
        let text = (object instanceof HTMLInputElement) ? object.value : object.textContent || '';
        navigator.clipboard.writeText(text)
    }

    const unlisten = listen(node, 'click', copyObject);

    return {
        update: (target: HTMLElement) => object = target ?? node,
        destroy: unlisten
    }
}

/** Paste the textContent of the clipboard into the textContent of the element (or a specified target)  on click. */
export const paste = (node: HTMLElement, target: HTMLElement) => {
    let object = target ?? node;

    const pasteObject = async () => { 
        const text = await navigator.clipboard.readText();
        if (object instanceof HTMLInputElement) object.value = text
        else object.textContent = text
    }

    const unlisten = listen(node, 'click', pasteObject);

    return {
        update: (target: HTMLElement) => object = target ?? node,
        destroy: unlisten
    }
}