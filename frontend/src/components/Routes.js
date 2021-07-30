import React from 'react';
import axios from 'axios';
import {authFetch} from "../auth";
import styles from './Map.module.css';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from "@material-ui/lab/Alert";

class Routes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            routes: [],
            directions: [],
            boardingStops: [],
            alightingStops: [],
            route: "",
            direction: "",
            boardingStop: "",
            alightingStop: "",
            fareType: "",
            price: null,
            directionDropdown: false,
            boardingDropdown: false,
            alightingDropdown: false,
            fareTypeDropdown: false,
            finalDropdown: false,
            fares: [
                'Adult Cash',
                'Adult Leap',
                'Child Leap (Under 19)',
                'Child Cash (Under 16)'
            ]
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.activateDirectionDropdown = this.activateDirectionDropdown.bind(this)
        this.activateBoardingDropdown = this.activateBoardingDropdown.bind(this)
        this.activateAlightingDropdown = this.activateAlightingDropdown.bind(this)
        this.activateFareType = this.activateFareType.bind(this)
        this.activateFinalDropdown = this.activateFinalDropdown.bind(this)
    }

    async componentDidMount() {
        const fetchData = async () => {
            this.setState({
                ...this.state,
                loading: true
            });
            const result = await axios(process.env.REACT_APP_API_URL + '/bus/routes');
            this.setState({
                ...this.state,
                routes: result.data.routes,
                loading: false
            });
        };
        if (this.state.routes.length === 0) {
            await fetchData();
        }
    }

    async showPrice(route, direction, start, end, fare) {
        if (this.props.logged) {
            const result = await authFetch(process.env.REACT_APP_API_URL + "/bus/price?" + new URLSearchParams({
                route,
                direction,
                start,
                end
            }));
            const json = await result.json();
            this.setState({
                ...this.state,
                price: json
            });
        } else {
            const result = await axios.get(process.env.REACT_APP_API_URL + "/bus/price", {
                params: {
                    route,
                    direction,
                    start,
                    end,
                    fare
                }
            });
            this.setState({
                ...this.state,
                price: result.data
            });
        }
    }

    async handleSubmit() {
        await this.showPrice(
            this.state.route,
            this.state.direction[this.state.direction.length - 1],
            this.state.boardingStop,
            this.state.alightingStop,
            this.state.fareType);
    }

    async activateDirectionDropdown(e) {
        const {value} = e.target;
        this.setState({
            ...this.state,
            route: value,
            direction: "",
            boardingStop: "",
            alightingStop: "",
            fareType: "",
            price: null,
            boardingDropdown: false,
            alightingDropdown: false,
            fareTypeDropdown: false,
            finalDropdown: false
        });
        const result = await axios(process.env.REACT_APP_API_URL + '/bus/routes/' + value + '/directions');
        this.setState({
            ...this.state,
            directions: result.data.directions,
            directionDropdown: true
        });
    }

    async activateBoardingDropdown(e) {
        const {value} = e.target;
        this.setState({
            ...this.state,
            direction: value,
            boardingStop: "",
            alightingStop: "",
            fareType: "",
            price: null,
            alightingDropdown: false,
            fareTypeDropdown: false,
            finalDropdown: false
        });
        const result = await axios(process.env.REACT_APP_API_URL + '/bus/routes/' + this.state.route + '/directions/' + value + '/boarding');
        this.setState({
            ...this.state,
            boardingStops: result.data.boarding,
            boardingDropdown: true
        });
    }

    async activateAlightingDropdown(e) {
        const {value} = e.target;
        this.setState({
            ...this.state,
            boardingStop: value,
            alightingStop: "",
            fareType: "",
            price: null,
            fareTypeDropdown: false,
            finalDropdown: false,
        });
        const result = await axios(process.env.REACT_APP_API_URL + '/bus/routes/' + this.state.route + '/directions/' + this.state.direction + '/boarding/' + value + '/alighting');
        this.setState({
            ...this.state,
            alightingStops: result.data.alighting,
            alightingDropdown: true
        });
    }

    activateFareType(e) {
        const {value} = e.target;
        if (this.props.logged) {
            this.setState({
                ...this.state,
                alightingStop: value,
                fareType: "",
                price: null,
                finalDropdown: true,
            });
        } else {
            this.setState({
                ...this.state,
                alightingStop: value,
                fareType: "",
                price: null,
                fareTypeDropdown: true,
                finalDropdown: false,
            });
        }
    }

    activateFinalDropdown(e) {
        const {value} = e.target;
        this.setState({
            ...this.state,
            fareType: value,
            price: null,
            finalDropdown: true,
        });
    }

    render() {
        if (this.state.loading) {
            return (<div>
                <CircularProgress/>
                <div style={{color: this.props.darkText, marginTop: '8px'}}>Retrieving routes...</div>
            </div>);
        } else {
            return (
                <div style={{overflowY: 'scroll', maxHeight: '220px'}}>
                    {this.state.price && (this.props.logged ?
                        (this.state.price.cost ? <Alert severity="info" style={{marginBottom: '16px'}}>
                                Your journey will cost: €{this.state.price.cost}
                            </Alert>
                            :
                            <Alert severity="info" style={{marginBottom: '16px'}}>
                                Your journey will cost:
                                <ul style={{textAlign: 'left', marginBottom: 0}}>
                                    <li>Leap Card: €{this.state.price.leap}</li>
                                    <li>Cash: €{this.state.price.cash}</li>
                                </ul>
                            </Alert>)
                        :
                        <Alert severity="info" style={{marginBottom: '16px'}}>
                            Your journey will cost: €{this.state.price.cost}
                        </Alert>)}

                    <Grid container spacing={1} style={{marginBottom: "20px"}}>
                        {this.state.routes.length > 0 && <Grid item xs={6}>
                            <Paper className={styles.routeDropdownContainer}
                                   style={{backgroundColor: this.props.darkForeground}}>
                                <FormControl>
                                    <InputLabel id="dropdown1" style={{color: this.props.darkText}}>Route</InputLabel>
                                    <Select
                                        style={{color: this.props.darkText}}
                                        labelId="dropdown1"
                                        id="dropdown1"
                                        value={this.state.route}
                                        onChange={this.activateDirectionDropdown}
                                    >
                                        {this.state.routes.map(route => (
                                            <MenuItem key={route.routename}
                                                      value={route.routename}>{route.routename}</MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText style={{color: this.props.darkText}}>Select a Route</FormHelperText>
                                </FormControl>
                            </Paper>
                        </Grid>}
                        {this.state.directionDropdown && <Grid item xs={6}>
                            <Paper className={styles.routeDropdownContainer}
                                   style={{backgroundColor: this.props.darkForeground}}>
                                <FormControl>
                                    <InputLabel id="dropdown2"
                                                style={{color: this.props.darkText}}>Direction</InputLabel>
                                    <Select
                                        style={{color: this.props.darkText}}
                                        labelId="dropdown2"
                                        id="dropdown2"
                                        value={this.state.direction}
                                        onChange={this.activateBoardingDropdown}
                                    >
                                        {this.state.directions.map(direction => (
                                            <MenuItem key={direction.direction}
                                                      value={direction.direction}>{direction.routedescription + " " + direction.direction}</MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText style={{color: this.props.darkText}}>Select a
                                        Direction</FormHelperText>
                                </FormControl>
                            </Paper>
                        </Grid>}
                        {this.state.boardingDropdown && <Grid item xs={6}>
                            <Paper className={styles.routeDropdownContainer}
                                   style={{backgroundColor: this.props.darkForeground}}>
                                <FormControl>
                                    <InputLabel id="dropdown3" style={{color: this.props.darkText}}>Boarding
                                        Stop</InputLabel>
                                    <Select
                                        style={{color: this.props.darkText}}
                                        labelId="dropdown3"
                                        id="dropdown3"
                                        value={this.state.boardingStop}
                                        onChange={this.activateAlightingDropdown}>
                                        {this.state.boardingStops.map(boarding => (
                                            <MenuItem key={boarding.id}
                                                      value={boarding.platecode}>{boarding.shortcommonname_en + " Bus Stop: " + boarding.platecode}</MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText style={{color: this.props.darkText}}>Select a Boarding
                                        Stop</FormHelperText>
                                </FormControl>
                            </Paper>
                        </Grid>}
                        {this.state.alightingDropdown && <Grid item xs={6}>
                            <Paper className={styles.routeDropdownContainer}
                                   style={{backgroundColor: this.props.darkForeground}}>
                                <FormControl>
                                    <InputLabel id="dropdown4" style={{color: this.props.darkText}}>Alighting
                                        Stop</InputLabel>
                                    <Select
                                        style={{color: this.props.darkText}}
                                        labelId="dropdown4"
                                        id="dropdown4"
                                        value={this.state.alightingStop}
                                        onChange={this.activateFareType}>
                                        {this.state.alightingStops.map(alighting => (
                                            <MenuItem key={alighting.id}
                                                      value={alighting.platecode}>{alighting.shortcommonname_en + " Bus Stop: " + alighting.platecode}</MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText style={{color: this.props.darkText}}>Select an Alighting
                                        Stop</FormHelperText>
                                </FormControl>
                            </Paper>
                        </Grid>}
                        {(!this.props.logged && this.state.fareTypeDropdown) && <Grid item xs={6}>
                            <Paper className={styles.routeDropdownContainer}
                                   style={{backgroundColor: this.props.darkForeground}}>
                                <FormControl>
                                    <InputLabel id="dropdown5" style={{color: this.props.darkText}}>Fare
                                        Type</InputLabel>
                                    <Select
                                        style={{color: this.props.darkText}}
                                        labelId="dropdown5"
                                        id="dropdown5"
                                        value={this.state.fareType}
                                        onChange={this.activateFinalDropdown}>
                                        {this.state.fares.map((fare, index) => (
                                            <MenuItem key={index} value={fare}>{fare}</MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText style={{color: this.props.darkText}}>Select fare
                                        type</FormHelperText>
                                </FormControl>
                            </Paper>
                        </Grid>}
                    </Grid>

                    {this.state.finalDropdown &&
                    <Button
                        className={styles.submitButton}
                        variant="contained"
                        color="primary"
                        onClick={this.handleSubmit}>
                        Submit
                    </Button>
                    }
                </div>
            )
        }
    }
}

export default Routes;