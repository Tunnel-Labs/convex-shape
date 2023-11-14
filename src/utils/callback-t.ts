import type { TableDefinition } from 'convex/server';
import type { GetIndexesFromTableDefinition } from '../types/indexes.js';
import type { RelationData } from '../types/relation.js';
import type { WithoutLast } from '../types/without-last.js';

export function getCallbackT<$HostTableDefinition extends TableDefinition>() {
	function Virtual<$TableDefinition extends TableDefinition>(): {
		withForeignIndex<
			$TableName extends string,
			$IndexName extends keyof GetIndexesFromTableDefinition<$TableDefinition>
		>(
			tableName: $TableName,
			index: $IndexName,
			// Convex adds "_creationTime" as the last field for every index
			indexFields: WithoutLast<
				// @ts-expect-error: guaranteed to be an array of strings
				GetIndexesFromTableDefinition<$TableDefinition>[$IndexName]
			>
		): RelationData<'virtual'>;
	} {
		return {
			withForeignIndex(tableName, index, indexFields) {
				return {
					type: 'virtual',
					tableName,
					index: String(index),
					indexFields: indexFields.map(String)
				};
			}
		};
	}

	function VirtualArray<$TableDefinition extends TableDefinition>(): {
		withForeignIndex<
			$TableName extends string,
			$IndexName extends keyof GetIndexesFromTableDefinition<$TableDefinition>
		>(
			tableName: $TableName,
			index: $IndexName,
			// Convex adds "_creationTime" as the last field for every index
			indexFields: WithoutLast<
				// @ts-expect-error: guaranteed to be an array of strings
				GetIndexesFromTableDefinition<$TableDefinition>[$IndexName]
			>
		): RelationData<'virtualArray'>;
	} {
		return {
			withForeignIndex(tableName, index, indexFields) {
				return {
					type: 'virtualArray',
					tableName,
					index: String(index),
					indexFields: indexFields.map(String)
				};
			}
		};
	}

	function Id<
		$TableName extends string,
		$IndexName extends keyof GetIndexesFromTableDefinition<$HostTableDefinition>
	>(
		tableName: $TableName
	): {
		withHostIndex(
			index: $IndexName,
			// Convex adds "_creationTime" as the last field for every index
			indexFields: WithoutLast<
				// @ts-expect-error: guaranteed to be an array of strings
				GetIndexesFromTableDefinition<$HostTableDefinition>[$IndexName]
			>,
			options: { onDelete: 'SetNull' | 'Cascade' | 'Restrict' }
		): RelationData<'id'>;
	} {
		return {
			withHostIndex(
				index,
				indexFields,
				options: { onDelete: 'SetNull' | 'Cascade' | 'Restrict' }
			) {
				return {
					type: 'id',
					tableName,
					index: String(index),
					indexFields: indexFields.map(String),
					options
				};
			}
		};
	}

	return {
		Id,
		Virtual,
		VirtualArray
	};
}
