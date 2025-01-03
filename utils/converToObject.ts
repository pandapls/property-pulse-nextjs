/* eslint-disable @typescript-eslint/no-explicit-any */

export function convertToSerializableObject<T>(leanDocument: T): T {
	if (Array.isArray(leanDocument)) {
		return leanDocument.map((item) =>
			convertToSerializableObject(item)
		) as unknown as T;
	} else if (leanDocument !== null && typeof leanDocument === 'object') {
		const convertedDocument: Record<string, any> = {};
		for (const key in leanDocument) {
			if (leanDocument.hasOwnProperty(key)) {
				const value = (leanDocument as Record<string, any>)[key];
				if (
					value &&
					typeof value === 'object' &&
					typeof value.toJSON === 'function'
				) {
					convertedDocument[key] = value.toString();
				} else {
					convertedDocument[key] = convertToSerializableObject(value);
				}
			}
		}
		return convertedDocument as T;
	}
	return leanDocument;
}
