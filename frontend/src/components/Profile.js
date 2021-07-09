import React from 'react';
import styles from './Map.module.css';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';

export function Profile({display}) {
    return (
        <div className={styles.profileContainer}>
            <Slide direction="up" in={display} mountOnEnter unmountOnExit>
                <Paper elevation={3} className={styles.profilePaper}>
                    <p>Profile</p>
                </Paper>
            </Slide>
        </div>
    )
}