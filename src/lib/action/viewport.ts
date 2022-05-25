export const viewport = (node: HTMLElement, options?: { root?: HTMLElement, rootMargin?: string, treshold?: number }) => {
    options =  {
        root: options?.root,
        rootMargin: options?.rootMargin ?? '0px',
        treshold: options?.treshold ?? 0.5
    }

    const callback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                node.dispatchEvent(new CustomEvent('viewport:enter', { detail: entry }))
            } else {
                node.dispatchEvent(new CustomEvent('viewport:leave', { detail: entry }))
            }
        })
    }

    const observer = new IntersectionObserver(callback, options)
    observer.observe(node)

    return {
        update: () => {
            
        },
        destroy: () => observer.unobserve(node)
    }
}