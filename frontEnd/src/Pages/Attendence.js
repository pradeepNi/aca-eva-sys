import React from 'react'
import { useEffect, useState } from 'react'
import { getSubjects } from '../Server/api'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import OpenStudentsIcon from '@material-ui/icons/OpenInNew';
import './Attendence.css';


const Attend = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  width: 25%;
  margin-left: 15px;
  background: #F50057;
  box-shadow: 2px 6px 10px 4px white;
  &:hover{
    background: #1976D2;
    cursor: pointer;
  }
`; 

let email = localStorage.getItem("email");

const Attendence = () => {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        getAllSubjects();
    },[])

    const getAllSubjects = async () => {
        const response = await getSubjects(email);
        setSubjects(response.data);
    }
    return (
        <div className='paper'>
            <div className='container'>
                <table className="table">
                    <thead>
                        <tr className="table-row">
                            <th>Sr No.</th>
                            <th>Sub-Code</th>
                            <th>Sub-Name</th>
                            <th>Attendence</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((subject, index) => (
                            <tr key={index} className="table-row">
                                <td>{index + 1}</td>
                                <td>{subject.code}</td>
                                <td>{subject.name}</td>
                                <td><Attend to={`/attendence/${subject._id}`}><OpenStudentsIcon style = {{color: 'white'}} /></Attend></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Attendence
