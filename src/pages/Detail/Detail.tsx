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
import { Photos } from './components/Photos/';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
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
		setData,
		loader,
		setParams,
	} = useAPIGateway({
  	method: 'GET',
  	endPoint: [
  		`places/${id}`,
  		`places/${id}/photos`,
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
  	let items: any = {};

  	setDetails(() => data.map((item) => {
  		if (item.data?.geocodes?.hasOwnProperty('main')) {
  			items['geocodes'] = item?.data?.geocodes?.main;
  		}
  		if (item.data[0]?.hasOwnProperty('width')) {
  			items['photos'] = item?.data;
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
	        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
	          <Tab label="Reviews" {...a11yProps(0)} />
	          <Tab label="Photos" {...a11yProps(1)} />
	        </Tabs>
	      </Box>
	      {
	      	loader ? (
		      	<Loader />
		      ) : (
		      	<>
		      		{
		      			!details
		      			?
		      				<p>No details found</p>
		      			:
		      				<>
		      					<TabPanel value={value} index={0}>
							        {details[0]?.tips && (<Reviews tips={details[0]?.tips} />)}
							      </TabPanel>
							      <TabPanel value={value} index={1}>
							        {details[0]?.photos && (<Photos photos={details[0]?.photos} />)}
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
