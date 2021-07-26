import React, { useState,  } from 'react';
import { useHistory } from 'react-router';
import {
    // Box,
    Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Typography, Container,
    makeStyles
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { getUser } from '../Server/api';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }
const Goku =styled(Link)`
`;

export const bool  = false;
export const val = localStorage.getItem("email");

export function Logout() {
    const history = useHistory();

    const logoutHandler = () => {
        localStorage.removeItem("email");
        history.push('/')
    }
    return (
        <>
            <button onClick={logoutHandler}>Log out</button>
        </>
    );
}
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {

    const [info, setInfo] = useState({ email: '', password: '' });
    let { email, password } = info;
    const history = useHistory();
    const OnChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }
    
    
    const Submit = async () => {
        if (!email || !password) {
            window.alert("All feilds are mendatory");
        } else {
            const res = await getUser({
                email: info.email,
                password: info.password,
            });
            const data = res.data;
            if (data.email === email) {
                localStorage.setItem("email", email);
                history.push("/Signup");
            } else {
                window.alert("Invalid email or password");
            }
        }
    }
    const classes = useStyles();
    if (val) {
        return (
            <Logout />
        );
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email" value={email}
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => { OnChange(e) }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password" value={password}
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => { OnChange(e) }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        onClick={Submit}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Goku to="#">
                                Forgot password?
                            </Goku>
                        </Grid>
                        <Grid item>
                            <Goku to="/Signup">
                                {"Don't have an account? Sign Up"}
                            </Goku>
                        </Grid>
                    </Grid>
                </form>
            </div>
            {/* <Box mt={8}>
        <Copyright />
      </Box> */}
        </Container>
    );
}
