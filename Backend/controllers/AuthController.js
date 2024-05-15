const UserModels = require("../Models/UserModels");
const bcrypt = require("bcryptjs");
const EmailValidation = require("../Utils/EmailValidation");
const NumberValidation = require("../Utils/NumberValidation");
const EmailSend = require("../Utils/EmailSend");

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

  bcrypt.genSalt(10, async function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      let userData = new UserModels({
        firstName,
        phoneNumber,
        email,
        password: hash,
      });
      userData.save();
      EmailSend(email);
    });
  });

  res.json({ succesfully: "user Creat succesfully" });
  console.log("Singup");
}

function login(req, res) {
  console.log("Login");
}

module.exports = { login, singup };
