import { useEffect, useState } from 'react';

const generateURL = ({ method, endPoint }, ...rest) => {
	return new Promise((resolve, reject) => {
		const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;
		let params = '', index = 1;

		const paramsCriteria = {
			1: (key, value) => `?${key}=${value}`,
			2: (key, value) => `&${key}=${value}`,
		};

		for (const [key, value] of Object.entries(rest[0])) {
			params = `${params}${paramsCriteria[index](key, value)}`;
		  index = 2;
		}

		const url = (method === 'GET') &&
								`${baseURL}${endPoint}${params}` ||
								`${baseURL}${endPoint}`;

		resolve(url);
	});
}

export const useAPIGateway = () => {
	const [data, setData] = useState<any[]>([]);
	const [loader, setLoader] = useState<boolean>(false);
	const [httpProps, setHttpProps] = useState<any>({});
	const [params, setParams] = useState<any>({});

	useEffect(() => {
		async function load() {
			setLoader(true);
			const url: string = await generateURL(httpProps, { ...params }) as string;
			const response = await fetch(url, {
			  method: httpProps?.method,
			  headers: {
		      'Content-Type': 'application/json',
		    },
			  ...(httpProps?.method !== 'GET' && { data: { ...params } }),
			});

			const json = await response.json();

			setData(json.items);
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
