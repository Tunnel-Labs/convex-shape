import { TableDefinition } from 'convex/server';

// prettier-ignore
export type GetIndexesFromTableDefinition<
	$TableDefinition extends TableDefinition
> =
	$TableDefinition extends TableDefinition<any, any, infer $Indexes> ?
		$Indexes :
	never;
