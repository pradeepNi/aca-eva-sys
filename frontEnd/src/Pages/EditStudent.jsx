import React from 'react'
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core'
import { useState, useEffect } from 'react'
import { editStudent, getSubject } from '../Server/api'
import { useHistory, useParams } from 'react-router-dom'
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
    full_name: ''    
}
const EditStudent = () => {
    const [student, setStudent] = useState(initialValue);
    const { roll_no, full_name } = student;
    const { id , stu_id} = useParams();
    const history = useHistory();

    useEffect(() => {
        loadStuData();
    },[]);

    const loadStuData = async () => {
        const response = await getSubject(id);
        setStudent(response.data.students.find(({ _id }) => _id === stu_id));
    }

    const changeValue = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value })
    }

    const Handeler = async () => {
        await editStudent(id,stu_id, student);
        history.push(`/subjects/${id}/students`);
    }
    const classes = useStyle();
    return (
        <>
            <FormGroup className={classes.container}>
                <Typography variant="h5">Edit Student</Typography>
                <FormControl>
                    <InputLabel>Roll No</InputLabel>
                    <Input onChange={(e) => changeValue(e)} name='roll_no' value={roll_no} />
                </FormControl>
                <FormControl>
                    <InputLabel>Name</InputLabel>
                    <Input onChange={(e) => changeValue(e)} name='full_name' value={full_name} />
                </FormControl>
                <Button onClick={Handeler} className={classes.button} variant="contained" color="primary" disableElevation>Confirm</Button>
            </FormGroup>
        </>
    )
}

export default EditStudent
