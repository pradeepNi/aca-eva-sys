import React from 'react'
import SubjectData from './SubjectData';
import './SubjectsTable.css';

function SubjectTable() {
    return (
        <table className="subjectTable">
            <thead>
                <tr>
                    <th>Open</th>
                    <th>Code</th>
                    <th>Subject</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {SubjectData.map((val, index) => {
                    return (
                        <tr>
                            <td>{val.goto}</td>
                            <td>{val.code}</td>
                            <td>{val.name}</td>
                            <td className="addDel">{val.Action}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}

export default SubjectTable
