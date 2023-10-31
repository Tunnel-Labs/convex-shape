import type { TableDefinition } from 'convex/server';
import type { ShapeObjectProperties } from '../types/properties.js';
import type { OnDeleteData } from '../types/delete.js';
import * as callbackT from './callback-t.js';

export const onDelete = new Map<
	/* hostTableName */ string,
	{ [foreignTableName: string]: OnDeleteData }
>();

export function Shape<$TableDefinition extends TableDefinition>(
	hostTableName: string,
	callback: (
		t: typeof callbackT & { tableName: string }
	) => ShapeObjectProperties<$TableDefinition>
): ShapeObjectProperties<$TableDefinition> {
	const shape = callback({ ...callbackT, tableName: hostTableName });

	for (const [field, value] of Object.entries(shape)) {
		if (!('type' in value)) continue;

		const { type, tableName: foreignTableName, index, options } = value;
		if (type === 'id') {
			if (!onDelete.has(hostTableName)) {
				onDelete.set(hostTableName, {});
			}

			onDelete.get(hostTableName)![foreignTableName] = {
				action: options.onDelete,
				foreignIndex: index,
				hostField: field
			};
		}
	}

	return shape;
}
