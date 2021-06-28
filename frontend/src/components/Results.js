import React, { useEffect } from 'react';
import styles from './Map.module.css';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Grid from "@material-ui/core/Grid";
import axios from 'axios';

export function Results() {
    const [results, setResults] = React.useState([
    ])

    useEffect(async () => {
        const result = await axios(
            'http://localhost:8000/bus/',
        )
        setResults(result.data)
    })

    return (
            <div className={styles.resultsContainer}>
            {results.map((result => (
                <Button className={styles.ResultsButton} style={{textTransform: 'none', marginBottom: '1%'}} fullWidth="true" variant="contained" color="primary" onClick={() => { alert('clicked') }}>
                    <Grid container spacing={0}>
                        <Grid item xs={2}>
                        </Grid>
                        <Grid item xs={8} style={{textAlign: 'left'}}>
                            {result.title}
                            <br />
                            {result.directions}
                            <br />
                            {result.prediction}
                        </Grid>
                        <Grid item xs={2}>
                            <br />
                            <ArrowForwardIosIcon />
                        </Grid>
                    </Grid>
                    </Button>
            )))}
            </div>
    )
}