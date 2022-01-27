import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import CreateInvoice from './CreateInvoice';
import Invoices from './Invoices';
import Settings from './Settings';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    {
       localStorage.getItem('_token')!=undefined? 
       <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: "100%" }}
      
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
        style={{height:"100%",width:"300px"}} className='text-center'
      >
        <Tab  style={{margin:"20px"}} label="Dashboard" {...a11yProps(0)} />
        <Tab  style={{margin:"20px"}} label="Create Invoice" {...a11yProps(1)} />
        <Tab style={{margin:"20px",marginBottom:"270px"}} label="Invoices" {...a11yProps(2)} />
        {/* <Tab style={{margin:"20px"}} label="Settings" {...a11yProps(4)} /> */}
        </Tabs>
      <TabPanel value={value} index={0}>
        <Dashboard/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CreateInvoice/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Invoices/>
      </TabPanel>
      {/* <TabPanel value={value} index={3}>
        <Settings/>
      </TabPanel> */}
      
      
    </Box>:<Navigate to="/login"/>
    }
    </>
    
  );
}
