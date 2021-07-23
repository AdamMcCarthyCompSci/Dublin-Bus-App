import React from 'react';
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from "@material-ui/lab/Alert";
import { PrivacyPolicy } from "./PrivacyPolicy.js";
import Container from '@material-ui/core/Container';



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
// Handlechange detects if the checkbox is ticked and turns the register button and off
      handleChange = (event) => {
    this.setState({ checkbox: !this.state.checkbox });

  };
// Hides the Privacy until the user clicks the privacy policy button
    hideComponent(name) {
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
            url: "http://localhost:8000/user/",
            data: {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
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
    let buttonText=this.state.isOpen ? "Close": "Privacy Statement";
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
                            margin="dense"
                            name="first_name"
                            label="First Name"
                            type="text"
                            fullWidth
                            required
                            error={this.state.errors.includes("first_name")}
                            onChange={this.onInputChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="last_name"
                            label="Surname"
                            type="text"
                            fullWidth
                            required
                            error={this.state.errors.includes("last_name")}
                            onChange={this.onInputChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="username"
                            label="Username"
                            type="text"
                            fullWidth
                            required
                            error={this.state.errors.includes("username")}
                            onChange={this.onInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            required
                            error={this.state.errors.includes("email")}
                            onChange={this.onInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="password"
                            label="Password"
                            type="password"
                            helperText="Password must be at least 8 characters in length"
                            fullWidth
                            required
                            error={this.state.errors.includes("password")}
                            InputProps={{inputProps: {min: 8}}}
                            onChange={this.onInputChange}
                        />
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
                {/*Privacy Policy*/}
                <Container>
                {showHidePolicy && <PrivacyPolicy/>}
                 <Button
                        variant="text"
                        color="primary"
                        id="privacyButton" onClick={() => this.hideComponent()}  value="Click to view our Privacy Statement" >
                    {buttonText}
                    </Button>
                <br></br>
                <br></br>
                <input onChange={this.handleChange} type="checkbox" id="privacypolicy" name="privacypolicy" value="privacypolicy"></input>
                <label htmlFor="privacypolicy"> Please tick to confirm you have read and accept our privacy agreement.</label>
                <p></p>
                </Container>


            </Dialog>

        );
    }

}

export default UserRegister;