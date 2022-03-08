import React, { useState, useEffect } from 'react';
import { Container, Paper, Button, CircularProgress } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Crawl from 'react-star-wars-crawl';
import 'react-star-wars-crawl/lib/index.css';
import DetailTable from './DetailTable';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
    color: 'white',
    backgroundColor: 'black',
    opacity:'0.7',
    fontSize: '0.8em',
    cursor: 'pointer',
    position: 'absolute'
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  director: {
    right: '20px',
    top: '10px',
    position: 'absolute'
  },
  button: {
    right: '20px',
    top: '80px',
    position: 'absolute'
  },
  table: {
    marginTop: '100px'
  }
}));

export const DetailScreen = ({film, setShowCards, showCards, userFound}) => {

  const classes = useStyles();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);

  const clicks = JSON.parse(localStorage.getItem('clicks'));
  console.log(clicks);

  clicks && clicks.map((click) => {
    if(click.name === userFound.name) {
      
    }
  })

  useEffect(() => {
    (async() => {
        setLoading(true);
        let results;
        try {
            const responses = await Promise.all(
                film.film.characters.map((character) => {
                    return fetch(character)
                })
            );
            const filteredResponses = responses.filter((res) => res.status === 200);
            results = Promise.all(
            // Get the project name from the URL and skills from the file
            filteredResponses.map(async(fr) => {
                const character = await fr.json();
                return {
                  character
                };
            })
            );     
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
        results.then((s) => setCharacters(s));
        setLoading(false); 
    })();
  }, [film]);

  return (
    <Container className='animate__animated animate__fadeIn'>
      <Paper className={classes.paper}>
        <h1>{film && film.film.title}</h1>
        <h2 className={classes.director}>{film.film.director}</h2>
        <Button 
          variant="contained" 
          className={classes.button}
          onClick={() => setShowCards(!showCards)}
        >
            Return
        </Button>
        <hr />
        <h3>Producers: {film.film.producer}</h3>
        {!loading ? <DetailTable className={classes.table} characters={characters} /> : <CircularProgress />}
        <div>
          <Crawl 
            title={film.film.title}
            text={film.film.opening_crawl}
          />
        </div>
      </Paper>
    </Container>
  )
}
