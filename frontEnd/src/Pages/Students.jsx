import React from "react";
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
import { useEffect, useState } from "react";
import { getSubject, deleteStudent, addStudents } from "../Server/api";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { Spinner } from "react-bootstrap";
import * as XLSX from "xlsx";
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
      fontSize: "15px",
    },
  },
  tROW: {
    "& > *": {
      fontSize: "12px",
      height: "20px",
    },
  },
  root: {
    width: "80%",
    margin: "2% auto 2%",
  },
  container: {
    width: "100%",
    maxHeight: "400px",
  },
  action: {
    width: "200px",
  },
});

const Students = () => {
  const [students, setStudents] = useState([]);
  const [stusExcel, setStusExcel] = useState([]);
  const [showloading, setShowloading] = useState(false);
  const history = useHistory();
  let { id } = useParams();
  useEffect(() => {
    getAllStudents();
  }, []);

  const getAllStudents = async () => {
    const response = await getSubject(id);
    setStudents(response.data.students.sort((a, b) => a.roll_no - b.roll_no));
    //  (response.data.students);
  };

  const deleteId = async (_id) => {
    await deleteStudent(id, _id);
    getAllStudents();
  };

  /*   READ EXCEL FILES */
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const arrayBuffer = e.target.result;

        const workBook = XLSX.read(arrayBuffer, { type: "buffer" });

        const workSheetName = workBook.SheetNames[0];

        const workSheet = workBook.Sheets[workSheetName];

        const data = XLSX.utils.sheet_to_json(workSheet);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setStusExcel(d);
    });
  };

  const addStsHandler = async () => {
    if (stusExcel.length) {
      setShowloading(true);
      await addStudents(id, stusExcel);
      setShowloading(false);
      history.push("/subjects");
    } else {
      window.alert("choose valid file");
    }
  };

  const classes = useStyle();
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "1% 5%",
          flex: ".8",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <input
            type="file"
            accept=".xlsx"
            onChange={(e) => {
              const file = e.target.files[0];
              readExcel(file);
            }}
          />

          <Button variant="contained" color="primary" onClick={addStsHandler}>
            {showloading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <span className="visually-hidden">SUBMIT</span>
            )}
          </Button>
        </div>
        <div style={{ display: "flex" }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`../${id}/AddStudent`}
          >
            Add Student
          </Button>
        </div>
      </div>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table
            className={classes.table}
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow className={classes.thead}>
                <TableCell style={{ padding: "1.3%" }}>Sr No</TableCell>
                <TableCell style={{ padding: "1.3%" }}>Roll No</TableCell>
                <TableCell style={{ padding: "1.3%" }}>Name</TableCell>
                <TableCell
                  className={classes.action}
                  style={{ padding: "1.3%" }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map(
                (
                  student,
                  index // () will give default return
                ) => (
                  <TableRow key={index} className={classes.tROW}>
                    <TableCell style={{ padding: "1.3%" }}>
                      {index + 1}
                    </TableCell>
                    <TableCell style={{ padding: "1.3%" }}>
                      {student.roll_no}
                    </TableCell>
                    <TableCell style={{ padding: "1.3%" }}>
                      {student.full_name}
                    </TableCell>
                    <TableCell
                      className={classes.action}
                      style={{ padding: "1.3%" }}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        style={{ marginRight: "10px" }}
                        component={Link}
                        to={`/${id}/${student._id}/edit`}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={() => deleteId(student._id)}
                      >
                        Delete
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

export default Students;
