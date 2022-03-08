import React, { useContext, useState, useEffect } from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import { makeStyles } from '@material-ui/core/styles'
import { LinearProgress } from '@material-ui/core';
import './DashBoard.css'
import { AuthContext } from '../../auth/authContext';
import { CharacterCard } from './CharacterCard';
import { CharacterMoviesCard } from './CharacterMoviesCard';
import Button from '@mui/material/Button';
import { types } from '../../types/types';
import { useNavigate } from 'react-router-dom'
import { DetailScreen } from '../details/DetailScreen';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '90%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    button: {
        position: 'absolute',
        top: '100px',
        right: '160px',
        backgroundColor: '#00FFFF'
    }
}));

export const DashBoard = () => {

    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const { userFound } = user;

    const [films, setFilms] = useState([]);
    const [filmDetail, setFilmDetail] = useState();
    const [showCards, setShowCards] = useState(true);
    const [loading, setStatus] = useState({loading: true});
    const classes = useStyles();  

    useEffect(() => {
        (async() => {
            let results;
            try {
                const responses = await Promise.all(
                    userFound.films.map((film) => {
                        return fetch(film)
                    })
                );
                const filteredResponses = responses.filter((res) => res.status === 200);
                results = Promise.all(
                // Get the project name from the URL and skills from the file
                filteredResponses.map(async(fr) => {
                    const film = await fr.json();
                    return {
                        film
                    };
                })
                );       
            } catch (err) {
                setStatus(false);
                console.log(err);
            }
            results.then((s) => setFilms(s));
            setStatus(false);
        })();
    }, [userFound]);

    const handleMovieClick = (film) => {
        const today = new Date(Date.UTC(2022, 3, new Date().getDate()))
        const options = { weekday: 'long' };
        const date = today.toLocaleDateString(undefined, options);
        const name = userFound.name;
        const movieNameArray = JSON.parse(localStorage.getItem('clicks')) || [];
        const movieName = {
            movie: film.film.title,
            name: name,
            date
        };
        
        movieNameArray.push(movieName);
        localStorage.setItem('clicks', JSON.stringify(movieNameArray));
        
        setFilmDetail(film);
        setShowCards(!showCards);
    }

    function getDayName(dateStr, locale)
        {
            var date = new Date(dateStr);
            return date.toLocaleDateString(locale, { weekday: 'long' });        
        }

    function showMovies() {
        return films.map((film) => {
          return (
            <CharacterMoviesCard 
                key={film.film.title} 
                title={film.film.title} 
                director={film.film.director} 
                opening_crawl={film.film.opening_crawl} 
                handleMovieClick={() => handleMovieClick(film)}
            />
          )
        })
    }

    function mapTimeline() {
        const movieMap = showMovies();
          return movieMap.map((content) => {
            return <TimelineItem key={content.key} >
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>{content}</TimelineContent>
                </TimelineItem>
          })
      };

    const handleSignOut = () => {
        dispatch({ type: types.resetTries })
        dispatch({ type: types.logout });

        navigate('/login', {
            replace: true
        });
    };

  return (
    <div>
        {
            showCards ?
            <div className='movies-container animate__animated animate__fadeIn'>
                <CharacterCard className='card' character={userFound} />
                <Button onClick={handleSignOut} variant="contained" className={classes.button}>Sign Out</Button>
                <div className="timeline-container">
                    {loading ? (
                        <div className={classes.root}>
                        <LinearProgress />
                        <LinearProgress />
                        </div>
                    ) : (
                        <Timeline align="alternate">{mapTimeline()}</Timeline>
                    )}
                </div>
            </div>
            :
            <DetailScreen film={filmDetail} setShowCards={setShowCards} showCards={showCards} userFound={userFound} />            
        }
    </div>
  )
}
