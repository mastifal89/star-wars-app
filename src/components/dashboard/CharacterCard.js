import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import { useFetchGifs } from '../../hooks/useFetchGifs';
import './CharacterCard.css'

export const CharacterCard = ({character}) => {

    const { loading, images } = useFetchGifs(character.name);

    return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        {!loading ? <CardMedia
          component="img"
          height="140"
          image={images[1].url}
          alt={character.name}
        /> : <CircularProgress className='progress' />}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {character.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
              User since: {moment(character.created).format("YYYY/MM/DD")}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
