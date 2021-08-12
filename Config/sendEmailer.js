let nodeMailer = require("nodemailer");

let transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: "aca.eva.sys@gmail.com",
    pass: process.env.PASS,
  },
});

module.exports = transporter;
