import * as t from '../utils/t.js';
import type { TableDefinition } from 'convex/server';
import type { ShapeRelation, ShapeRelationArray } from './ref.js';
import type { GetDocumentFromTable } from './document.js';
import type { RelationString, RelationStringArray } from './relation.js';

// prettier-ignore
export type ShapeTypeProperties<$Table extends TableDefinition> = {
	[$DocumentKey in keyof GetDocumentFromTable<$Table>]:
		NonNullable<GetDocumentFromTable<$Table>[$DocumentKey]> extends RelationString<infer $TableName> ?
			t.Relation<$TableName> |
			(null extends GetDocumentFromTable<$Table>[$DocumentKey] ? null : never) :
		NonNullable<GetDocumentFromTable<$Table>[$DocumentKey]> extends RelationStringArray<infer $TableName> ?
			t.RelationArray<$TableName> |
			(null extends GetDocumentFromTable<$Table>[$DocumentKey] ? null : never) :
		GetDocumentFromTable<$Table>[$DocumentKey];
}

// prettier-ignore
export type ShapeObjectProperties<$ShapeType> = {
	[K in keyof $ShapeType]:
		NonNullable<$ShapeType[K]> extends t.Relation<infer $TableName>  ?
			ShapeRelation<
				// @ts-expect-error: works
				NonNullable<$TableName>
			> :
		NonNullable<$ShapeType[K]> extends t.RelationArray<infer $TableName> ?
			ShapeRelationArray<
				// @ts-expect-error: works
				NonNullable<$TableName>
			> :
		typeof t
}
