export interface IGeoCodes {
	longitude: number;
	latitude: number;
}

export interface IMapsProps {
	geocodes: IGeoCodes;
	title: string;
}
