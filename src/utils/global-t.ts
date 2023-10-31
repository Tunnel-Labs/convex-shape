import type { TableDefinition } from 'convex/server';
import { ShapeObjectProperties } from '../types/properties.js';
import * as callbackT from './callback-t.js';

export const onDelete = new Map<
	string,
	Record<string, 'SetNull' | 'Cascade' | 'Restrict'>
>();

export function Shape<$TableDefinition extends TableDefinition>(
	tableName: string,
	callback: (
		t: typeof callbackT & { tableName: string }
	) => ShapeObjectProperties<$TableDefinition>
): ShapeObjectProperties<$TableDefinition> {
	return callback({ ...callbackT, tableName });
}
