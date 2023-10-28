import type { GenericId } from 'convex/values';
import type { TableDefinition } from 'convex/server';
import type {
	ShapeId,
	ShapeIdArray,
	ShapeRelation,
	ShapeRelationArray
} from './ref.js';
import type { GetDocumentFromTableDefinition } from './document.js';
import type { RelationString, RelationStringArray } from './relation.js';
import type * as t from '../utils/t.js';

// prettier-ignore
export type ShapeObjectProperties<$TableDefinition extends TableDefinition> = {
	[$DocumentKey in keyof GetDocumentFromTableDefinition<$TableDefinition>]:
		NonNullable<GetDocumentFromTableDefinition<$TableDefinition>[$DocumentKey]> extends GenericId<infer $TableName> ?
			ShapeId<$TableName> :
		NonNullable<GetDocumentFromTableDefinition<$TableDefinition>[$DocumentKey]> extends GenericId<infer $TableName>[] ?
			ShapeIdArray<$TableName> :
		NonNullable<GetDocumentFromTableDefinition<$TableDefinition>[$DocumentKey]> extends RelationString<infer $TableName> ?
			ShapeRelation<$TableName> :
		NonNullable<GetDocumentFromTableDefinition<$TableDefinition>[$DocumentKey]> extends RelationStringArray<infer $TableName> ?
			ShapeRelationArray<$TableName> :
		typeof t
}
