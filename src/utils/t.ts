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
	<$TableName extends string>(
		tableName: $TableName
	): ShapeRelation<$TableName> => tableName as any,
	{ __relation__: true }
);

export const RelationArray = Object.assign(
	<$TableName extends string>(
		tableName: $TableName
	): ShapeRelationArray<$TableName> => tableName as any,
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
