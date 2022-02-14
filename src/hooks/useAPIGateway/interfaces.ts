export interface URLParams {
	method: string;
	endPoint: string;
}

export interface Params {
	1(key: string, value: string): string | undefined;
	2(key: string, value: string): string | undefined;
}