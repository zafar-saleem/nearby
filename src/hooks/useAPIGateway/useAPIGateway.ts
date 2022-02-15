import { useEffect, useState } from 'react';
import axios from 'axios';
import {
	URLParams,
	Params,
} from './interfaces';

const generateURL = ({ method, endPoint }: URLParams, ...rest: any) => {
	const baseURL = process.env.REACT_APP_API_ENDPOINT;
	let params: string = '', index: number = 1, url: string[] = [];

	const paramsCriteria: Params = {
		1: (key: string, value: string) => `?${key}=${value}`,
		2: (key: string, value: string) => `&${key}=${value}`,
	};

	for (const [key, value] of Object.entries(rest[0])) {
		params = `${params}${paramsCriteria[index as keyof Params](key as string, value as string)}`;
	  index = 2;
	}

	if (endPoint) {
		for (let link of endPoint) {
			url.push((method === 'GET') &&
				`${baseURL}${endPoint}${params}` ||
				`${baseURL}${endPoint}`);
		}
	}

	return url;
}

export const useAPIGateway = ({ method, endPoint }: URLParams) => {
	const [data, setData] = useState<any[]>([]);
	const [loader, setLoader] = useState<boolean>(false);
	const [httpProps, setHttpProps] = useState<any>({});
	const [params, setParams] = useState<any>({});

	useEffect(() => {
		async function load() {
			setLoader(true);
			let promises: any = [];

			const urls: string[] = generateURL({ method, endPoint }, { ...params });

			if (urls.length > 0) {
				for (const url of urls) {
					promises.push(axios({
					  method: httpProps?.method,
					  url: url,
					  headers: {
				      'Content-Type': 'application/json' as any,
				      'Authorization': process.env.REACT_APP_API_KEY as any,
				    },
					  ...(httpProps?.method !== 'GET' && { data: { ...params } }),
					}));
				}
			}

			console.log({promises});
			const response: any = await axios.all(promises);

			console.log({response})

			if (response.length === 1) {
				setData(response[0].data.results);
			} else {
				console.log({response});
			}

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
