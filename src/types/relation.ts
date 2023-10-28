export type RelationString<$TableName extends string> =
	| `__RELATION__:${$TableName}:${string}`
	| undefined;
export type RelationStringArray<$TableName extends string> =
	| `__RELATION__:${$TableName}:${string}`[]
	| undefined;
