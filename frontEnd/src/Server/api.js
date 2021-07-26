import axios from 'axios';

const URL = '';

export const getUser = async (info) => {
    console.log(info);
    return await axios.get(`${URL}/login?email=${info.email}&password=${info.password}`);
}

export const addUser = async (user) => {
    return await axios.post(`${URL}/`, user);
}

//::::::: SUBJECTS :::::::

export const getSubjects = async (email) => {
    return await axios.get(`${URL}/${email}/subs`);
}

export const getSubject = async (id) => {
    return await axios.get(`${URL}/sub/${id}`)
}

export const addSubject = async (subject) => {
    return await axios.post(`${URL}/add-subject`, subject);
}

export const deleteSub = async (id) => {
    await axios.delete(`${URL}/${id}`);
}

export const editSubject = async (id, sub) => {
    return await axios.put(`${URL}/${id}`, sub);
}

export const addStudent = async (id,Student) => {
    return await axios.put(`${URL}/${id}/add-student`, Student);
}

export const addStudents = async (id,Students) => {
    return await axios.put(`${URL}/${id}/add-students`, Students);
}

export const deleteStudent = async (sub_id, stu_id) => {
    return await axios.put(`${URL}/${sub_id}/${stu_id}`);
}

export const editStudent = async (sub_id,stu_id,student) => {
    return await axios.put(`${URL}/${sub_id}/${stu_id}/edit`, student);
}

export const takeAttend = async (sub_id,stu_id, student) => {
    return await axios.put(`${URL}/${sub_id}/${stu_id}/attedance`, student);
}
