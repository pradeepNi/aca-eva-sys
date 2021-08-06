import React, { useEffect, useState, useContext } from "react";
import { getSubjects } from "../Server/api";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import OpenStudentsIcon from "@material-ui/icons/OpenInNew";
import "./Attendence.css";
import Context from "../Store/Context";

const Attend = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  width: 25%;
  margin-left: 15px;
  background: #f50057;
  box-shadow: 2px 6px 10px 4px white;
  &:hover {
    background: #1976d2;
    cursor: pointer;
  }
`;

let email = localStorage.getItem("email");

const Evaluation = () => {
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
    setSubjects(response.data);
  };
  return (
    <div className="paper">
      <div className="container">
        <table className="table">
          <thead>
            <tr className="table-row">
              <th>Sr No.</th>
              <th>Sub-Code</th>
              <th>Sub-Name</th>
              <th>Evaluate</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={index} className="table-row">
                <td>{index + 1}</td>
                <td>{subject.code}</td>
                <td>{subject.name}</td>
                <td>
                  <Attend to={`/evaluation/${subject._id}`}>
                    <OpenStudentsIcon style={{ color: "white" }} />
                  </Attend>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Evaluation;
