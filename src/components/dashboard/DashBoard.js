import React, { useContext, useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import './DashBoard.css'
import { AuthContext } from '../../auth/authContext';
import moment from 'moment';
import useFetch from '../../hooks/useFetch';

export const DashBoard = () => {

    const { user } = useContext(AuthContext);
    const { userFound } = user;

    console.log(user);

    const [expanded, setExpanded] = useState(false);
    const [films, setFilms] = useState([]); 

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

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
                console.log(err);
            }
            results.then((s) => setFilms(s));
        })();
    }, [userFound])

  return (
    <Container maxWidth="sm" className='container'>
      <Accordion>
        <AccordionSummary>
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Name: 
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{ userFound.name }</Typography>
        </AccordionSummary>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <Typography sx={{ width: '33%', flexShrink: 0 }}>User since:</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            { moment(userFound.created).format("YYYY/MM/DD") }
          </Typography>
        </AccordionSummary>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Movies
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Movie List
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
              {
                  films && films.map((film) => (
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary={film.film.title}>
                                {console.log(film.film.title)}
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                  ))
              }
              
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Personal data</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  )
}
