import React from 'react'
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core'
import { useState, useEffect } from 'react'
import { editSubject, getSubject } from '../Server/api'
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
    code: '',
    name: ''    
}
const EditSubject = () => {
    const [sub, setSub] = useState(initialValue);
    const { code, name } = sub;
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        loadSubData();
    },[]);

    const loadSubData = async () => {
        const response = await getSubject(id);
        setSub(response.data);
    }

    const changeValue = (e) => {
        setSub({ ...sub, [e.target.name]: e.target.value })
    }

    const editSubDb = async () => {
        await editSubject(id, sub);
        history.push('../../subjects');

    }
    const classes = useStyle();
    return (
        <>
            <FormGroup className={classes.container}>
                <Typography variant="h5">Edit Subject</Typography>
                <FormControl>
                    <InputLabel>Code</InputLabel>
                    <Input onChange={(e) => changeValue(e)} name='code' value={code} />
                </FormControl>
                <FormControl>
                    <InputLabel>Name</InputLabel>
                    <Input onChange={(e) => changeValue(e)} name='name' value={name} />
                </FormControl>
                <Button onClick={editSubDb} className={classes.button} variant="contained" color="primary" disableElevation>Confirm</Button>
            </FormGroup>
        </>
    )
}

export default EditSubject
