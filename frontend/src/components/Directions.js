import React from 'react';
import styles from './Map.module.css';
import {LeaveArriveButton} from './LeaveArriveButton';
import Routes from "./Routes";
import DayJsUtils from '@date-io/dayjs';
import {DateTimePicker, TimePicker} from "@material-ui/pickers";
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

class Directions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            route: null,
            direction: null,
            boardingStop: null,
            alightingStop: null,
            classes: makeStyles((theme) => ({
                searchPaper: {
                    padding: '2px 4px',
                    marginTop: '-10px',
                    marginBottom: '20px',
                    alignItems: 'center',
                    width: "80%",
                    marginLeft: "10%",
                    zIndex: 2,
                },
                standaloneSearchBox: {
                    // marginLeft: theme.spacing(1),
                    flex: 1,
                    position: "absolute",
                    width: "100%",
                    margin: "auto",
                    height: "auto",
                },
                input: {
                    // marginLeft: theme.spacing(1),
                    flex: 1,
                    width: "100%",
                    margin: "auto",
                    height: "auto",
                },
                inputTextColor: {
                    // color:'#002984'
                }
            }))
        }
        this.setRoute = this.setRoute.bind(this)
        this.setDirection = this.setDirection.bind(this)
        this.setBoarding = this.setBoarding.bind(this)
        this.setAlighting = this.setAlighting.bind(this)
    }

    setRoute(route) {
        this.setState({
            route,
            direction: null,
            boardingStop: null,
            alightingStop: null
        });
    }

    setDirection(direction) {
        this.setState({
            direction,
            boardingStop: null,
            alightingStop: null
        });
    }

    setBoarding(boardingStop) {
        this.setState({
            boardingStop: boardingStop.platecode,
            alightingStop: null
        });
        this.props.setOrigin({
            lat: boardingStop.lat,
            lng: boardingStop.lon
        });
    }

    setAlighting(alightingStop) {
        this.setState({
            alightingStop: alightingStop.platecode
        });
        this.props.setDestination({
            lat: alightingStop.lat,
            lng: alightingStop.lon
        });
    }

    render() {
        return (
            <React.Fragment>
                {this.props.favouriteRoute &&
                <TextField
                    className={this.state.classes.input}
                    value={this.props.favouriteTitle}
                    onChange={this.props.handleTitleChange}
                    placeholder={this.props.favouriteTitle ? this.props.favouriteTitle : "Enter a title"}
                    label={"Stop title"}
                    variant="outlined"
                    inputProps={{'aria-label': 'search google maps', style: {color: this.props.darkText}}}
                />
                }

                <Grid container spacing={1} alignItems="center" className={styles.dateAndButtonContainer}
                      style={{marginBottom: "12px"}}>

                    {!this.props.favouriteRoute &&
                    <Grid item xs={12} md={3}>
                        <LeaveArriveButton leaveArrive={this.props.leaveArrive}
                                           setLeaveArrive={this.props.setLeaveArrive}
                                           setNewDirections={this.props.setNewDirections}/>
                    </Grid>
                    }
                    <Grid item xs={12} md={this.props.favouriteRoute ? 12 : 9}>
                        {this.props.favouriteRoute &&
                        <MuiPickersUtilsProvider utils={DayJsUtils}>
                            <TimePicker
                                className={styles.datePicker}
                                value={this.props.selectedDate}
                                onChange={this.props.setSelectedDate}
                                label="Select a Time to Arrive At"
                                inputVariant="outlined"
                                inputProps={{style: {color: this.props.darkText}}}
                                InputLabelProps={{
                                    style: {color: this.props.darkText},
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        }
                        {!this.props.favouriteRoute &&
                        <MuiPickersUtilsProvider utils={DayJsUtils}>
                            <DateTimePicker
                                className={styles.datePicker}
                                value={this.props.selectedDate}
                                disablePast
                                maxDate={new Date().setDate(new Date().getDate() + 1)}
                                onChange={this.props.setSelectedDate}
                                label="Select a Date and Time"
                                inputVariant="outlined"
                                showTodayButton
                                inputProps={{style: {color: this.props.darkText}}}
                                InputLabelProps={{
                                    style: {color: this.props.darkText},
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        }
                    </Grid>
                </Grid>

                <Routes setRoute={this.setRoute} setDirection={this.setDirection} setBoarding={this.setBoarding}
                        setAlighting={this.setAlighting} darkBackground={this.props.darkBackground}
                        darkForeground={this.props.darkForeground} darkText={this.props.darkText}/>

                {!this.props.favouriteRoute &&
                <Button
                    className={styles.submitButton}
                    style={{marginTop: "16px"}}
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={!this.state.boardingStop || !this.state.alightingStop}
                    onClick={async () => {
                        this.props.setPrediction(null);
                        await this.props.setMenu('Results');
                        const weather = await this.props.showWeather(this.props.selectedDate);
                        await this.props.setNewDirections(false);
                        await this.props.predict({
                            weather,
                            route: this.state.route,
                            direction: this.state.direction === 'O' ? 1 : 2,
                            boarding: this.state.boardingStop,
                            alighting: this.state.alightingStop
                        });
                    }}>
                    Submit
                </Button>
                }

                {origin !== "" && this.props.destination !== "" && this.props.originError === "" && this.props.destinationError === "" &&
                this.props.favouriteRoute &&
                <Button
                    className={styles.favouriteSubmitButton}
                    style={{marginTop: "16px"}}
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    onClick={() => {
                        this.props.saveFavourite(this.props.favouriteTitle ? this.props.favouriteTitle : "Unnamed Route", origin, this.props.destination, this.props.selectedDate);
                        this.props.setNewDirections(false);
                        this.props.setFavouriteView(true);
                        // Call prediction
                    }}>
                    Submit
                </Button>
                }
                {((origin === "" || this.props.destination === "") || (this.props.originError !== "" || this.props.destinationError !== "")) &&
                this.props.favouriteRoute &&
                <Button
                    className={styles.favouriteSubmitButton}
                    style={{marginTop: "16px"}}
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled
                >
                    Submit
                </Button>
                }
            </React.Fragment>
        )
    }
}

export default Directions;