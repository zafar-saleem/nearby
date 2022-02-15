import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { IPhotos } from './interfaces';
import { Item } from './Photos.styled';

export const Photos: React.FC<any> = ({ photos }) => {
	return (
		<Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={1}>
      	{
      		photos?.map((photo: IPhotos, index: number) => (
      			<>
      				<Grid item xs={3} key={photo.id}>
			          <Item
			          	src={`${photo.prefix}${photo.suffix.replace('/', '')}`}
			          	alt="Server does not return any image because `the specified key does not exist`"
			          />
			        </Grid>
      			</>
      		))
      	}
      </Grid>
    </Box>
	);
}