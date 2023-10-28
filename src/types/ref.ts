export interface ShapeRelation<$SchemaName extends string> {
	__relation__: $SchemaName;
}
export interface ShapeRelationArray<$SchemaName extends string> {
	__relationArray__: $SchemaName;
}
