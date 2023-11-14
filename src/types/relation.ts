export type RelationString<$TableName extends string> =
	| `__RELATION__:${$TableName}`
	| undefined;
export type RelationStringArray<$TableName extends string> =
	| `__RELATION__:${$TableName}`[]
	| undefined;

export interface RelationData<$Type extends 'virtual' | 'virtualArray' | 'id'> {
	tableName: string;
	index: string;
	indexFields: string[];
	type: $Type;
	options?: { onDelete: 'SetNull' | 'Cascade' | 'Restrict' };
}
