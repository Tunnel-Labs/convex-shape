import { TableDefinition } from 'convex/server';

export type GetDocumentFromTable<$Table extends TableDefinition> =
	$Table extends TableDefinition<infer $Document> ? $Document : never;
