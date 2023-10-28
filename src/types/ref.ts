export interface ShapeId<$TableName extends string> {
	__id__: $TableName;
}
export interface ShapeIdArray<$TableName extends string> {
	__idArray__: $TableName;
}
export interface ShapeRelation<$TableName extends string> {
	__relation__: $TableName;
}
export interface ShapeRelationArray<$TableName extends string> {
	__relationArray__: $TableName;
}
