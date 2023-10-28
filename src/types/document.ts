import { TableDefinition } from 'convex/server';

export type GetDocumentFromTableDefinition<
	$TableDefinition extends TableDefinition
> = $TableDefinition extends TableDefinition<infer $Document>
	? $Document
	: never;
