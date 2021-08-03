import React from 'react';
import axios from "axios";
import { PrivacyPolicy } from "./PrivacyPolicy.js";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from "@material-ui/lab/Alert";
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class UserRegister extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        showHidePolicy: false,
        checkbox: false,
        isOpen: false,
        errors: []
        };

        this.hideComponent = this.hideComponent.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.submitRegister = this.submitRegister.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    handleChange = () => {
        this.setState({ checkbox: !this.state.checkbox });
    };

    hideComponent() {
        this.setState({ showHidePolicy: !this.state.showHidePolicy });
        this.setState({ isOpen: !this.state.isOpen});
    }

    onInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errors: this.state.errors.filter(e => {
                return e !== event.target.name;
            })
        });
    }

    validateForm() {
        let formErrors = [];
        if (!this.state.first_name) {
            formErrors.push("first_name");
        }
        if (!this.state.last_name) {
            formErrors.push("last_name");
        }
        if (!this.state.username) {
            formErrors.push("username");
        }
        if (!this.state.email) {
            formErrors.push("email");
        }
        if (!this.state.password) {
            formErrors.push("password");
        }
        this.setState({
            errors: formErrors
        });
    }

    handleClose() {
        this.props.setRegister(false);
    }

    submitRegister(e) {
        e.preventDefault();
        axios({
            method: 'POST',
            url: process.env.REACT_APP_API_URL + "/user/",
            data: {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                fare_type: this.state.fare_type,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }
        }, this.state).then((res) => {
            this.handleClose();
            this.props.setLogin(true);
        }).catch(() => {
            this.setState({
                errors: ['request']
            });
        })
    }

    render() {
    const {showHidePolicy}=this.state;
    let buttonText=this.state.isOpen ? "Close": "View Privacy Statement";
        return (
            <Dialog
                open={this.props.show}
                onClose={this.handleClose}
            >
                <DialogTitle>Register</DialogTitle>
                <form onSubmit={this.submitRegister}>
                    <DialogContent>
                        {this.state.errors.includes("request") &&
                        <Alert severity="error" style={{marginBottom: '16px'}}>Error registering - please check your
                            name, username, email and password!</Alert>}
                        <TextField
                            autoFocus
                            name="first_name"
                            label="First Name"
                            type="text"
                            style={{
                                marginBottom: '16px'
                            }}
                            variant="outlined"
                            fullWidth
                            required
                            error={this.state.errors.includes("first_name")}
                            onChange={this.onInputChange}
                        />
                        <TextField
                            name="last_name"
                            label="Surname"
                            type="text"
                            style={{
                                marginBottom: '16px'
                            }}
                            variant="outlined"
                            fullWidth
                            required
                            error={this.state.errors.includes("last_name")}
                            onChange={this.onInputChange}
                        />
                        <FormControl
                            variant="outlined"
                            style={{
                                marginBottom: '16px'
                            }}
                            fullWidth
                        >
                            <InputLabel>Fare Type *</InputLabel>
                            <Select
                                variant="outlined"
                                name="fare_type"
                                label="Fare Type"
                                required
                                onChange={this.onInputChange}
                            >
                                <MenuItem value="Adult">Adult</MenuItem>
                                <MenuItem value="Child (Under 19)">Child (Under 19)</MenuItem>
                                <MenuItem value="Child (Under 16)">Child (Under 16)</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            name="username"
                            label="Username"
                            type="text"
                            style={{
                                marginBottom: '16px'
                            }}
                            variant="outlined"
                            fullWidth
                            required
                            error={this.state.errors.includes("username")}
                            onChange={this.onInputChange}
                        />
                        <TextField
                            name="email"
                            label="Email Address"
                            type="email"
                            style={{
                                marginBottom: '16px'
                            }}
                            variant="outlined"
                            fullWidth
                            required
                            error={this.state.errors.includes("email")}
                            onChange={this.onInputChange}
                        />
                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            helperText="Password must be at least 8 characters in length"
                            style={{
                                marginBottom: '16px'
                            }}
                            variant="outlined"
                            fullWidth
                            required
                            error={this.state.errors.includes("password")}
                            InputProps={{inputProps: {min: 8}}}
                            onChange={this.onInputChange}
                        />
                        <input onChange={this.handleChange} type="checkbox" id="privacypolicy" name="privacypolicy"
                               value="privacypolicy"/>
                        <label htmlFor="privacypolicy"> Please tick to confirm you have read and accept our privacy
                            agreement.</label>
                        {showHidePolicy && <PrivacyPolicy/>}
                        <div style={{textAlign: 'center'}}>
                            <Button
                                variant="text"
                                color="primary"
                                id="privacyButton" onClick={() => this.hideComponent()}
                                value="Click to view our Privacy Statement">
                                {buttonText}
                            </Button>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                        <Button id='register' type="submit" onClick={this.validateForm} variant="contained" color="primary" disabled={!this.state.checkbox} enabled={this.state.checkbox}>
                            Register
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

        );
    }

}

export default UserRegister;