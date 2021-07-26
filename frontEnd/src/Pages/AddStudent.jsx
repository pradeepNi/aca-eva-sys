import React from 'react'
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core'
import { useState } from 'react'
import { addStudent } from '../Server/api'
import { useHistory } from 'react-router'
import { useParams } from 'react-router-dom'
const useStyle = makeStyles({
    container: {
        width: '50%',
        margin: '5% 0 0 25%',
        '& > *': {
            marginTop: '20px'
        }

    },
    button: {
        width: '110px',
    }
})

const initialValue = {
    roll_no: '',
    full_name: '',
    attendence_till: 0,
    attendence_total: 0,
    end_sem: '0',
    mid_sem: '0'
}

const AddStudent = () => {
    const [student, setStudent] = useState(initialValue);
    const { roll_no, full_name, } = student;
    const { id } = useParams();
    const history = useHistory();

    const changeValue = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value })
    }

    const addStudentDB = async () => {
        await addStudent(id, student);
        history.push('./students');
    }
    const classes = useStyle();
    return (
        <>
            <FormGroup className={classes.container}>
                <Typography variant="h5">Add Student</Typography>
                <FormControl>
                    <InputLabel required={true}>Ad. No.</InputLabel>
                    <Input onChange={(e) => changeValue(e)} name='roll_no' value={roll_no} />
                </FormControl>
                <FormControl>
                    <InputLabel required={true}>Student Name</InputLabel>
                    <Input onChange={(e) => changeValue(e)} name='full_name' value={full_name} />
                </FormControl>


                <Button onClick={addStudentDB} variant="contained" color="primary" disableElevation>Add Student</Button>
            </FormGroup>
        </>
    )
}

export default AddStudent
