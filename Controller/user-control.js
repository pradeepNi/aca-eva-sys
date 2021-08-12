const Sub = require("../model/Subs.model.js");
const User = require("../model/Users.model.js");
const transporter = require("../Config/sendEmailer");
const bcrypt = require("bcryptjs");

exports.getUser = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    // console.log(error);
    res.status(404).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  let { email, password } = req.query;
  try {
    let user = await User.findOne({ email: email }, { __v: 0 });
    if (user) {
      if (await user.matchPassword(password)) {
        let myToken = await user.getAuthToken();
        res.status(201).json({
          msg: "Login successful",
          token: myToken,
        });
      } else {
        res.status(203).json({
          msg: "Incorrect password",
        });
      }
    } else {
      res.status(203).json({
        msg: "Invalid email",
      });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.register = async (req, res) => {
  let { name, email, password } = req.body;
  try {
    let emailExist = await User.findOne({ email });
    if (emailExist) {
      res.status(202).json({
        msg: "email is taken",
      });
    } else {
      let newUser = User({ name, email, password });
      await newUser.save();
      res.status(200).json({
        msg: "registeration successful",
      });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.sendEmail = async (req, res) => {
  let { email } = req.query;
  let msg = "Check your mail otp is sent, Also check spam box";
  try {
    const data = await User.findOne({ email: email });

    if (data) {
      let genOtp = Math.floor(Math.random() * 1000000 + 1);
      let otp = {
        OTP: genOtp,
        expiredIn: new Date().getTime() + 300 * 1000,
      };
      let mailOptions = {
        from: "aca.eva.sys@gmail.com",
        to: `${email}`,
        subject: "OTP to recover password",
        text: `To reset password OTP is ${genOtp}`,
      };

      await transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
          msg = "Somthing went wrong";
        } else {
          console.log("Email sent" + info.response);
        }
      });
      await User.findByIdAndUpdate(data._id, {
        otp: otp,
      });
      res.status(200).json({
        msg: msg,
      });
    } else {
      res.status(203).json({
        msg: "Invalid Email",
      });
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.checkOTP = async (req, res) => {
  let { email, otp } = req.query;

  try {
    let data = await User.findOne({ email: email });
    if (data.otp.OTP === otp) {
      res.status(200).json({
        msg: "Valid OTP",
      });
    } else {
      res.status(203).json({
        msg: "Invalid OTP",
      });
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  let { email, otp, password } = req.body;
  try {
    let data = await User.findOne({ email: email });
    const { OTP, expiredIn } = data.otp;
    if (data) {
      if (OTP === otp) {
        const currTime = new Date().getTime();
        const diff = expiredIn - currTime;
        if (diff > 0) {
          const salt = await bcrypt.genSalt(10);
          password = await bcrypt.hash(password, salt);

          await User.findByIdAndUpdate(data._id, {
            password: password,
          });
          res.status(200).json({
            msg: "password reset successfully",
          });
        } else {
          res.status(203).json({
            msg: "Token is Expired",
          });
        }
      } else {
        res.status(203).json({
          msg: "Invalid OTP",
        });
      }
    } else {
      res.status(203).json({
        msg: "Invalid Email",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

/** ====================subjects controllers==================== */
exports.getSubject = async (request, response) => {
  // response.status(200).json("this is check78hhjaj");
  const email = request.params.email;
  try {
    let subject = await Sub.find({ email: email }); //get all user from mongodb
    response.json(subject); // return newUser
  } catch (error) {
    response.json({ message: error.message });
  }
};

//CREATE
exports.addSubject = async (request, response) => {
  const { code, name, email } = request.body; //get user
  try {
    const codeExist = await Sub.findOne({ code: code, email: email });
    if (codeExist) {
      return response.json(codeExist);
    } else {
      const newSub = new Sub({ code, name, email }); // compare with schema
      await newSub.save(); //save newSub in mongodb
      response.status(201).json({ message: "Subject added successfully" });
    }
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

exports.getSubById = async (request, response) => {
  try {
    const sub = await Sub.findById(request.params.id);
    response.status(200).json(sub);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

exports.editSub = async (request, response) => {
  let sub = await Sub.findById(request.params.id);
  sub = request.body;

  const editSub = new Sub(sub);
  try {
    await Sub.updateOne({ _id: request.params.id }, editSub);
    response.status(201).json(editSub);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

exports.deleteSub = async (request, response) => {
  try {
    await Sub.deleteOne({ _id: request.params.id });
    response.status(201).json("User deleted Successfully");
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

exports.addStudent = async (request, response) => {
  let _Id = request.params.id;
  try {
    await Sub.findByIdAndUpdate(_Id, {
      $addToSet: {
        students: {
          roll_no: request.body.roll_no,
          full_name: request.body.full_name,
          attendence_till: request.body.attendence_till,
          attendence_total: request.body.attendence_till,
          mid_sem: request.body.mid_sem,
          end_sem: request.body.end_sem,
        },
      },
    });
    response.status(201).json(request.body);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

exports.addStudents = async (request, response) => {
  const _Id = request.params.id;
  const students = request.body;

  for (let i = 0; i < students.length; i++) {
    const roll_no = students[i]["Roll No"];
    const full_name = students[i].Name;
    const attendence_till = 0;
    const attendence_total = 0;
    const mid_sem = "0";
    const end_sem = "0";

    try {
      await Sub.findByIdAndUpdate(_Id, {
        $addToSet: {
          students: {
            roll_no: roll_no,
            full_name: full_name,
            attendence_till: attendence_till,
            attendence_total: attendence_total,
            mid_sem: mid_sem,
            end_sem: end_sem,
          },
        },
      });
    } catch (error) {
      response.status(409).json({ message: error.message });
    }
  }
  response.status(201).json("Students added successfully");
};

exports.deleteStu = async (request, response) => {
  let sub_id = request.params.sub_id;
  try {
    await Sub.findByIdAndUpdate(sub_id, {
      $pull: { students: { _id: request.params.stu_id } },
    });
    response.status(201).json("Student deleted successfully");
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

exports.editStu = async (req, res) => {
  let stu_id = req.params.stu_id;
  const roll_no = req.body.roll_no;
  const full_name = req.body.full_name;
  try {
    await Sub.updateOne(
      { "students._id": stu_id },
      {
        $set: {
          "students.$.roll_no": roll_no,
          "students.$.full_name": full_name,
        },
      }
    );
    res.json("Student added successfully");
  } catch (error) {
    res.status(409).json({ message: error.message });
    console.log(error);
  }
};

exports.takeAttendance = async (req, res) => {
  const students = req.body;
  for (let i = 0; i < students.length; i++) {
    let stu_id = students[i]._id;
    const attendence_till = students[i].attendence_till;
    const attendence_total = students[i].attendence_total;
    // console.log(stu_id);
    // console.log(students[i]);
    // res.json(req.body);
    try {
      await Sub.updateOne(
        { "students._id": stu_id },
        {
          $set: {
            "students.$.attendence_till": attendence_till,
            "students.$.attendence_total": attendence_total,
          },
          $push: {
            "students.$.attendence": {
              year: "2021",
              month: "7",
              date: "22",
              time: "11:20",
              isPresent: true,
            },
          },
        }
      );
    } catch (error) {
      res.status(409).json({ message: error.message });
      console.log(error);
    }
  }
  res.json("Student added successfully");
};
