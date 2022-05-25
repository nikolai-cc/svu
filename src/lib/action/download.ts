import { listen } from "$lib/meta"

/** Download the textContent of the element (or a specified target) to clipboard. */
export const download = (node: HTMLElement, options?: { target?: HTMLElement, name?: string } | HTMLElement) => {
    let object = (options instanceof HTMLElement) ? options : options?.target ?? node;
    let name = (options instanceof HTMLElement) ? "download.txt" : options?.name ?? "download.txt";

    const downloadObject = () => { 
        const blob = new Blob([object.textContent || ''], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
     }

    const unlisten = listen(node, 'click', downloadObject);

    return {
        update: (options?: { target?: HTMLElement, name?: string } | HTMLElement) => {
            object = (options instanceof HTMLElement) ? options : options?.target ?? node;
            name = (options instanceof HTMLElement) ? "download.txt" : options?.name ?? "download.txt";
        },
        destroy: unlisten
    }
}