const UserModels = require("../Models/UserModels");
const bcrypt = require("bcryptjs");
const EmailValidation = require("../Utils/EmailValidation");
const NumberValidation = require("../Utils/NumberValidation");
const EmailSend = require("../Utils/EmailSend");
const Token = require("../Utils/Token");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

async function singup(req, res) {
  const { firstName, phoneNumber, email, password } = req.body;

  if (!EmailValidation(email)) {
    return res.status(404).json({ error: "please input valid Email" });
  }

  if (!NumberValidation(phoneNumber)) {
    return res.status(404).json({ error: "please input Valid Number" });
  }

  let existingUser = await UserModels.findOne({ email: email });
  if (existingUser?.email == email) {
    return res.status(404).json({ error: "Already This Email existing" });
  }
  let token = Token(email, "aklogic", "1h");
  console.log(token);
  bcrypt.genSalt(10, async function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      let userData = new UserModels({
        firstName,
        phoneNumber,
        email,
        password: hash,
        verifyToken: token,
      });
      userData.save();
      const verifyLink = `${process.env.LIVE_SERVER}/api/v1/auth/emailVerify/${userData._id}?token=${token}`;
      EmailSend(email, verifyLink);
    });
  });

  res.json({ succesfully: "user Creat succesfully" });
  console.log("Singup");
}

function login(req, res) {
  console.log("Login");
}

async function EmailVerify(req, res) {
  try {
    const { id } = req.params;
    const { token } = req.query;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid user" });
    }
    const user = await UserModels.findOne({ _id: req.params.id });
    console.log(user);
    if (!user) {
      return res
        .status(404)
        .json({ error: "Invalid Link please singup again" });
    }
    if (!user.verifyToken && user.emailVerify) {
      res
        .status(404)
        .json({ error: "Already your mail is verify please login" });
    }

    user.emailVerify = true;
    user.verifyToken = "";
    await user.save();

    const filePath = path.join(
      __dirname,
      "../EmailTemplete/Verifysucess",
      "verified.html"
    );
    return res.sendFile(filePath);
  } catch (e) {
    console.log(e);
  }
}
module.exports = { login, singup, EmailVerify };
