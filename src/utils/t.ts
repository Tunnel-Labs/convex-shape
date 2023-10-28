import type { Exact } from 'type-fest';
import {
	ShapeObjectProperties,
	ShapeTypeProperties
} from '../types/properties.js';
import type { ShapeRelation, ShapeRelationArray } from '../types/ref.js';
import { TableDefinition } from 'convex/server';

export type Shape<
	$TableDefinition extends TableDefinition,
	$T extends Exact<ShapeTypeProperties<$TableDefinition>, $T>
> = $T;
export function Shape<$ShapeType>(
	properties: ShapeObjectProperties<$ShapeType>
): ShapeObjectProperties<$ShapeType>;
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
