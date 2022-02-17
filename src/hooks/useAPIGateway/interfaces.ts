export interface IURLParams {
	method: string;
	endPoint?: string[];
	link?: string;
}

export interface IParams {
	1(key: string, value: string): string | undefined;
	2(key: string, value: string): string | undefined;
}

export interface IRest {
	ll?: string;
	query?: string;
	radius?: number;
}
