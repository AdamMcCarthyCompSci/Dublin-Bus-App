import React from 'react';
import styles from './Map.module.css';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export function Settings({display, settings, setSettings, darkBackground, darkForeground, darkText}) {

    const handleChange = (event) => {
        setSettings({ ...settings, [event.target.name]: event.target.checked });
    };

    return (
        <div className={styles.settingsContainer}>
            <Slide direction="up" in={display} mountOnEnter unmountOnExit>
                <Paper elevation={3} className={styles.settingsPaper} style={{backgroundColor: darkBackground}}>
                    <h1 style={{color: darkText}}>Settings</h1>

                    <FormControlLabel
                        control={
                        <Switch
                            checked={settings.showStops}
                            onChange={handleChange}
                            name="showStops"
                            color="primary"
                        />
                        }
                        label="Display Stops"
                        style={{color: darkText}}
                    />
                    <FormControlLabel
                        control={
                        <Switch
                            checked={settings.darkMode}
                            onChange={handleChange}
                            name="darkMode"
                            color="primary"
                        />
                        }
                        label="Toggle Dark Mode"
                        style={{color: darkText}}
                    />

                </Paper>
            </Slide>
        </div>
    )
}