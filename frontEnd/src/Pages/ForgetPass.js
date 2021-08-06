import React, { useState } from "react";
import { useHistory } from "react-router";
import {
  FormGroup,
  Typography,
  Button,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const useStyle = makeStyles({
  container: {
    width: "50%",
    margin: "5% 0 0 25%",
    "& > *": {
      marginTop: "20px",
    },
  },
  button: {
    width: "110px",
  },
});

const ForgetPass = () => {
  const [reNewPassToggle, setReNewPassToggle] = useState(false);
  const [otpToggle, setOtpToggle] = useState(false);
  const [info, setInfo] = useState({
    email: "",
    otp: "",
    password: "",
    cpassword: "",
  });

  let { email, otp, password, cpassword } = info;
  const history = useHistory();

  const changeValue = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const emailSubmit = async () => {
    if (email) {
      try {
        const response = await axios.put(
          `https://aca-eva-sys-backend.herokuapp.com/api/send-email?email=${email}`
        );
        console.log(response);
        if (response.status === 200) {
          toast.info(response.data.msg);
          setOtpToggle(true);
        }
        if (response.status === 203) {
          toast.error(response.data.msg, {
            autoClose: 3000,
          });
        }
      } catch (error) {
        toast.error("Somthing went wrong");
      }
    } else {
      toast.error("Mendotary field");
    }
  };

  const otpSubmit = async () => {
    if (otp) {
      try {
        const response = await axios.get(
          `https://aca-eva-sys-backend.herokuapp.com/api/check-otp?email=${email}&otp=${otp}`
        );
        if (response.status === 200) {
          setReNewPassToggle(!reNewPassToggle);
        } else {
          toast.error("Invalid otp");
        }
      } catch (error) {
        toast.error("Somthing went wrong");
      }
    } else {
      toast.error("Mendotary field");
    }
  };

  const confirmHandler = async () => {
    if (!password && !cpassword) {
      toast.error("Mendotary fields");
    } else {
      if (password === cpassword && password.length >= 6) {
        try {
          const response = await axios.put(
            `https://aca-eva-sys-backend.herokuapp.com/api/reset-password`,
            {
              email: email,
              otp: otp,
              password: password,
            }
          );
          if (response.status === 200) {
            toast.success("password changed successfully", {
              autoClose: 2000,
            });
            setTimeout(() => {
              history.push("/login");
            }, 1500);
          }
          if (response.status === 203) {
            toast.error(response.data.msg);
          }
        } catch (error) {
          toast.error("Somthing went wrong");
        }
      } else {
        if (password.length < 6) {
          toast.error(`password is too short
          Atleast 6 characters are required`);
        } else {
          toast.error("password is not matching");
        }
      }
    }
  };
  const classes = useStyle();
  return (
    <FormGroup className={classes.container}>
      {!reNewPassToggle && (
        <>
          <Typography variant="h5">Enter email</Typography>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Email Address"
            name="email"
            value={email}
            autoComplete="email"
            onChange={(e) => changeValue(e)}
          />
          <div>
            <Button
              onClick={() => emailSubmit()}
              className={classes.button}
              variant="contained"
              color="primary"
              disableElevation
            >
              Send otp
            </Button>
            <Button
              onClick={() => history.push("/login")}
              className={classes.button}
              variant="contained"
              color="secondary"
              style={{ marginLeft: "5px", color: "secondary" }}
            >
              Back
            </Button>
          </div>
          {otpToggle && (
            <>
              <TextField
                style={{ width: "50%" }}
                label="OTP"
                name="otp"
                value={otp}
                autoComplete="current-password"
                variant="outlined"
                onChange={(e) => changeValue(e)}
              />
              <Button
                onClick={() => otpSubmit()}
                className={classes.button}
                variant="contained"
                color="primary"
                disableElevation
              >
                Enter
              </Button>
            </>
          )}
        </>
      )}
      {reNewPassToggle && (
        <>
          <Typography variant="h4">Change Password</Typography>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            value={password}
            label="New Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => changeValue(e)}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            name="cpassword"
            value={cpassword}
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => changeValue(e)}
          />
          <Button
            onClick={() => confirmHandler()}
            className={classes.button}
            variant="contained"
            color="primary"
            disableElevation
          >
            Confirm
          </Button>
        </>
      )}
      <ToastContainer />
    </FormGroup>
  );
};

export default ForgetPass;
