import type { TableDefinition } from 'convex/server';
import type { ShapeObjectProperties } from '../types/properties.js';
import type { OnDeleteData } from '../types/delete.js';
import type { CallbackT } from '../types/callback-t.js';
import { getCallbackT } from '../utils/callback-t.js';

export const onDelete = new Map<
	/* hostTableName */ string,
	{ [foreignTableName: string]: OnDeleteData }
>();

export function Shape<$HostTableDefinition extends TableDefinition>(
	hostTableName: string,
	callback: (
		t: CallbackT<$HostTableDefinition>
	) => ShapeObjectProperties<$HostTableDefinition>
): ShapeObjectProperties<$HostTableDefinition> {
	const shape = callback(getCallbackT());

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
