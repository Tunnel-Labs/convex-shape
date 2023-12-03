export type VirtualString<$TableName extends string> =
	| `__VIRTUAL__:${$TableName}`
	| undefined;
export type VirtualStringArray<$TableName extends string> =
	| `__VIRTUAL__:${$TableName}`[]
	| undefined;

export interface VirtualData<$Type extends 'virtual' | 'virtualArray' | 'id'> {
	tableName: string;
	index: string;
	indexFields: string[];
	type: $Type;
	options?: { onDelete: 'SetNull' | 'Cascade' | 'Restrict' };
}
