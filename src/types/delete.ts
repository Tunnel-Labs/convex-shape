export interface OnDeleteData {
	affectedField: string;
	affectedFieldIndex: string;
	affectedFieldIndexFields: string[];
	action: 'SetNull' | 'Cascade' | 'Restrict';
}
