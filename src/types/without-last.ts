export type WithoutLast<T extends any[]> = T extends [
	...infer $WithoutLast,
	any
]
	? $WithoutLast
	: any[];
