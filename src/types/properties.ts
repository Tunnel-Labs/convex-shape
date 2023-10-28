import type { TableDefinition } from 'convex/server';
import type { ShapeRelation, ShapeRelationArray } from './ref.js';
import type { GetDocumentFromTableDefinition } from './document.js';
import type { RelationString, RelationStringArray } from './relation.js';

// prettier-ignore
export type ShapeObjectProperties<$TableDefinition extends TableDefinition> = {
	[$DocumentKey in keyof GetDocumentFromTableDefinition<$TableDefinition>]:
		NonNullable<GetDocumentFromTableDefinition<$TableDefinition>[$DocumentKey]> extends RelationString<infer $TableName> ?
			ShapeRelation<
				NonNullable<$TableName>
			> :
		NonNullable<GetDocumentFromTableDefinition<$TableDefinition>[$DocumentKey]> extends RelationStringArray<infer $TableName> ?
			ShapeRelationArray<
				NonNullable<$TableName>
			> :
		GetDocumentFromTableDefinition<$TableDefinition>[$DocumentKey];
}
