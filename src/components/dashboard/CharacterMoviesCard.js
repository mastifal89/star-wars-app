import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
    color: 'white',
    backgroundColor: 'black',
    opacity:'0.7',
    fontSize: '0.6em',
    cursor: 'pointer'
  },
  
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export function CharacterMoviesCard(props){

    const classes = useStyles();    
    const { title, director, opening_crawl, handleMovieClick } = props;

return (
  <Paper elevation={3} className={classes.paper} onClick={(props) => handleMovieClick(props)}>
    <h1>{title}</h1>
    <h2>{director}</h2>
    <h3>{opening_crawl}</h3>
  </Paper>
);

}