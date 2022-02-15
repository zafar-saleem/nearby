import { useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@mui/material/IconButton';
import { Loader, Search, } from '../../components/';
import { useAPIGateway } from '../../hooks/useAPIGateway/';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SEARCH_RESPONSE_RECEIVED } from '../../configs/';
import { useStyles, StyledTypography, StyledLink } from './Home.styled';

export const Home: React.FC = () => {
	const mediumScreen = useMediaQuery('(max-width:900px)');
	const smallScreen = useMediaQuery('(max-width:750px)');
	const classes = useStyles();
	const {
		data,
		setData,
		loader,
		setParams,
	} = useAPIGateway({
  	method: 'GET',
  	endPoint: ['places/search'],
  });

	useEffect(() => {
		setParams(() => ({
			ll: '35.66,139.73',
			query: 'restaurants',
			radius: 1000,
		}));

		return () => undefined;
	}, [setParams]);

	useEffect(() => {
		(globalThis as any).events.listen(SEARCH_RESPONSE_RECEIVED, (item: any) => {
			setData(item);
		});

		return () => (globalThis as any).events.destroy(SEARCH_RESPONSE_RECEIVED);
	}, [setData]);

	return (
		<Container maxWidth='lg'>
			<Search
				type='search'
				name='search'
        id='outlined-error-helper-text'
        label='Search Restaurants Nearby'
        placeholder='e.g. msb Tamachi...'
			/>
			<Grid container spacing={2}>
				{
					loader ? (
						<Loader />
					) : (
						<>
							{
								data?.length === 0 ? (
									<p>No restaurants received from the server</p>
								) : (
									<>
										{
											data?.map((item, index) => (
												<Grid
													item
													xs={smallScreen ? 12 : mediumScreen ? 4 : 3}
													key={`${item.fsq_id}-${index}`}>
													<Card
														sx={{ maxWidth: 345 }}
														className={smallScreen ? classes.responsive : classes.normal}>
														<Link to={`detail/${item.fsq_id}`}>
															<CardMedia
																component='img'
																height='200'
																image={`https://ui-avatars.com/api/?name=${item.name}&size=200&background=random`}
																alt={item.name}
															/>
														</Link>
														<CardHeader
															action={
																<IconButton aria-label='settings'>
																	<MoreVertIcon />
																</IconButton>
															}
															title={item.name.length > 16 ? `${item.name.substring(0, 11)}...` : item.name}
														/>
														<StyledLink to={`detail/${item.fsq_id}`}>
															<CardContent>
																<StyledTypography variant='body2' color='text.secondary'>
																	{
																		item.location.formatted_address ?
																		item.location.formatted_address :
																		`No address found`
																	}
																</StyledTypography>
															</CardContent>
														</StyledLink>
														<CardActions disableSpacing>
															<IconButton aria-label='add to favorites'>
																<FavoriteIcon />
															</IconButton>
															<IconButton aria-label='share'>
																<ShareIcon />
															</IconButton>
														</CardActions>
													</Card>
												</Grid>
											))
										}
									</>
								)
							}
						</>
					)
				}
			</Grid>
		</Container>
	);
};
