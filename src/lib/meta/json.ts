export function stringify(value: any) {
	try {
		return JSON.stringify(value);
	} catch (error) {
		return 'null';
	}
}

export function parse(value: any) {
	if (typeof value !== 'string') return null;

	try {
		return JSON.parse(value);
	} catch (error) {
		return null;
	}
}
