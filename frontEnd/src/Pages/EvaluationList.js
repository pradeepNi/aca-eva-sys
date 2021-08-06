import React from "react";
import { useEffect, useState } from "react";
import { getSubject } from "../Server/api";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import "./Attendence.css";
import { useHistory } from "react-router";
import Evaluation from "./Evaluation";

const EvaluationList = () => {
  const [students, setStudents] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    getAllStudents();
  }, []);

  const getAllStudents = async () => {
    const response = await getSubject(id);
    setStudents(response.data.students.sort((a, b) => a.roll_no - b.roll_no));
  };
  // const myfun = async (student) => {
  //     await takeAttend(student._id, student);
  //     //  (res);
  //      (student._id);
  //      (student);
  // }

  return (
    <>
      <div className="paper" style={{ marginTop: "2%" }}>
        <div className="container" style={{ maxHeight: "450px" }}>
          <table className="table">
            <thead>
              <tr className="table-row">
                <th>Sr No.</th>
                <th>Roll No.</th>
                <th>Name</th>
                <th>Present</th>
                <th>Total</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="table-row">
                  <td>{index + 1}</td>
                  <td>{student.roll_no}</td>
                  <td>{student.full_name}</td>
                  <td>{student.attendence_till}</td>
                  <td>{student.attendence_total}</td>
                  <td
                    style={
                      Math.trunc(
                        (student.attendence_till / student.attendence_total) *
                          100
                      ) < 75
                        ? { color: "red" }
                        : { color: "black" }
                    }
                  >
                    {Math.trunc(
                      (student.attendence_till / student.attendence_total) * 100
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <button onClick={(e) => SubmitHandler(e)}>SUBMIT</button> */}
    </>
  );
};

export default EvaluationList;
