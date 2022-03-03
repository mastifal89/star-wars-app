import React, { useContext, useEffect, useReducer } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import ParticlesBg from 'particles-bg'
import './Login.css'
import useFetch from '../../hooks/useFetch';
import { CheckLogin } from '../../helpers/CheckLogin';
import { encrypt } from '../../helpers/EncryptPassword';
import { types } from '../../types/types';
import { AuthContext } from '../../auth/authContext';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export const Login = () => {

    const navigate = useNavigate();

    const { dispatch } = useContext(AuthContext);

    const { data, loading, error } = useFetch('https://swapi.dev/api/people')

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = formData.get('user');
        const password = formData.get('password');
        const userFound = CheckLogin(user, password, data.results);
        if(userFound) {
            encrypt(formData.get('password'));
            const action = {
                type: types.login,
                payload: {
                    userFound,
                    password
                }
            }
            dispatch(action);
            navigate('/dash', {
                replace: true
            })
        }
    };

  return (
    <>
     <ThemeProvider theme={theme}>
        <Container className='container animate__animated animate__fadeInDown' component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="user"
                label="Star Wars Character"
                name="user"
                autoComplete=""
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
            />
            {loading 
                ? <LoadingButton 
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >Loading...</LoadingButton>
                : <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign In
            </Button>}
            <Grid container className='grid-forgot'>

            </Grid>
            </Box>
        </Box>
        </Container>
    </ThemeProvider>
    <ParticlesBg type="fountain" bg={true} />
    </>
  )
}
