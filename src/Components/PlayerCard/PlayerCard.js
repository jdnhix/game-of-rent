import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

import PlayerIcon from '../PlayerIcon/PlayerIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  paper: {
    border: '3px solid lightRed',
    height: '20vh',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignContent: 'space-evenly',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  infoButton: {
    padding: theme.spacing(0.25),
    border: `2px solid ${theme.palette.text.secondary}`,
    color: theme.palette.text.secondary,
  },
}));

function PlayerCard() {
  const classes = useStyles();
  return (
    <Grid item className={classes.root}>
      <Paper className={classes.paper}>
        <Typography>John Doe</Typography>
        <PlayerIcon num="0" className="PlayerCard-Avatar" alt="player avatar" />
        <Button className={classes.infoButton} variant="outlined">
          INFO
        </Button>
      </Paper>
    </Grid>
  );
}

export default PlayerCard;
