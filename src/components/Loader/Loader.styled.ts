import { styled } from '@mui/material/styles';

export const StyledLoader = styled('div')({
	position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80px',
  height: '80px',

  '&:after': {
	  content: '" "',
	  display: 'block',
	  width: '64px',
	  height: '64px',
	  margin: '8px',
	  borderRadius: '50%',
	  border: '6px solid #39211e',
	  borderColor: '#39211e transparent #39211e transparent',
	  animation: 'dual-ring 1.2s linear infinite',
	},

	'@keyframes dual-ring': {
	  '0%': {
	    transform: 'rotate(0deg)',
	  },
	  '100%': {
	    transform: 'rotate(360deg)',
	  },
	},
});
