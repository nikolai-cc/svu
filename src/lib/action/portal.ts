export const portal = (node: HTMLElement, target: HTMLElement | string) => {
    typeof target === 'string' && document.querySelector(target)?.appendChild(node)

    return {
        update: (target: HTMLElement | string) => {
            typeof target === 'string' ? document.querySelector(target)?.appendChild(node) : target.appendChild(node)
        },
        destroy: () => node.parentElement?.removeChild(node)
    }
}