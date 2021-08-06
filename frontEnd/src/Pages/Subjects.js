import React, { useContext, useState, useEffect } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  makeStyles,
  Button,
} from "@material-ui/core";
import { getSubjects, deleteSub } from "../Server/api";
import { Link, useHistory } from "react-router-dom";
import OpenStudentsIcon from "@material-ui/icons/OpenInNew";
import Context from "../Store/Context";

const useStyle = makeStyles({
  table: {
    width: "100%",
    margin: "0",
    boxShadow: "3px 8px 16px 9px white",
  },
  thead: {
    "& > *": {
      background: "#000000",
      color: "#ffffff",
      fontSize: "18px",
    },
  },
  root: {
    width: "90%",
    margin: "50px 0 0 50px",
  },
  container: {
    maxHeight: "310px",
  },
});

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const { state } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    if (!state.isLogin) {
      history.push("/Login");
    }
    getAllSubjects();
  }, []);

  const getAllSubjects = async () => {
    const response = await getSubjects(state.email);
    // console.log(response.data);
    setSubjects(response.data);
  };

  const deleteId = async (id) => {
    await deleteSub(id);
    getAllSubjects();
  };

  const classes = useStyle();
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "60px", marginLeft: "83.5%" }}
        component={Link}
        to={`/AddSubject`}
      >
        Add Subject
      </Button>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table
            className={classes.table}
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow className={classes.thead}>
                <TableCell>Id</TableCell>
                <TableCell>Subject Code</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Students</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects.map(
                (
                  subject,
                  index // () will give default return
                ) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{subject.code}</TableCell>
                    <TableCell>{subject.name}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginRight: "10px" }}
                        component={Link}
                        to={`/subjects/${subject._id}/edit`}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => deleteId(subject._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginRight: "10px" }}
                        component={Link}
                        to={`/subjects/${subject._id}/students`}
                      >
                        <OpenStudentsIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default Subjects;
