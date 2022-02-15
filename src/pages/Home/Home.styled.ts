import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const StyledTypography = styled(Typography)({
	minHeight: '4rem',
});

export const StyledLink = styled(Link)({
	textDecoration: 'none',
});

export const useStyles = makeStyles({
	responsive: {
		maxWidth: '100%',
	},
	normal: {},
});
