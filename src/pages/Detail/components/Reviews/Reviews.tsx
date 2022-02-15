import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { IReviews, IReview } from './interfaces';

export const Reviews: React.FC<IReviews> = ({ tips }) => {
	return (
		<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
			{
				tips?.map((item: IReview, index: number) => (
					<div key={item.id}>
						<ListItem key={item.id} alignItems="flex-start">
			        <ListItemText
			          primary={item.text}
			          secondary={
			            <>
			              <Typography
			                sx={{ display: 'inline' }}
			                component="span"
			                variant="body2"
			                color="text.primary"
			              >
			                {item.created_at}
			              </Typography>
			            </>
			          }
			        />
			      </ListItem>
			    	<Divider component="li" />
		    	</div>
				))
			}
    </List>
	);
}