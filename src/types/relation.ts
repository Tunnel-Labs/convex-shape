export type RelationString<$TableName extends string> =
	| `__RELATION__:${$TableName}`
	| undefined;
export type RelationStringArray<$TableName extends string> =
	| `__RELATION__:${$TableName}`[]
	| undefined;
