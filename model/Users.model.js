const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    otp: {
      OTP: {
        type: String,
        default: "1111",
      },
      expiredIn: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

usersSchema.methods.matchPassword = async function (enterPass) {
  return await bcrypt.compare(enterPass, this.password);
};

usersSchema.methods.getAuthToken = async function (data) {
  let params = {
    id: this._id,
    email: this.email,
  };
  let tokenVal = jwt.sign(params, process.env.SECRET_KEY);
  this.tokens = this.tokens.concat({ token: tokenVal });
  await this.save();
  return tokenVal;
};

const User = mongoose.model("User", usersSchema);
module.exports = User;
