import type { TableDefinition } from 'convex/server';
import type { GetIndexesFromTableDefinition } from '../types/indexes.js';
import type { RelationData } from '../types/relation.js';

export function getCallbackT<$HostTableDefinition extends TableDefinition>() {
	function Virtual<$TableDefinition extends TableDefinition>(): {
		withForeignIndex<
			$TableName extends string,
			$IndexName extends keyof GetIndexesFromTableDefinition<$TableDefinition> &
				string
		>(
			tableName: $TableName,
			index: $IndexName,
			indexFields: GetIndexesFromTableDefinition<$TableDefinition>[$IndexName] &
				string[]
		): RelationData<'virtual'>;
	} {
		return {
			withForeignIndex(tableName, index, indexFields) {
				return { type: 'virtual', tableName, index, indexFields };
			}
		};
	}

	function VirtualArray<$TableDefinition extends TableDefinition>(): {
		withForeignIndex<
			$TableName extends string,
			$IndexName extends keyof GetIndexesFromTableDefinition<$TableDefinition> &
				string
		>(
			tableName: $TableName,
			index: $IndexName,
			indexFields: GetIndexesFromTableDefinition<$TableDefinition>[$IndexName] &
				string[]
		): RelationData<'virtualArray'>;
	} {
		return {
			withForeignIndex(tableName, index, indexFields) {
				return { type: 'virtualArray', tableName, index, indexFields };
			}
		};
	}

	function Id<
		$TableName extends string,
		$IndexName extends
			keyof GetIndexesFromTableDefinition<$HostTableDefinition> & string
	>(
		tableName: $TableName
	): {
		withHostIndex(
			index: $IndexName,
			indexFields: GetIndexesFromTableDefinition<$HostTableDefinition>[$IndexName] &
				string[],
			options: { onDelete: 'SetNull' | 'Cascade' | 'Restrict' }
		): RelationData<'id'>;
	} {
		return {
			withHostIndex(
				index,
				indexFields,
				options: { onDelete: 'SetNull' | 'Cascade' | 'Restrict' }
			) {
				return { type: 'id', tableName, index, indexFields, options };
			}
		};
	}

	return {
		Id,
		Virtual,
		VirtualArray
	};
}
