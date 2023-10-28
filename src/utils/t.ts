import { ShapeObjectProperties } from '../types/properties.js';
import type { ShapeRelation, ShapeRelationArray } from '../types/ref.js';
import { TableDefinition } from 'convex/server';

export function Shape<$TableDefinition extends TableDefinition>(
	properties: ShapeObjectProperties<$TableDefinition>
): ShapeObjectProperties<$TableDefinition>;
export function Shape(shape: any): any {
	return shape;
}

export type Relation<$TableName> = ShapeRelation<
	// @ts-expect-error: works
	NonNullable<$TableName>
>;
export const Relation = Object.assign(
	<$TableName extends string>(
		tableName: $TableName
	): ShapeRelation<$TableName> => tableName as any,
	{ __relation__: true }
);

export type RelationArray<$TableName> = ShapeRelationArray<
	// @ts-expect-error: works
	NonNullable<$TableName>
>;
export const RelationArray = Object.assign(
	<$TableName extends string>(
		tableName: $TableName
	): ShapeRelationArray<$TableName> => tableName as any,
	{ __relationArray__: true }
);
