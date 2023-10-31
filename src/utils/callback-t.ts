import type { GetIndexesFromTableDefinition } from '../types/indexes.js';
import type { TableDefinition } from 'convex/server';
import { RelationData } from '../types/relation.js';

export function Virtual<$TableDefinition extends TableDefinition>(): {
	withIndex<$TableName extends string>(
		tableName: $TableName,
		index: keyof GetIndexesFromTableDefinition<$TableDefinition>
	): RelationData<'virtual'>;
} {
	return {
		withIndex(tableName, index) {
			return { type: 'virtual', tableName, index };
		}
	};
}

export function VirtualArray<$TableDefinition extends TableDefinition>(): {
	withIndex<$TableName extends string>(
		tableName: $TableName,
		index: keyof GetIndexesFromTableDefinition<$TableDefinition>
	): RelationData<'virtualArray'>;
} {
	return {
		withIndex(tableName, index) {
			return { type: 'virtualArray', tableName, index };
		}
	};
}

export function Id<$TableDefinition extends TableDefinition>(): {
	withIndex<$TableName extends string>(
		tableName: $TableName,
		index: keyof GetIndexesFromTableDefinition<$TableDefinition>,
		options: { onDelete: 'SetNull' | 'Cascade' | 'Restrict' }
	): RelationData<'id'>;
} {
	return {
		withIndex(
			tableName,
			index,
			options: { onDelete: 'SetNull' | 'Cascade' | 'Restrict' }
		) {
			return { type: 'id', tableName, index, options };
		}
	};
}
