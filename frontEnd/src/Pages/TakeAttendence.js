import React from "react";
import { useEffect, useState } from "react";
import { getSubject, takeAttend } from "../Server/api";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import "./Attendence.css";
import { useHistory } from "react-router";
import { Spinner } from "react-bootstrap";

const Attend = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  width: 13%;
  margin-left: 15px;
  background: #c6ccc7;
  box-shadow: 2px 6px 10px 4px white;
  &:hover {
    background: #364547;
    cursor: pointer;
  }
`;
const myfun = () => {
  let len = 200;
  let temp = [
    {
      present: false,
      absent: false,
    },
  ];
  for (let i = 0; i < len; i++) {
    temp.push({
      present: false,
      absent: false,
    });
  }
  return temp;
};
const Attendence = () => {
  const [students, setStudents] = useState([]);
  const [tglForPA, setTglForPA] = useState(myfun());
  const [toggleSubmit, setToggleSubmit] = useState(false);
  let { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    getAllStudents();
  }, []);

  const getAllStudents = async () => {
    const response = await getSubject(id);
    setStudents(response.data.students.sort((a, b) => a.roll_no - b.roll_no));
  };

  const clickHandler = async (e, index, check) => {
    e.preventDefault();
    let arr = students;
    if (check) {
      if (!tglForPA[index].present && !tglForPA[index].absent) {
        arr[index].attendence_total++;
        arr[index].attendence_till++;
        let tglTemp = tglForPA;
        tglTemp[index].present = true;
        setTglForPA(tglTemp);
        e.target.style.background = "#05f72d";
      } else if (tglForPA[index].present) {
        arr[index].attendence_total--;
        arr[index].attendence_till--;
        let tglTemp = tglForPA;
        tglTemp[index].present = false;
        setTglForPA(tglTemp);
        e.target.style.background = "#c6ccc7";
      } else {
      }
    } else {
      if (!tglForPA[index].present && !tglForPA[index].absent) {
        arr[index].attendence_total++;
        let tglTemp = tglForPA;
        tglTemp[index].absent = true;
        setTglForPA(tglTemp);
        e.target.style.background = "#ff0000";
      } else if (tglForPA[index].absent) {
        arr[index].attendence_total--;
        let tglTemp = tglForPA;
        tglTemp[index].absent = false;
        setTglForPA(tglTemp);
        e.target.style.background = "#c6ccc7";
      } else {
      }
    }
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    setToggleSubmit(true);
    await takeAttend(id, id, students);
    setToggleSubmit(false);
    history.push(`/evaluation/${id}`);
  };
  return (
    <>
      <button className="submit" onClick={(e) => SubmitHandler(e)}>
        {toggleSubmit ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <span className="visually-hidden">SUBMIT</span>
        )}
      </button>

      <div className="paper" style={{ marginTop: "1%" }}>
        <div className="container" style={{ maxHeight: "400px" }}>
          <table className="table">
            <thead>
              <tr className="table-row">
                <th>Sr No.</th>
                <th>Roll No.</th>
                <th>Name</th>
                <th>Absent/Present</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="table-row">
                  <td>{index + 1}</td>
                  <td>{student.roll_no}</td>
                  <td>{student.full_name}</td>
                  <td className="absent-present">
                    <Attend onClick={(e) => clickHandler(e, index, true)}>
                      P
                    </Attend>
                    <Attend onClick={(e) => clickHandler(e, index, false)}>
                      A
                    </Attend>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Attendence;
