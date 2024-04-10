import { read } from '$app/server';

const markdown = import.meta.glob('./../../../docs/*/*.md', {
	query: '?url',
	import: 'default',
	eager: true
});

const docs: { [key: string]: { category: string; slug: string; content: string } } = {};

// after basepath, the path looks like [category]/[slug].md
for (const [file, asset] of Object.entries(markdown)) {
	const match = file.match(/\/docs\/(.*)\.md/);
	if (match) {
		const [, path] = match;
		const [category, slug] = path.split('/');
		const content = await read(asset as string).text();

		docs[path] = { category, slug, content };
	}
}

export function isPage(category: string, slug: string) {
	return `${category}/${slug}` in docs;
}

export function isCategory(category: string) {
	return Object.values(docs).some((doc) => doc.category === category);
}

export function getPage(category: string, slug: string) {
	return docs[`${category}/${slug}`];
}

export function getCategories() {
	const categories = new Set<string>();
	for (const path in docs) {
		categories.add(docs[path].category);
	}
	return Array.from(categories);
}

export function getPages(category: string) {
	const pages = [];
	for (const path in docs) {
		if (docs[path].category === category) {
			pages.push(docs[path]);
		}
	}
	return pages;
}
