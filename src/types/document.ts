import { TableDefinition } from 'convex/server';

// prettier-ignore
export type GetDocumentFromTableDefinition<
	$TableDefinition extends TableDefinition
> =
	$TableDefinition extends TableDefinition<infer $Document> ?
		$Document :
	never;
