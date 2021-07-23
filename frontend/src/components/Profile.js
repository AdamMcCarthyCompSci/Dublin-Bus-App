import React, {useEffect} from 'react';
import styles from './Map.module.css';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import {authFetch, logout} from "../auth";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: null,
            old_password: '',
            new_password: '',
            confirm_password: '',
            show_profile_alert: false,
            show_password_alert: false
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputChangeProfile = this.onInputChangeProfile.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount() {
        authFetch(
            process.env.REACT_APP_API_URL + '/user/'
        ).then(data => {
            data.json().then(result => {
                this.setState({
                    profile: result
                });
            });
        });
    }

    onInputChangeProfile(event) {
        const newProfile = this.state.profile;
        newProfile[event.target.name] = event.target.value;

        this.setState({
            profile: newProfile
        });
    }

    onInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    updateProfile(e) {
        e.preventDefault();
        authFetch(
            process.env.REACT_APP_API_URL + "/user/",
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.profile)
            }
        ).then(() => {
            this.setState({
                show_profile_alert: true
            });
            setTimeout(() => {
                this.setState({
                    show_profile_alert: false
                });
            }, 5000);
        }).catch(() => {
            this.setState({
                errors: ['request']
            });
        });
    }

    changePassword(e) {
        e.preventDefault();
        authFetch(
            process.env.REACT_APP_API_URL + "/user/password",
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    old_password: this.state.old_password,
                    new_password: this.state.new_password,
                    confirm_password: this.state.confirm_password,
                })
            }
        ).then(() => {
            this.setState(
                {
                    old_password: '',
                    new_password: '',
                    confirm_password: ''
                }
            );
            this.setState({
                show_password_alert: true
            });
            setTimeout(() => {
                this.setState({
                    show_password_alert: false
                });
            }, 5000);
        }).catch(() => {
            this.setState({
                errors: ['request']
            });
        });
    }

    deleteUser(e) {
        e.preventDefault();
        authFetch(
            process.env.REACT_APP_API_URL + "/user/",
            {
                method: "DELETE"
            }
        ).then(() => {
            logout();
            this.props.setMenu("Home");
        });
    }


    render() {
        if (this.state.profile === null) {
            return 'Loading...';
        }
        return (
            <div className={styles.profileContainer}>
                <Slide direction="up" in={this.props.display} mountOnEnter unmountOnExit>
                    <Paper elevation={3} className={styles.profilePaper}
                           style={{
                               overflowY: 'scroll',
                               backgroundColor: this.props.darkBackground,
                               color: this.props.darkText
                           }}>
                        <div style={{
                            maxWidth: '600px',
                            margin: 'auto',
                            paddingBottom: '24px'
                        }}>
                            <h1>Profile</h1>
                            {this.state.show_profile_alert &&
                            <Alert severity="success" style={{
                                marginBottom: '16px'
                            }}>You have successfully updated your profile!</Alert>}
                            <TextField
                                label="First Name"
                                name="firstname"
                                value={this.state.profile.firstname || ''}
                                type="text"
                                style={{
                                    marginBottom: '16px',
                                    backgroundColor: this.props.darkForeground,
                                }}
                                variant="outlined"
                                inputProps={{style: {color: this.props.darkText}}}
                                onChange={this.onInputChangeProfile}
                                fullWidth
                            />
                            <TextField
                                label="Last Name"
                                name="lastname"
                                value={this.state.profile.lastname || ''}
                                type="text"
                                style={{
                                    marginBottom: '16px',
                                    backgroundColor: this.props.darkForeground
                                }}
                                variant="outlined"
                                inputProps={{style: {color: this.props.darkText}}}
                                onChange={this.onInputChangeProfile}
                                fullWidth
                            />
                            <TextField
                                label="Username"
                                value={this.state.profile.username || ''}
                                InputProps={{
                                    readOnly: true,
                                }}
                                style={{
                                    marginBottom: '16px',
                                    backgroundColor: this.props.darkForeground
                                }}
                                variant="outlined"
                                inputProps={{style: {color: this.props.darkText}}}
                                fullWidth
                            />
                            <TextField
                                label="Email"
                                name="email"
                                value={this.state.profile.email || ''}
                                type="text"
                                style={{
                                    marginBottom: '16px',
                                    backgroundColor: this.props.darkForeground
                                }}
                                variant="outlined"
                                inputProps={{style: {color: this.props.darkText}}}
                                onChange={this.onInputChangeProfile}
                                fullWidth
                            />
                            <FormControl
                                variant="outlined"
                                style={{
                                    marginBottom: '16px'
                                }}
                                fullWidth
                            >
                                <InputLabel>Fare Type</InputLabel>
                                <Select
                                    label="Fare Type"
                                    name="fare_type"
                                    value={this.state.profile.fare_type || ''}
                                    variant="outlined"
                                    style={{
                                        marginBottom: '16px',
                                        backgroundColor: this.props.darkForeground
                                    }}
                                    required
                                    onChange={this.onInputChangeProfile}
                                >
                                    <MenuItem value="Adult">Adult</MenuItem>
                                    <MenuItem value="Child (Under 19)">Child (Under 19)</MenuItem>
                                    <MenuItem value="Child (Under 16)">Child (Under 16)</MenuItem>
                                </Select>
                            </FormControl>
                            <Button id="btnUpdateInfo" variant="contained" color="primary"
                                    onClick={this.updateProfile}>Update
                                Information</Button>
                            <h1 style={{
                                marginTop: '48px'
                            }}>Change password</h1>
                            {this.state.show_password_alert &&
                            <Alert severity="success" style={{
                                marginBottom: '16px'
                            }}>You have successfully updated your password!</Alert>}
                            <TextField
                                label="Current password"
                                name="old_password"
                                type="password"
                                variant="outlined"
                                inputProps={{style: {color: this.props.darkText}}}
                                style={{
                                    marginBottom: '16px',
                                    backgroundColor: this.props.darkForeground
                                }}
                                value={this.state.old_password}
                                onChange={this.onInputChange}
                                fullWidth
                            />
                            <TextField
                                label="New password"
                                name="new_password"
                                type="password"
                                variant="outlined"
                                style={{
                                    marginBottom: '16px',
                                    backgroundColor: this.props.darkForeground
                                }}
                                value={this.state.new_password}
                                inputProps={{style: {color: this.props.darkText}}}
                                onChange={this.onInputChange}
                                fullWidth
                            />
                            <TextField
                                label="Confirm new password"
                                name="confirm_password"
                                type="password"
                                variant="outlined"
                                style={{
                                    marginBottom: '16px',
                                    backgroundColor: this.props.darkForeground
                                }}
                                value={this.state.confirm_password}
                                inputProps={{style: {color: this.props.darkText}}}
                                onChange={this.onInputChange}
                                fullWidth
                            />
                            <Button id="btnChangePassword" variant="contained" color="primary"
                                    onClick={this.changePassword}>Change Password</Button>
                            <h1 style={{
                                marginTop: '48px'
                            }}>Delete account</h1>
                            <div><Button id="btnDeleteAccount" variant="contained" color="secondary"
                                         onClick={this.deleteUser}>Delete My Account</Button>
                            </div>
                        </div>
                    </Paper>
                </Slide>
            </div>
        )
    }
}

export default Profile;