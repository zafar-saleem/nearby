import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Review } from './interfaces';
// import { StyledList } from './Reviews.styled';

export const Reviews: React.FC<any> = (props) => {
	console.log(props);
	return (
		<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
			{
				props?.tips?.map((item: Review, index: number) => (
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