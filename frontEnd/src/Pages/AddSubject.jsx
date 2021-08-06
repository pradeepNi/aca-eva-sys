import React, { useState, useContext, useEffect } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { addSubject } from "../Server/api";
import { useHistory } from "react-router";
import Context from "../Store/Context";

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

const AddSub = () => {
  const { state } = useContext(Context);
  const [subject, setSubject] = useState({
    code: "",
    name: "",
    email: state.email,
  });
  const { code, name } = subject;
  const history = useHistory();
  useEffect(() => {
    if (!state.isLogin) {
      history.push("/Login");
    }
  }, []);

  const changeValue = (e) => {
    setSubject({ ...subject, [e.target.name]: e.target.value });
  };

  const addSubjectDB = async () => {
    // console.log(val);
    if (!name || !code) {
      window.alert("All fields are medotorary");
    } else {
      const response = await addSubject(subject);
      const data = response.data;
      if (data.code === code) {
        window.alert("alredy exist");
      } else {
        history.push("./subjects");
      }
    }
  };
  const classes = useStyle();
  return (
    <>
      <FormGroup className={classes.container}>
        <Typography variant="h5">Add Subject</Typography>
        <FormControl>
          <InputLabel required="true">Code</InputLabel>
          <Input onChange={(e) => changeValue(e)} name="code" value={code} />
        </FormControl>
        <FormControl>
          <InputLabel required="true">Subject</InputLabel>
          <Input onChange={(e) => changeValue(e)} name="name" value={name} />
        </FormControl>

        <Button
          onClick={addSubjectDB}
          variant="contained"
          color="primary"
          disableElevation
        >
          Add Subject
        </Button>
      </FormGroup>
    </>
  );
};

export default AddSub;
