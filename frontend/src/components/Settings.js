import React from 'react';
import styles from './Map.module.css';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';

export function Settings({display}) {
    return (
        <div className={styles.settingsContainer}>
            <Slide direction="up" in={display} mountOnEnter unmountOnExit>
                <Paper elevation={3} className={styles.settingsPaper}>
                    <p>Settings</p>
                </Paper>
            </Slide>
        </div>
    )
}