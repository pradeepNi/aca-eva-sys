import React from 'react';
import AddSubjectForm from './AddSubjectForm';
import './SubjectsTable.css';
import SubjectTable from './SubjectTable';



function SubjectsPageData() {
    return(
        <div className = "pageData">
           <SubjectTable />
           <AddSubjectForm />
        </div>
    );
}

export default SubjectsPageData;