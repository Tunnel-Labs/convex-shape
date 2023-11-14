import type { TableDefinition } from 'convex/server';
import type { ShapeObjectProperties } from '../types/properties.js';
import type { OnDeleteData } from '../types/delete.js';
import type { CallbackT } from '../types/callback-t.js';
import { getCallbackT } from '../utils/callback-t.js';

export const onDelete = new Map<
	/* deletedTableName */ string,
	{
		[affectedTableName: string]: OnDeleteData;
	}
>();

export function Shape<$HostTableDefinition extends TableDefinition>(
	tableName: string,
	callback: (
		t: CallbackT<$HostTableDefinition>
	) => ShapeObjectProperties<$HostTableDefinition>
): ShapeObjectProperties<$HostTableDefinition> {
	const shape = callback(getCallbackT());

	for (const [field, fieldValue] of Object.entries(shape)) {
		if (!('type' in fieldValue)) continue;

		if (fieldValue.type === 'id') {
			// We treat the current table as the table that is affected by the deletion
			const affectedTableName = tableName;
			const {
				// The table referenced by the key is considered the "foreign" table which has been deleted
				tableName: deletedTableName,
				index: affectedFieldIndex,
				indexFields: affectedFieldIndexFields,
				options
			} = fieldValue;
			if (!onDelete.has(deletedTableName)) {
				onDelete.set(deletedTableName, {});
			}

			// When the foreign table is deleted, the affected table
			onDelete.get(deletedTableName)![affectedTableName] = {
				action: options.onDelete,
				affectedFieldIndex,
				affectedField: field,
				affectedFieldIndexFields
			} satisfies OnDeleteData;
		}
	}

	return shape;
}
