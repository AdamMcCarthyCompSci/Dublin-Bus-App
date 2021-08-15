import React from 'react';
import axios from 'axios';
import {authFetch} from "../auth";
import styles from './Map.module.css';
import Routes from "./Routes";
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

class Pricing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            route: null,
            direction: null,
            boardingStop: null,
            alightingStop: null,
            fareType: null,
            price: null,
            fares: [
                'Adult Cash',
                'Adult Leap',
                'Child Leap (Under 19)',
                'Child Cash (Under 16)'
            ]
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.setRoute = this.setRoute.bind(this)
        this.setDirection = this.setDirection.bind(this)
        this.setBoarding = this.setBoarding.bind(this)
        this.setAlighting = this.setAlighting.bind(this)
        this.selectFareType = this.selectFareType.bind(this)
    }

    setRoute(route) {
        this.setState({
            route,
            direction: null,
            boardingStop: null,
            alightingStop: null,
            fareType: null,
            price: null
        });
    }

    setDirection(direction) {
        this.setState({
            direction,
            boardingStop: null,
            alightingStop: null,
            fareType: null,
            price: null
        });
    }

    setBoarding(boardingStop) {
        this.setState({
            boardingStop: boardingStop.platecode,
            alightingStop: null,
            fareType: null,
            price: null
        });
    }

    setAlighting(alightingStop) {
        this.setState({
            alightingStop: alightingStop.platecode,
            fareType: null,
            price: null
        });
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
                price: result.data
            });
        }
        // document.getElementById("price").scrollIntoView();
    }

    async handleSubmit() {
        await this.showPrice(
            this.state.route,
            this.state.direction[this.state.direction.length - 1],
            this.state.boardingStop,
            this.state.alightingStop,
            this.state.fareType);
    }

    async selectFareType(e) {
        const {value} = e.target;
        await this.setState({
            fareType: value,
            price: null
        });
        // document.getElementById("submit").scrollIntoView();
    }

    render() {
        if (this.state.loading) {
            return (<React.Fragment>
                <CircularProgress/>
                <div style={{color: this.props.darkText, marginTop: '8px'}}>Retrieving routes...</div>
            </React.Fragment>);
        } else {
            return (
                <React.Fragment>
                    {this.state.price && (this.props.logged ?
                            (this.state.price.cost ? <Alert id="price" severity="info" style={{marginBottom: '16px'}}>
                                    Your journey will cost: €{this.state.price.cost}
                                </Alert>
                                :
                                <Alert id="price" severity="info" style={{marginBottom: '16px'}}>
                                    Your journey will cost:
                                    <ul style={{textAlign: 'left', marginBottom: 0}}>
                                        <li>Leap Card: €{this.state.price.leap}</li>
                                        <li>Cash: €{this.state.price.cash}</li>
                                    </ul>
                                </Alert>)
                            :
                            <Alert id="price" severity="info" style={{marginBottom: '16px'}}>
                                Your journey will cost: €{this.state.price.cost}
                            </Alert>
                    )}
                    <Routes setRoute={this.setRoute} setDirection={this.setDirection} setBoarding={this.setBoarding}
                            setAlighting={this.setAlighting} darkBackground={this.props.darkBackground}
                            darkForeground={this.props.darkForeground} darkText={this.props.darkText}/>
                    <Grid container spacing={1} style={{marginTop: "4px", marginBottom: "16px"}}>
                        {(!this.props.logged && this.state.alightingStop) && <Grid item xs={12} md={6} id="fare">
                            <Paper className={styles.routeDropdownContainer}
                                   style={{backgroundColor: this.props.darkForeground}}>
                                <FormHelperText style={{color: this.props.darkText, marginBottom: '8px'}}>5. Select fare
                                    type</FormHelperText>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="dropdown5" style={{color: this.props.darkText}}>Fare
                                        Type</InputLabel>
                                    <Select
                                        style={{color: this.props.darkText}}
                                        labelId="dropdown5"
                                        id="dropdown5"
                                        label="Fare Type"
                                        value={this.state.fareType}
                                        onChange={this.selectFareType}>
                                        {this.state.fares.map((fare, index) => (
                                            <MenuItem key={index} value={fare}>{fare}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Paper>
                        </Grid>}
                    </Grid>

                    {(this.state.fareType || (this.props.logged && this.state.alightingStop)) &&
                    <Button
                        className={styles.submitButton}
                        variant="contained"
                        color="primary"
                        id="submit"
                        fullWidth
                        onClick={this.handleSubmit}
                        size="large"
                    >
                        Submit
                    </Button>
                    }
                </React.Fragment>
            )
        }
    }
}

export default Pricing;