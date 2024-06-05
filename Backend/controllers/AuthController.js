const UserModels = require("../Models/UserModels");
const bcrypt = require("bcryptjs");
const EmailValidation = require("../Utils/EmailValidation");
const NumberValidation = require("../Utils/NumberValidation");
const EmailSend = require("../Utils/EmailSend");
const Token = require("../Utils/Token");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const otpGenerator = require("otp-generator");

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
    bcrypt.hash(password, salt, async function (err, hash) {
      let userData = new UserModels({
        firstName,
        phoneNumber,
        email,
        password: hash,
        verifyToken: token,
      });
      await userData.save();
      const verifyLink = `${process.env.LIVE_SERVER}/api/v1/auth/setPassword/${userData._id}?token=${token}`;
      EmailSend(email, "verify", verifyLink);
    });
  });

  res.json({ succesfully: "user Creat succesfully" });
  console.log("Singup");
}

async function login(req, res) {
  const { email, password } = req.body;
  console.log(email, password);
  if (!EmailValidation(email)) {
    return res.status(404).json({ error: "Authication fail" });
  }
  let userData = await UserModels.findOne({ email: email });
  if (!userData && userData?.email != email) {
    return res.status(404).json({ error: "Authication fail" });
  }
  if (userData?.emailVerify === false) {
    return res.status(400).json({ error: "Please verify email" });
  }
  bcrypt.compare(password, userData.password, function (err, result) {
    if (result) {
      return res.status(200).json({
        Name: userData.firstName,
        email: userData.email,
        PhoneNumber: userData.phoneNumber,
      });
    } else {
      res.status(404).json({ error: "Authication fail" });
    }
  });
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

async function ForgotPassword(req, res) {
  try {
    const { email } = req.body;
    const existingUser = await UserModels.findOne({ email: email });

    if (existingUser.email == email) {
      let token = Token(email, "aklogic", "15m");
      existingUser.verifyToken = token;
      await existingUser.save();
      const resetpassLink = `${process.env.FRONTEND_URL}/reset-password/${existingUser._id}?token=${token}`;
      await EmailSend(email, "forgotPassword", { resetpassLink });
      return res.status(200).json({
        succesfully: "Reset password link has been sent to your email",
      });
    } else {
      return res.status(404).json({ error: "user Not found" });
    }
  } catch (e) {
    res.status(500).json(e);
  }
}

async function SetNewPassowrd(req, res) {
  try {
    const { id } = req.params;
    const { token } = req.query;
    const { password } = req.body;
    console.log(`ID: ${id}, Token: ${token}, Password: ${password}`);

    const user = await UserModels.findById(id);

    if (!user || user.verifyToken !== token) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.verifyToken = ""; // Clear the token after successful password reset
    await user.save();
    res.status(200).json({ succesfully: "Password updated successfully" });
  } catch (e) {
    return res.status(500).json({ errro: "Server Error" });
  }
}
module.exports = { login, singup, EmailVerify, ForgotPassword, SetNewPassowrd };
