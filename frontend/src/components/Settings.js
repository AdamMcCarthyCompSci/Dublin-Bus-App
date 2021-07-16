import React from 'react';
import styles from './Map.module.css';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export function Settings({display, settings, setSettings}) {

    const handleChange = (event) => {
        setSettings({ ...settings, [event.target.name]: event.target.checked });
        console.log(settings.showStops)
    };

    return (
        <div className={styles.settingsContainer}>
            <Slide direction="up" in={display} mountOnEnter unmountOnExit>
                <Paper elevation={3} className={styles.settingsPaper}>
                    <h1>Settings</h1>

                    <FormControlLabel
                        control={
                        <Switch
                            checked={settings.showStops}
                            onChange={handleChange}
                            name="showStops"
                            color="primary"
                        />
                        }
                        label="Primary"
                    />

                </Paper>
            </Slide>
        </div>
    )
}