import Sub from "../model/Subs.model.js";
import User from "../model/Users.model.js"

export const login = async (req, res) => {
    let { email, password } = req.query;
    // console.log(req.query);
    try {
        const user = await User.findOne({ email: email });
        // console.log(user);
        if (user && await user.matchPassword(password)) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email
            })
        } else {
            res.json({ message: "Invalid email or password" });
        }
    } catch (error) {
        response.status(404).json({ message: error.message });
    }
}

export const register = async (req, res) => {
    let { name, email, password } = req.body;
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            res.json({
                email: userExist.email,
                name: userExist.name,
            });
        } else {
            const newUser = new User({ name, email, password });
            await newUser.save();
            res.json({ message: "User added successfully" });
        }
    } catch (error) {
        response.status(404).json({ message: error.message });
    }
}

export const getSubject = async (request, response) => {
    // response.status(200).json("this is check78hhjaj");
    const email = request.params.email;
    try {
        let subject = await Sub.find({ email: email });  //get all user from mongodb
        response.json(subject);   // return newUser
    } catch (error) {
        response.json({ message: error.message });
    }
}

//CREATE
export const addSubject = async (request, response) => {
    const { code, name, email } = request.body; //get user
    try {
        const codeExist = await Sub.findOne({ code: code, email: email });
        if (codeExist) {
            return response.json(codeExist);
        } else {
            const newSub = new Sub({ code, name, email });  // compare with schema
            await newSub.save(); //save newSub in mongodb 
            response.status(201).json({ message: "Subject added successfully" });
        }
    } catch (error) {
        response.status(404).json({ message: error.message });
    }
}

export const getSubById = async (request, response) => {
    try {
        const sub = await Sub.findById(request.params.id);
        response.status(200).json(sub);
    } catch (error) {
        response.status(404).json({ message: error.message })
    }
}


export const editSub = async (request, response) => {
    let sub = await Sub.findById(request.params.id);
    sub = request.body;

    const editSub = new Sub(sub);
    try {
        await Sub.updateOne({ _id: request.params.id }, editSub);
        response.status(201).json(editSub);
    } catch (error) {
        response.status(409).json({ message: error.message });
    }
}

export const deleteSub = async (request, response) => {
    try {
        await Sub.deleteOne({ _id: request.params.id });
        response.status(201).json("User deleted Successfully");
    } catch (error) {
        response.status(409).json({ message: error.message });
    }
}

export const addStudent = async (request, response) => {
    let _Id = request.params.id;
    try {
        await Sub.findByIdAndUpdate(_Id, {
            $addToSet: {
                "students":
                {
                    "roll_no": request.body.roll_no,
                    "full_name": request.body.full_name,
                    "attendence_till": request.body.attendence_till,
                    "attendence_total": request.body.attendence_till,
                    "mid_sem": request.body.mid_sem,
                    "end_sem": request.body.end_sem
                }
            }
        });
        response.status(201).json(request.body);
    } catch (error) {
        response.status(409).json({ message: error.message });
    }
}

export const addStudents = async (request, response) => {
    const _Id = request.params.id;
    const students = request.body;

    for (let i = 0; i < students.length; i++) {
        const roll_no = students[i]['Roll No'];
        const full_name = students[i].Name;
        const attendence_till = 0;
        const attendence_total = 0;
        const mid_sem = "0";
        const end_sem = "0";

        try {
            await Sub.findByIdAndUpdate(_Id, {
                $addToSet: {
                    "students":
                    {
                        "roll_no": roll_no,
                        "full_name": full_name,
                        "attendence_till": attendence_till,
                        "attendence_total": attendence_total,
                        "mid_sem": mid_sem,
                        "end_sem": end_sem
                    }
                }
            });
        } catch (error) {
            response.status(409).json({ message: error.message });
        }
    }
    response.status(201).json("Students added successfully");
}



export const deleteStu = async (request, response) => {
    let sub_id = request.params.sub_id;
    try {
        await Sub.findByIdAndUpdate(sub_id, { $pull: { 'students': { _id: request.params.stu_id } } });
        response.status(201).json("Student deleted successfully");
    } catch (error) {
        response.status(409).json({ message: error.message });
    }
}


export const editStu = async (req, res) => {
    let stu_id = req.params.stu_id;
    const roll_no = req.body.roll_no;
    const full_name = req.body.full_name;
    try {

        await Sub.updateOne({ 'students._id': stu_id },
            {
                $set: {
                    'students.$.roll_no': roll_no,
                    'students.$.full_name': full_name,

                },
            })
        res.json("Student added successfully");
    } catch (error) {
        res.status(409).json({ message: error.message });
        console.log(error);
    }
}

export const takeAttendance = async (req, res) => {

    const students = req.body;
    for (let i = 0; i < students.length; i++) {
        let stu_id = students[i]._id;
        const attendence_till = students[i].attendence_till;
        const attendence_total = students[i].attendence_total;
        // console.log(stu_id);
        // console.log(students[i]);
        // res.json(req.body);
        try {

            await Sub.updateOne({ 'students._id': stu_id },
                {
                    '$set': {
                        'students.$.attendence_till': attendence_till,
                        'students.$.attendence_total': attendence_total,
                    },
                    $push: {
                        'students.$.attendence': {
                            'year': "2021",
                            'month': "7",
                            'date': "22",
                            'time': "11:20",
                            'isPresent': true,
                        }
                    }
                })
        } catch (error) {
            res.status(409).json({ message: error.message });
            console.log(error);
        }
    }
    res.json("Student added successfully");

}
