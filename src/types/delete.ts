export interface OnDeleteData {
	foreignIndex: string;
	hostField: string;
	action: 'SetNull' | 'Cascade' | 'Restrict';
}
