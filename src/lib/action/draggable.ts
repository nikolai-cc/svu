import { listen } from "$lib/meta"

export const draggable = (node: HTMLElement, options: { pos?: { x: number, y: number }, handle?: HTMLElement } = {}) => {
    let {
        pos = { x: 0, y: 0 },
        handle = node,
    } = options

    let origin = pos;

    const startDrag = (e: PointerEvent) => {
        e.preventDefault();
        e.stopPropagation();
        node.setPointerCapture(e.pointerId);

        origin = { x: e.clientX, y: e.clientY }
    
        const drag = (e: PointerEvent) => {
            e.preventDefault()
            e.stopPropagation()

            pos.x += e.clientX - origin.x;
            pos.y += e.clientY - origin.y;

            draw();

            origin = { x: e.clientX, y: e.clientY }
        }
    
        const endDrag = (e: PointerEvent) => {
            e.preventDefault()
            e.stopPropagation()
            node.releasePointerCapture(e.pointerId);
            unlistenMove();
            unlistenUp();
        }

        const unlistenMove = listen(document, "pointermove", drag as EventListener);
        const unlistenUp = listen(document, "pointerup", endDrag as EventListener);
    }

    const draw = () => {
        node.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    }

    const unlisten = listen(handle, 'pointerdown', startDrag as EventListener);

    return {
        update: (options: { pos?: { x: number, y: number }, handle?: HTMLElement }) => {
            pos = options.pos ?? pos;
            draw();
        },
        destroy: unlisten
    }
}