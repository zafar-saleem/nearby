import React from 'react';
import { Styledh1 } from './Title.styled';
import { ITitleProps } from './interfaces';

export const Title: React.FC<ITitleProps> = ({ title, size }) => {
	return (
		<Styledh1 style={{ fontSize: `${size}rem` }}>{title}</Styledh1>
	);
}