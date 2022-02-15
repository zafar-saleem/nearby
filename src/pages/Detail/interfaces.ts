import React from 'react';

export interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface IGeoCodes {
	longitude: number;
	latitude: number;
}

interface ITips {
	created_at: string;
	text: string;
	id: string;
}

export interface IItem {
	geocodes: IGeoCodes,
	name: string;
	tips: ITips,
}
