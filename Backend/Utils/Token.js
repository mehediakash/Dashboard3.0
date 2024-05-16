const jwt = require("jsonwebtoken");

function Token(email, scret, time) {
  return jwt.sign(
    {
      email: email,
    },
    scret,
    { expiresIn: time }
  );
}

module.exports = Token;
