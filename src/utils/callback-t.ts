import type { TableDefinition } from 'convex/server';
import type { GetIndexesFromTableDefinition } from '../types/indexes.js';
import type { RelationData } from '../types/relation.js';

export function getCallbackT<$HostTableDefinition extends TableDefinition>() {
	function Virtual<$TableDefinition extends TableDefinition>(): {
		withForeignIndex<$TableName extends string>(
			tableName: $TableName,
			index: keyof GetIndexesFromTableDefinition<$TableDefinition>
		): RelationData<'virtual'>;
	} {
		return {
			withForeignIndex(tableName, index) {
				return { type: 'virtual', tableName, index };
			}
		};
	}

	function VirtualArray<$TableDefinition extends TableDefinition>(): {
		withForeignIndex<$TableName extends string>(
			tableName: $TableName,
			index: keyof GetIndexesFromTableDefinition<$TableDefinition>
		): RelationData<'virtualArray'>;
	} {
		return {
			withForeignIndex(tableName, index) {
				return { type: 'virtualArray', tableName, index };
			}
		};
	}

	function Id<$TableName extends string>(
		tableName: $TableName
	): {
		withHostIndex(
			index: keyof GetIndexesFromTableDefinition<$HostTableDefinition>,
			options: { onDelete: 'SetNull' | 'Cascade' | 'Restrict' }
		): RelationData<'id'>;
	} {
		return {
			withHostIndex(
				index,
				options: { onDelete: 'SetNull' | 'Cascade' | 'Restrict' }
			) {
				return { type: 'id', tableName, index, options };
			}
		};
	}

	return {
		Id,
		Virtual,
		VirtualArray
	};
}
