import { useEffect, useState } from 'react';
import {
	URLParams,
	Params,
} from './interfaces';

const generateURL = ({ method, endPoint }:URLParams, ...rest: any) => {
	return new Promise((resolve, reject) => {
		const baseURL = process.env.REACT_APP_API_ENDPOINT;
		let params: string = '', index: number = 1;

		const paramsCriteria: Params = {
			1: (key: string, value: string) => `?${key}=${value}`,
			2: (key: string, value: string) => `&${key}=${value}`,
		};

		for (const [key, value] of Object.entries(rest[0])) {
			params = `${params}${paramsCriteria[index as keyof Params](key as string, value as string)}`;
		  index = 2;
		}

		const url = (method === 'GET') &&
								`${baseURL}${endPoint}${params}` ||
								`${baseURL}${endPoint}`;

		resolve(url);
	});
}

export const useAPIGateway = ({ method, endPoint }: URLParams) => {
	const [data, setData] = useState<any[]>([]);
	const [loader, setLoader] = useState<boolean>(false);
	const [httpProps, setHttpProps] = useState<any>({});
	const [params, setParams] = useState<any>({});

	useEffect(() => {
		async function load() {
			setLoader(true);
			const url: string = await generateURL({ method, endPoint }, { ...params }) as string;
			const response = await fetch(url, {
			  method: httpProps?.method,
			  headers: {
		      'Content-Type': 'application/json' as any,
		      'Authorization': process.env.REACT_APP_API_KEY as any,
		    },
			  ...(httpProps?.method !== 'GET' && { data: { ...params } }),
			});

			const json = await response.json();

			setData(json.results);
			setLoader(false);
		}

		load();

		return () => undefined;
	}, [JSON.stringify(httpProps), JSON.stringify(params)]);

	return {
		data,
		setData,
		loader,
		setParams,
		params,
		setHttpProps,
	}
};
