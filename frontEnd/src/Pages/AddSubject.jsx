import React from 'react'
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core'
import { useState } from 'react'
import { addSubject } from '../Server/api'
import { useHistory } from 'react-router'
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
let val = localStorage.getItem("email");
const initialValue = {
    code: '',
    name: '',
    email: val
}
const AddSub = () => {
    const [subject, setSubject] = useState(initialValue);
    const { code, name, } = subject;
    const history = useHistory();

    const changeValue = (e) => {
        setSubject({ ...subject, [e.target.name]: e.target.value })
    }

    const addSubjectDB = async() => {
        // console.log(val);
        if(val !== null) {
            if (!name || !code) {
                window.alert("All fields are medotorary");
            } else {
                const response = await addSubject(subject);
                const data = response.data;
                if (data.code === code) {
                    window.alert("alredy exist");
                } else {
                    history.push('./subjects');
                }
            }
        }else {
            window.alert("Sign in is required");
        }
    }
    const classes = useStyle();
    return (
        <>
            <FormGroup className={classes.container}>
                <Typography variant="h5">Add Subject</Typography>
                <FormControl>
                    <InputLabel required='true'>Code</InputLabel>
                    <Input onChange={(e) => changeValue(e)} name='code' value={code} />
                </FormControl>
                <FormControl>
                    <InputLabel required='true'>Subject</InputLabel>
                    <Input onChange={(e) => changeValue(e)} name='name' value={name} />
                </FormControl>


                <Button onClick={addSubjectDB} variant="contained" color="primary" disableElevation>Add Subject</Button>
            </FormGroup>
        </>
    )
}

export default AddSub
