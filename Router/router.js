import express from 'express'
import {
    getSubject, addSubject, getSubById, editSub, deleteSub, addStudent, deleteStu,
    editStu, takeAttendance, register, login, addStudents

} from '../Controller/user-control.js';

const router = express.Router();

router.post('/', register);
router.get('/login', login);
router.get('/:email/subs', getSubject);
router.post('/add-subject', addSubject);
router.get('/sub/:id', getSubById);
router.put('/:id', editSub);
router.delete('/:id', deleteSub);
router.put('/:id/add-student', addStudent);
router.put('/:id/add-students', addStudents);
router.put('/:sub_id/:stu_id', deleteStu);
router.put('/:sub_id/:stu_id/edit', editStu);
router.put('/:sub_id/:stu_id/attedance',takeAttendance);


export default router;

