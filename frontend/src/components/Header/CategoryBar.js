import Updates from 'views/HomePage/updateDisplay';
import Bolo from 'views/HomePage/boloDisplay';
import News from 'views/HomePage/newsdisplay';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          centered
          
          aria-label="full width tabs example"
        >
          <Tab label="News" {...a11yProps(0)} />
          <Tab label="Updates" {...a11yProps(1)} />
          <Tab label="BOLO" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

        <TabPanel value={value} index={0} dir={theme.direction}>
          <News />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Updates/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Bolo/>
        </TabPanel>
    </div>
  );
}
