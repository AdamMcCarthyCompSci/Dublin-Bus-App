import React, { useEffect } from 'react';
import styles from './Map.module.css';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import DayJsUtils from '@date-io/dayjs';
import { DateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

export function Results() {
    const [results, setResults] = React.useState([])
    const [showResults, setShowResults] = React.useState(false)
    const [stepper, setStepper] = React.useState(0)
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    
    useEffect(async () => {
        const result = await axios(
            'http://localhost:8000/bus/',
        )
        setResults(result.data)
    })

    const handleShowResults = () => {
        setShowResults(!showResults);
    }

    const handleNextStep = () => {
        setStepper(stepper + 1);
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
                        <Stepper activeStep={stepper} orientation="vertical">
                            <Step>
                                <StepLabel>Current Location</StepLabel>
                                <StepContent>
                                <Button className={styles.ResultsButton} style={{textTransform: 'none', marginBottom: '1%'}} fullWidth="true" variant="contained" color="primary" onClick={() => { handleNextStep() }}>
                                    Next Step
                                </Button>
                                </StepContent>
                            </Step>
                            <Step>
                                <StepLabel>Destination</StepLabel>
                                <StepContent>
                                <Button className={styles.ResultsButton} style={{textTransform: 'none', marginBottom: '1%'}} fullWidth="true" variant="contained" color="primary" onClick={() => { handleNextStep() }}>
                                    Next Step
                                </Button>
                                </StepContent>
                            </Step>
                            <Step>
                                <StepLabel>Time</StepLabel>
                                <StepContent>
                                <MuiPickersUtilsProvider utils={DayJsUtils}>
                                <DateTimePicker
                                    value={selectedDate}
                                    disablePast
                                    onChange={setSelectedDate}
                                    label="Select a date and time"
                                    showTodayButton
                                />
                                </MuiPickersUtilsProvider>
                                </StepContent>
                            </Step>
                        </Stepper>
                        <Button className={styles.ResultsButton} style={{textTransform: 'none', marginBottom: '1%'}} fullWidth="true" variant="contained" color="primary" onClick={() => { handleShowResults() }}>
                            Next
                        </Button>
                    </Paper>}
            </div>
    )
}