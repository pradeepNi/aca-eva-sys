import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { ToastContainer, toast } from "react-toastify";
import { addUser, validateToken } from "../Server/api";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
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

export default function SignUp() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = user;

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
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const submitHandler = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.error("All feilds are mendatory");
    } else {
      if (!validateEmail(email)) {
        toast.error("Invalid email");
      } else if (password !== confirmPassword) {
        toast.error("password is not matching");
      } else if (password.length < 6) {
        toast.error("Password is too short");
      } else {
        let response = await addUser(user);

        console.log(response);
        if (response.status === 200) {
          toast.success("Added successfully", {
            autoClose: 2000,
          });
          setTimeout(() => {
            history.push("/login");
          }, 2000);
        }
        if (response.status === 202) {
          toast.error(response.data.msg);
        }
      }
    }
  };
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer />
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
                name="name"
                value={name}
                variant="outlined"
                required
                fullWidth
                label="Name"
                autoFocus
                onChange={(e) => inputHandler(e)}
              />
            </Grid>
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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                value={confirmPassword}
                label="Confirm Password"
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
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
