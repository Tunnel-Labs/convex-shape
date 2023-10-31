import * as globalT from './global-t.js';
import type { GetIndexesFromTableDefinition } from '../types/indexes.js';
import type {
	ShapeId,
	ShapeIdArray,
	ShapeRelation,
	ShapeRelationArray
} from '../types/ref.js';
import type { TableDefinition } from 'convex/server';
import { TContext } from 'src/types/t-context.js';

export function Relation<$TableDefinition extends TableDefinition>(): {
	withIndex<$TableName extends string>(
		tableName: $TableName,
		index: keyof GetIndexesFromTableDefinition<$TableDefinition>
	): ShapeRelation<$TableName>;
} {
	return {
		withIndex(tableName, index) {
			return { tableName, index, type: 'relation' } as any;
		}
	};
}

export function RelationArray<$TableDefinition extends TableDefinition>(): {
	withIndex<$TableName extends string>(
		tableName: $TableName,
		index: keyof GetIndexesFromTableDefinition<$TableDefinition>
	): ShapeRelationArray<$TableName>;
} {
	return {
		withIndex(tableName, index) {
			return { tableName, index, type: 'relationArray' } as any;
		}
	};
}

export function Id<$TableName extends string>(
	this: TContext,
	tableName: $TableName,
	options: { onDelete: 'Cascade' | 'SetNull' | 'Restrict' }
): ShapeId<$TableName> {
	let onDelete = globalT.onDelete.get(tableName);
	if (onDelete === undefined) {
		onDelete = {};
		globalT.onDelete.set(tableName, onDelete);
	}

	onDelete[this.tableName] = options.onDelete;

	return tableName as any;
}

export function IdArray<$TableName extends string>(
	tableName: $TableName
): ShapeIdArray<$TableName> {
	return tableName as any;
}
