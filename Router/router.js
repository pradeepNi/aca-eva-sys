const express = require("express");
const passport = require("passport");
const {
  getSubject,
  addSubject,
  getSubById,
  editSub,
  deleteSub,
  addStudent,
  deleteStu,
  editStu,
  takeAttendance,
  register,
  login,
  getUser,
  addStudents,
  sendEmail,
  checkOTP,
  resetPassword,
} = require("../Controller/user-control.js");

const router = express.Router();

/* ========= User Router=============== */
require("../Config/passport.js")(passport);

router.get("/user", passport.authenticate("jwt", { session: false }), getUser);
router.post("/register", register);
router.get("/login", login);
router.put("/send-email", sendEmail);
router.get("/check-otp", checkOTP);
router.put("/reset-password", resetPassword);

/* ========= User Router=============== */

router.get("/:email/subs", getSubject);
router.post("/add-subject", addSubject);
router.get("/sub/:id", getSubById);
router.put("/:id", editSub);
router.delete("/:id", deleteSub);
router.put("/:id/add-student", addStudent);
router.put("/:id/add-students", addStudents);
router.put("/:sub_id/:stu_id", deleteStu);
router.put("/:sub_id/:stu_id/edit", editStu);
router.put("/:sub_id/:stu_id/attedance", takeAttendance);

module.exports = router;
