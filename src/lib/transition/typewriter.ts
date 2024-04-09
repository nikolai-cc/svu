/**
 * Simple typewriter transition. Based on the svelte tutorial typewriter transition.
 */
export function typewriter(node: Element, options: { speed?: number; delay?: number }) {
	const { speed = 100, delay = 0 } = options ?? {};

	const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === 3;
	if (!valid) return {};

	const text = node.textContent || '';
	const duration = text.length * speed;

	return {
		duration,
		delay,
		tick: (t: number) => {
			const i = Math.trunc(text.length * t);
			node.textContent = text.slice(0, i);
		}
	};
}
