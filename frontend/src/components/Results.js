import React from 'react';
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

export function Results({menu, setMenu, callbackResponse, weather, settings}) {
    const [expand, setExpand] = React.useState(false);

    let response = null;
    if (callbackResponse !== null) {
        response = callbackResponse.routes[0].legs[0];
    }

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
            {callbackResponse !== null && (
            <React.Fragment>
            {expand &&
            response.steps.map((step) => (
                        <Zoom in={menu==='Results'} mountOnEnter unmountOnExit>
            <Paper elevation={3} className={styles.stepPaper} style={{backgroundColor: "#757de8"}}>
                <p key={step.instructions} className={styles.directionsText}> {step.instructions} {getBusNumber(step)}</p>
            </Paper>
            </Zoom>
            ))}

            <Slide direction="up" in={menu==='Results'} mountOnEnter unmountOnExit>
            <Paper elevation={3} className={styles.stepTitlePaper} style={{backgroundColor: "#002984"}}>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <Fab color="primary" aria-label="back" className={styles.resultsBackButton} onClick={() => setMenu("Home")}>
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
                    <p className={styles.directionsText}><i>Predicted arrival time: {response.arrival_time.text} (in {response.duration.text})</i></p>
                    {weather && settings.showWeather &&
                        <img src={'http://openweathermap.org/img/wn/' + weather.icon + '.png'} />
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




{/* <div className={styles.directionsPaperContainer}>
<Paper elevation={3} className={styles.stepTitlePaper} style={{backgroundColor: "#002984"}}>
<p>Invalid Directions</p>
</Paper>
</div> */}