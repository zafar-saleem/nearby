import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { InputProps } from './interfaces';
import { useAPIGateway } from '../../hooks/useAPIGateway/';
import { SEARCH_RESPONSE_RECEIVED } from '../../Events/';
import { StyledSearch, Container } from './Search.styled';

export const Search: React.FC<InputProps> = ({
	id,
	label,
	placeholder,
	type,
	name,
	helperText,
}) => {
	const [query, setQuery] = useState<string>('');
	const {
		data,
		loader,
		setParams,
	} = useAPIGateway({
  	method: 'GET',
  	endPoint: 'places/search',
  });

  useEffect(() => {
		setParams(() => ({
			ll: '35.66,139.73',
			query: query,
			radius: 1000,
		}));
	}, [query]);

	useEffect(() => {
		(globalThis as any).events.dispatch(SEARCH_RESPONSE_RECEIVED, data);
	}, [data]);

	const debouncedSeachRestaurants = debounce((criteria: string) => {
		setQuery(criteria);
	}, 1000);

	const seachRestaurants = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.value);
		debouncedSeachRestaurants(event.target.value);
	};

	return (
		<Container>
			<StyledSearch
				error={helperText ? true : false}
				id={id}
				label={label}
				placeholder={placeholder}
				type={type}
				name={name}
				helperText={helperText}
				onChange={seachRestaurants}
			/>
		</Container>
	);
};
