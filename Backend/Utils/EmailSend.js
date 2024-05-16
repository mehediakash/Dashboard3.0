const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: "jexpert82@gmail.com",
    pass: "fbkkrpstkntqshqh",
  },
});
async function EmailSend(email, verifyLink) {
  const templatePath = path.join(
    __dirname,
    "../EmailTemplete/SingupVerify",
    "index.html"
  );
  console.log(templatePath);
  let htmlTemplate = fs.readFileSync(templatePath, "utf-8");

  // Replace placeholders with actual values
  htmlTemplate = htmlTemplate.replace("{{VERIFY_LINK}}", verifyLink);

  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: htmlTemplate, // html body
  });
}

module.exports = EmailSend;
