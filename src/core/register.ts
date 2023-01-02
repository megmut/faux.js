export class Register<T> {
	private dictionary: T;

	constructor(obj: T) {
		this.dictionary = obj;
	}

	// todo - fix the property type any parameter
	public add(key: keyof T, property: any) {
		this.dictionary[key] = property;
	}

	public get<K extends keyof T>(key: K) {
		return this.dictionary[key];
	}

	public build(): T {
		return this.traverseObject(this.dictionary, {});
	}

	// todo - fix the type any's in the parameters
	private traverseObject(object: any, result: any): T {
		for (const key in object) {
			const item = object[key];
			if (typeof item === 'function') {
				const fn = item;
				result[key] = fn();
			} else if (typeof item === 'object') {
				result[key] = this.traverseObject(item, {});
			} else {
				result[key] = item;
			}
		}

		return result;
	}
}
