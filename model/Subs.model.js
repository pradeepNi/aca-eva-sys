const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const subSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  name: reqString,
  email: reqString,
  students: [
    {
      roll_no: String,
      full_name: String,
      attendence_till: Number,
      attendence_total: Number,
      mid_sem: String,
      end_sem: String,
      attendence: [
        {
          year: String,
          month: String,
          date: String,
          time: String,
          isPresent: Boolean,
        },
      ],
    },
  ],
});

const sub = mongoose.model("sub", subSchema);
module.exports = sub;
