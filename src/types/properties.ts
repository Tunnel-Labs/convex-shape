import type { GenericId } from 'convex/values';
import type { TableDefinition } from 'convex/server';
import type { VirtualData } from './virtual.js';
import type { GetDocumentFromTableDefinition } from './document.js';
import type { VirtualString, VirtualStringArray } from './virtual.js';
import type { CallbackT } from '../types/callback-t.js';

// prettier-ignore
export type ShapeObjectProperties<$TableDefinition extends TableDefinition> = {
	[$DocumentKey in keyof GetDocumentFromTableDefinition<$TableDefinition>]:
		NonNullable<GetDocumentFromTableDefinition<$TableDefinition>[$DocumentKey]> extends GenericId<string> ?
			VirtualData<'id'> :
		NonNullable<GetDocumentFromTableDefinition<$TableDefinition>[$DocumentKey]> extends VirtualString<string> ?
			VirtualData<'virtual'> :
		NonNullable<GetDocumentFromTableDefinition<$TableDefinition>[$DocumentKey]> extends VirtualStringArray<string> ?
			VirtualData<'virtualArray'> :
		CallbackT<$TableDefinition>
}
