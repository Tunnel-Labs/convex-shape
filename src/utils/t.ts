import type { GetIndexesFromTableDefinition } from '../types/indexes.js';
import { ShapeObjectProperties } from '../types/properties.js';
import type {
	ShapeId,
	ShapeIdArray,
	ShapeRelation,
	ShapeRelationArray
} from '../types/ref.js';
import { TableDefinition } from 'convex/server';

export function Shape<$TableDefinition extends TableDefinition>(
	properties: ShapeObjectProperties<$TableDefinition>
): ShapeObjectProperties<$TableDefinition>;
export function Shape(shape: any): any {
	return shape;
}

export const Relation = Object.assign(
	<$TableDefinition extends TableDefinition>(): {
		withIndex<$TableName extends string>(
			tableName: $TableName,
			index: keyof GetIndexesFromTableDefinition<$TableDefinition>
		): ShapeRelation<$TableName>;
	} => ({
		withIndex(tableName, index) {
			return { tableName, index } as any;
		}
	}),
	{ __relation__: true }
);

export const RelationArray = Object.assign(
	<$TableDefinition extends TableDefinition>(): {
		withIndex<$TableName extends string>(
			tableName: $TableName,
			index: keyof GetIndexesFromTableDefinition<$TableDefinition>
		): ShapeRelationArray<$TableName>;
	} => ({
		withIndex(tableName, index) {
			return { tableName, index } as any;
		}
	}),
	{ __relationArray__: true }
);

export const Id = Object.assign(
	<$TableName extends string>(tableName: $TableName): ShapeId<$TableName> =>
		tableName as any,
	{ __id__: true }
);

export const IdArray = Object.assign(
	<$TableName extends string>(
		tableName: $TableName
	): ShapeIdArray<$TableName> => tableName as any,
	{ __idArray__: true }
);
