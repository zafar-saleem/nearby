import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAPIGateway } from '../../hooks/useAPIGateway/';
import { Loader, } from '../../components/';
import { Reviews } from './components/Reviews/';
import { Maps } from './components/Map/';
import { ITabPanelProps, IItem } from './interfaces';
import mapboxgl from 'mapbox-gl';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

function TabPanel(props: ITabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const Detail: React.FC = () => {
	const { id } = useParams<string>();
	const [details, setDetails] = useState<any>();
	const [value, setValue] = useState<number>(0);
	const {
		data,
		loader,
	} = useAPIGateway({
  	method: 'GET',
  	endPoint: [
  		`places/${id}`,
  		`places/${id}/tips`
  	],
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
  	generateData();
  }, [data]);

  const generateData = () => {
  	let items: IItem = {
  		geocodes: {
  			longitude: 1.45,
  			latitude: 0.23,
  		},
  		name: 'Crispy',
  		tips: {
  			created_at: 'Tue 15, Feb 2022',
  			text: 'This is feedback',
  			id: 'sdasd21312312sada',
  		}
  	};

  	setDetails(() => data.map((item) => {
  		if (item.data?.geocodes?.hasOwnProperty('main')) {
  			items['geocodes'] = item?.data?.geocodes?.main;
  			items['name'] = item?.data?.name;
  		}
  		
  		if (item.data[0]?.hasOwnProperty('text')) {
  			items['tips'] = item?.data;
  		}

  		return items;
  	}));
  };

	return (
		<Container maxWidth='lg'>
			<Box sx={{ width: '100%' }}>
	      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
	      	{
	      		details === undefined
	      		?
	      		<p>No details found</p>
	      		:
	      		details[0]?.geocodes && (<Maps geocodes={details[0]?.geocodes} title={details[0]?.name} />)
	      	}
	        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
	          <Tab label="Reviews" {...a11yProps(0)} />
	        </Tabs>
	      </Box>
	      {
	      	loader ? (
		      	<Loader />
		      ) : (
		      	<>
		      		{
		      			details === undefined
		      			?
		      				<p>No details found</p>
		      			:
		      				<>
		      					<TabPanel value={value} index={0}>
							        {details[0]?.tips && (<Reviews tips={details[0]?.tips} />)}
							      </TabPanel>
		      				</>
		      		}
			      </>
		      )
	      }
	    </Box>
    </Container>
	);
};
