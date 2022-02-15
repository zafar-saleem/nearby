import React from 'react';
import { StyledMap } from './Map.styled';
import { IMapsProps } from './interfaces';

export const Maps: React.FC<IMapsProps> = ({ geocodes, title }) => {
	return (
		<StyledMap
      initialViewState={{
        longitude: geocodes.longitude,
        latitude: geocodes.latitude,
        zoom: 14
      }}
      mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
      style={{height: 400, marginBottom: '3rem'}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
    </StyledMap>
	);
};
