import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import {
    // FormControlLabel, Checkbox, Box,
    Avatar, Button, CssBaseline, TextField, Grid,
    Typography, makeStyles, Container
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { addUser } from '../Server/api';
import { Link } from 'react-router-dom';
import {val} from "./Login"

// function Copyright() {
//     return (
//         <Typography variant="body2" color="textSecondary" align="center">
//             {'Copyright © '}
//             <Link color="inherit" href="https://material-ui.com/">
//                 Your Website
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const [user, setUser] = useState({ name: '', email: '', password: '' });
    let { name, email, password } = user;
    const history = useHistory();
    const OnChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    useEffect(() => {
        const val = localStorage.getItem('email');
        if(val){
            history.push("/")
        }
    }, [])
    const Submit = async () => {
        if (!name || !email || !password) {
            window.alert("All Fields are mendatory")
        } else {
            const response = await addUser(user);
            const data = response.data;
            if (data.email === email) {
                window.alert("Email is aleady taken");
            } else {
                history.push('/Login');
            }
        }
    }
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                name="name" value={name}
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Name"
                                autoFocus
                                onChange={(e) => OnChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email" value={email}
                                autoComplete="email"
                                onChange={(e) => OnChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password" value={password}
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => OnChange(e)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={Submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/Login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            {/* <Box mt={5}>
                <Copyright />
            </Box> */}
        </Container>
    );
}