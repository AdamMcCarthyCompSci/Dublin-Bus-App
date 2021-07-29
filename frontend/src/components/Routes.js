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
            ],
            routeUnique: [],
            directionUnique: []
        }

        this.getUnique = this.getUnique.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.activateDirectionDropdown = this.activateDirectionDropdown.bind(this)
        this.activateBoardingDropdown = this.activateBoardingDropdown.bind(this)
        this.activateAlightingDropdown = this.activateAlightingDropdown.bind(this)
        this.activateFareType = this.activateFareType.bind(this)
        this.activateFinalDropdown = this.activateFinalDropdown.bind(this)
        this.alightingFilter = this.alightingFilter.bind(this)
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
                loading: false,
                routeUnique: this.getUnique(result.data.routes, 'busnumber'),
                directionUnique: this.getUnique(result.data.routes, 'routedescription')
            });
        };
        if (this.state.routes.length === 0) {
            await fetchData();
        }
    }

    getUnique(route, comp) {
        const unique = route.map(e => e[comp])
            // store the indexes of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)

            // eliminate the false indexes & return unique objects
            .filter((e) => route[e]).map(e => route[e]);
        return unique;
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

    activateDirectionDropdown(e) {
        const {value} = e.target;
        this.setState({
            ...this.state,
            route: value,
            direction: "",
            boardingStop: "",
            alightingStop: "",
            fareType: "",
            price: null,
            directionDropdown: true,
            boardingDropdown: false,
            alightingDropdown: false,
            fareTypeDropdown: false,
            finalDropdown: false,
        });
    }

    activateBoardingDropdown(e) {
        const {value} = e.target;
        this.setState({
            ...this.state,
            direction: value,
            boardingStop: "",
            alightingStop: "",
            fareType: "",
            price: null,
            boardingDropdown: true,
            alightingDropdown: false,
            fareTypeDropdown: false,
            finalDropdown: false,
        });
    }

    activateAlightingDropdown(e) {
        const {value} = e.target;
        this.setState({
            ...this.state,
            boardingStop: value,
            alightingStop: "",
            fareType: "",
            price: null,
            alightingDropdown: true,
            fareTypeDropdown: false,
            finalDropdown: false,
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

    alightingFilter(routes) {
        const filtered = routes.filter(stopdetail => stopdetail.busnumber == this.state.route && stopdetail.routedescription + " " + stopdetail.direction == this.state.direction);
        const boardingNumberIndex = (element) => element.platecode === this.state.boardingStop;
        return filtered.slice(filtered.findIndex(boardingNumberIndex) + 1);
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
                        <Grid item xs={6}>

                            {/*Dropdown 1. Route numbers aka bus numbers.*/}
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
                                        {this.state.routeUnique.map((stopdetail, index) => (
                                            <MenuItem key={stopdetail.id}
                                                      value={stopdetail.busnumber}>{stopdetail.busnumber}</MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText style={{color: this.props.darkText}}>Select a Route</FormHelperText>
                                </FormControl>
                            </Paper>

                        </Grid>
                        <Grid item xs={6}>

                            {/*Dropdown 2 Route direction first stop on the route to last stop.*/}
                            <Paper className={styles.routeDropdownContainer}
                                   style={{backgroundColor: this.props.darkForeground}}>
                                {this.state.directionDropdown &&
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
                                        {this.state.directionUnique.filter(stopdetail => stopdetail.busnumber == this.state.route).map((stopdetail, index) => (
                                            <MenuItem key={stopdetail.id}
                                                      value={stopdetail.routedescription + " " + stopdetail.direction}>{stopdetail.routedescription + " " + stopdetail.direction}</MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText style={{color: this.props.darkText}}>Select a
                                        Direction</FormHelperText>
                                </FormControl>
                                }
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>

                            {/*Dropdown 3 Boarding bus stop*/}
                            <Paper className={styles.routeDropdownContainer}
                                   style={{backgroundColor: this.props.darkForeground}}>
                                {this.state.boardingDropdown &&
                                <FormControl>
                                    <InputLabel id="dropdown3" style={{color: this.props.darkText}}>Boarding
                                        Stop</InputLabel>
                                    <Select
                                        style={{color: this.props.darkText}}
                                        labelId="dropdown3"
                                        id="dropdown3"
                                        value={this.state.boardingStop}
                                        onChange={this.activateAlightingDropdown}>
                                        {this.state.routes.filter(stopdetail => stopdetail.busnumber == this.state.route && (stopdetail.routedescription + " " + stopdetail.direction) == this.state.direction).map((stopdetail, index) => (
                                            <MenuItem key={stopdetail.id}
                                                      value={stopdetail.platecode}>{stopdetail.shortcommonname_en + " Bus Stop: " + stopdetail.platecode}</MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText style={{color: this.props.darkText}}>Select a Boarding
                                        Stop</FormHelperText>
                                </FormControl>
                                }
                            </Paper>

                        </Grid>
                        <Grid item xs={6}>

                            {/*Dropdown 4 alighting bus stop.*/}
                            <Paper className={styles.routeDropdownContainer}
                                   style={{backgroundColor: this.props.darkForeground}}>
                                {this.state.alightingDropdown &&
                                <FormControl>
                                    <InputLabel id="dropdown4" style={{color: this.props.darkText}}>Alighting
                                        Stop</InputLabel>
                                    <Select
                                        style={{color: this.props.darkText}}
                                        labelId="dropdown4"
                                        id="dropdown4"
                                        value={this.state.alightingStop}
                                        onChange={this.activateFareType}>
                                        {this.alightingFilter(this.state.routes).map((stopdetail, index) => (
                                            <MenuItem key={stopdetail.id}
                                                      value={stopdetail.platecode}>{stopdetail.shortcommonname_en + " Bus Stop: " + stopdetail.platecode}</MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText style={{color: this.props.darkText}}>Select an Alighting
                                        Stop</FormHelperText>
                                </FormControl>
                                }
                            </Paper>
                        </Grid>

                        {!this.props.logged && <Grid item xs={6}>

                            {/*Dropdown 5 fare type.*/}
                            <Paper className={styles.routeDropdownContainer}
                                   style={{backgroundColor: this.props.darkForeground}}>
                                {this.state.fareTypeDropdown &&
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
                                }
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