import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Container,
  makeStyles,
  Typography,
  Grid,
  TextField,
  CssBaseline,
  Button,
  Avatar,
} from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import { getUser, validateToken } from "../Server/api";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;

  const history = useHistory();

  const varify = async () => {
    try {
      await validateToken();
      history.push("/");
    } catch (error) {}
  };
  useEffect(() => {
    varify();
  }, []);

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submitHandler = async () => {
    if (!email || !password) {
      toast.error("All feilds are mendotory");
    } else {
      let response = await getUser(user);
      if (response.status === 203) {
        toast.error(response.data.msg);
      }
      if (response.status === 201) {
        toast.success(response.data.msg);
        await localStorage.setItem("user-info", response.data.token);
        setTimeout(() => {
          history.push("/");
        }, 2000);
      }
    }
  };
  const classes = useStyles();

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <ToastContainer />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={email}
                  autoComplete="email"
                  onChange={(e) => inputHandler(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  value={password}
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => inputHandler(e)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={submitHandler}
            >
              Log in
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forget-password">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link to="/Signup">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <ToastContainer />
      </Container>
    </>
  );
}
