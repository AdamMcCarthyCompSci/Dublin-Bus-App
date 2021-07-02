import React, { useEffect } from 'react';
import styles from './Map.module.css';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import DayJsUtils from '@date-io/dayjs';
import { DateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from "react-swipeable-views";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

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


export function Results({handleChange, handleChangeIndex, value}) {
    const [results, setResults] = React.useState([])
    const [showResults, setShowResults] = React.useState(false)
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const theme = useTheme();

    useEffect(async () => {
        const result = await axios(
            'http://localhost:8000/bus/',
        )
        setResults(result.data)
    })

    const handleShowResults = () => {
        setShowResults(!showResults);
    }


    return (
            <div className={styles.resultsContainer}>
            {showResults && results.map((result => (
                <div style={{ overflow: "hidden"}}>
                <Slide direction="up" in={showResults} mountOnEnter unmountOnExit>
                <Button className={styles.ResultsButton} style={{textTransform: 'none', marginBottom: '1%'}} fullWidth="true" variant="contained" color="primary" onClick={() => { alert('clicked') }}>
                    <Grid container spacing={0}>
                        <Grid item xs={2}>
                        </Grid>
                        <Grid item xs={8} style={{textAlign: 'left'}}>
                            {result.title}
                            <br />
                            {result.directions}
                            <br />
                            {result.prediction}
                        </Grid>
                        <Grid item xs={2}>
                            <br />
                            <ArrowForwardIosIcon />
                        </Grid>
                    </Grid>
                    </Button>
                    </Slide>
                    </div>
            )))}
                    {!showResults && <Paper elevation={3} className={styles.paper}>
                    <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Directions" {...a11yProps(0)} />
          <Tab label="Timetable" {...a11yProps(1)} />
          <Tab label="Extra Features" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction} style={{height:"200px"}}>


                                    <div style={{height:"100%"}}>
                                    <MuiPickersUtilsProvider utils={DayJsUtils}>
                                    <DateTimePicker
                                        value={selectedDate}
                                        disablePast
                                        onChange={setSelectedDate}
                                        label="Select a date and time"
                                        showTodayButton
                                    />
                                    </MuiPickersUtilsProvider>
                                    </div>

        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction} style={{height:"200px"}}>
          Create Timetable Here
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction} style={{height:"200px"}}>
          Create Extra Features Here
        </TabPanel>
      </SwipeableViews>

                    </Paper>}
            </div>
    )
}