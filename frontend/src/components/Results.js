import React, { useEffect } from 'react';
import styles from './Map.module.css';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import Zoom from '@material-ui/core/Zoom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Fab from '@material-ui/core/Fab';
import zIndex from '@material-ui/core/styles/zIndex';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import { Scrollbars } from 'react-custom-scrollbars';

export function Results({menu, setMenu, callbackResponse, weather, settings, leaveArrive, walkingCallbackResponse, walking, setWalking}) {
    const [expand, setExpand] = React.useState(false);
    const [response, setResponse] = React.useState(null);
    const [walkingResponse, setWalkingResponse] = React.useState(null);
    const [walkingConditions, setWalkingConditions] = React.useState([])
    const goodWeather = ["01d", "01n", "02d", "02n", "03d", "03n", "04d", "04n"];

    useEffect(() => {
        setResponse(callbackResponse ? callbackResponse.routes[0].legs[0] : null);
    }, [callbackResponse, menu]);

    useEffect(() => {
        setWalkingResponse(walkingCallbackResponse ? walkingCallbackResponse.routes[0].legs[0] : null);
        setWalkingConditions(walkingCallbackResponse ? [walkingCallbackResponse.routes[0].legs[0].distance.value < 2000, weather.feels_like > 10, goodWeather.includes(weather.icon)] : [null]);
    }, [walkingCallbackResponse, menu]);


    const getBusNumber = (step) => {
        if ("transit" in step) {
            const busNumber = step.transit.line.short_name;
            return (
                "(" + busNumber + ")"
            )
        }
        else {
            return null
        }
    }

    return (
        <div className={styles.directionsPaperContainer}>
        <React.Fragment>
        {(!walkingConditions.includes(false) && walking === null && response !== null && walkingResponse !== null) &&
        <Slide direction="up" in={menu==='Results'} mountOnEnter unmountOnExit>
            <Paper elevation={3} className={styles.stepTitlePaper} style={{backgroundColor: "#002984"}}>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={8}>
                <p className={styles.directionsText}><b>The weather looks nice and it's not too far ({response.distance.text}), perhaps consider walking?</b></p>
                {weather && settings.showWeather &&
                        <img src={'http://openweathermap.org/img/wn/' + weather.icon + '.png'} />
                    }  
                </Grid>
                <Grid item xs={2}>
                </Grid>
            </Grid>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <Fab color="primary" aria-label="back" className={styles.walkOrBusBackButton} onClick={() => {
                        setMenu("Home");
                        setWalking(null);
                        }}>
                        <ArrowBackIcon />
                    </Fab>
                </Grid>
                <Grid item xs={4}>
                    <Fab size="large" color="primary" aria-label="menu" style={{marginTop: "5px"}} onClick={() => {
                        setWalking(false);
                        }}>
                    <Zoom in={callbackResponse !== null} mountOnEnter unmountOnExit>
                        <DirectionsBusIcon />
                    </Zoom>
                    </Fab>
                    <p className={styles.directionsText}><i>{response.duration.text}</i></p>
                </Grid>
                <Grid item xs={4}>
                    <Fab size="large" color="primary" aria-label="menu" style={{marginTop: "5px"}} onClick={() => {
                        setWalking(true);
                        }}>
                    <Zoom in={callbackResponse !== null} mountOnEnter unmountOnExit>
                        <DirectionsWalkIcon />
                    </Zoom>
                    </Fab>
                    <p className={styles.directionsText}><i>{walkingResponse.duration.text}</i></p>
                </Grid>
                <Grid item xs={2}>
                </Grid>
                </Grid>
            </Paper>
            </Slide>
            }



            {((walkingConditions.includes(false) && response !== null && walkingResponse !== null) || (walking !== null && response !== null && walkingResponse !== null)) && (
            <React.Fragment>
            <Zoom in={expand} mountOnEnter unmountOnExit>
            <div className={styles.stepsFade}></div>
            </Zoom>
            <div className={styles.stepsContainer}>
            <Scrollbars style={{ height: 300 }}>
            {expand && walking !== true &&
            response.steps.map((step) => (
                        <Zoom in={menu==='Results'} mountOnEnter unmountOnExit>
            <Paper elevation={3} className={styles.stepPaper} style={{backgroundColor: "#757de8"}}>
                <p key={step.instructions} className={styles.directionsText}> {step.instructions} {getBusNumber(step)}</p>
            </Paper>
            </Zoom>
            ))}

            {expand && walking === true &&
            walkingResponse.steps.map((step) => (
                        <Zoom in={menu==='Results'} mountOnEnter unmountOnExit>
            <Paper elevation={3} className={styles.stepPaper} style={{backgroundColor: "#757de8"}}>
                <p><div key={step.instructions} className={styles.walkingDirectionsText} dangerouslySetInnerHTML={{__html: step.instructions}} /></p>
            </Paper>
            </Zoom>
            ))}
            </Scrollbars>
            </div>

            <Slide direction="up" in={menu==='Results'} mountOnEnter unmountOnExit>
            <Paper elevation={3} className={styles.stepTitlePaper} style={{backgroundColor: "#002984"}}>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <Fab color="primary" aria-label="back" className={styles.resultsBackButton} onClick={() => {
                        setMenu("Home");
                        setWalking(null);
                        }}>
                        <ArrowBackIcon />
                    </Fab>
                </Grid>
                <Grid item xs={8}>
                    <Fab size="small" color="primary" aria-label="menu" style={{marginTop: "5px"}} onClick={() => setExpand(!expand)}>
                    {!expand &&
                    <Zoom in={!expand} mountOnEnter unmountOnExit>
                        <ExpandLessIcon />
                    </Zoom>
                    }
                    {expand && 
                    <Zoom in={expand} mountOnEnter unmountOnExit>
                        <ExpandMoreIcon />
                    </Zoom>
                    }
                    </Fab>
                    <p className={styles.directionsText}><b>To {response.end_address} ({response.distance.text})</b></p>
                    {(walking === false || walking === null) &&
                        <p className={styles.directionsText}><i>Predicted {leaveArrive === "Leave At:" ? "arrival" : "departure"} time: {leaveArrive === "Leave At:" ? response.arrival_time.text : response.departure_time.text} ({response.duration.text})</i></p>
                    }
                    {walking === true &&
                        <p className={styles.directionsText}><i>Walking Distance: {walkingResponse.distance.text} ({walkingResponse.duration.text})</i></p>
                    }
                    {weather && settings.showWeather &&
                        <img src={'http://openweathermap.org/img/wn/' + weather.icon + '.png'} alt="Weather Icon"/>
                    }
                </Grid>
                <Grid item xs={2}>
                </Grid>
                </Grid>
            </Paper>
            </Slide>

            </React.Fragment>
            )}
            {callbackResponse === null && (
                <div className={styles.directionsPaperContainer}>
                <Paper elevation={3} className={styles.stepTitlePaper} style={{backgroundColor: "#002984"}}>
                <p className={styles.directionsText}>Creating Route...</p>
                </Paper>
                </div>
            )}

        </React.Fragment>
        </div>
    )
}