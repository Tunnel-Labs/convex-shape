import type { GenericId } from 'convex/values';
import type { TableDefinition } from 'convex/server';
import type { RelationData } from './relation.js';
import type { GetDocumentFromTableDefinition } from './document.js';
import type { RelationString, RelationStringArray } from './relation.js';
import type { CallbackT } from '../types/callback-t.js';

// prettier-ignore
export type ShapeObjectProperties<$TableDefinition extends TableDefinition> = {
	[$DocumentKey in keyof GetDocumentFromTableDefinition<$TableDefinition>]:
		NonNullable<GetDocumentFromTableDefinition<$TableDefinition>[$DocumentKey]> extends GenericId<infer $TableName> ?
			RelationData<'id'> :
		NonNullable<GetDocumentFromTableDefinition<$TableDefinition>[$DocumentKey]> extends RelationString<infer $TableName> ?
			RelationData<'virtual'> :
		NonNullable<GetDocumentFromTableDefinition<$TableDefinition>[$DocumentKey]> extends RelationStringArray<infer $TableName> ?
			RelationData<'virtualArray'> :
		CallbackT<$TableDefinition>
}
