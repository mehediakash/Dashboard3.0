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
async function EmailSend(email, templateType, dynamicData) {
  let templatePath;

  switch (templateType) {
    case "verify":
      templatePath = path.join(
        __dirname,
        "../EmailTemplete/SingupVerify",
        "index.html"
      );
      break;
    case "forgotPassword":
      templatePath = path.join(
        __dirname,
        "../EmailTemplete/ForgotPassword",
        "index.html"
      );
      break;
    default:
      throw new Error("Invalid template type");
  }

  let htmlTemplate = fs.readFileSync(templatePath, "utf-8");

  // Replace placeholders with actual values
  for (const [key, value] of Object.entries(dynamicData)) {
    const placeholder = `{{${key}}}`;
    htmlTemplate = htmlTemplate.replace(new RegExp(placeholder, "g"), value);
  }

  const info = await transporter.sendMail({
    from: "LogicGrid Soft by Ecommerce <LogicGrid Soft@gmail.com>", // sender address
    to: email, // list of receivers
    subject:
      templateType === "verify"
        ? "Verify Your Email Address"
        : "Reset Your Password", // Subject line
    html: htmlTemplate, // html body
  });
}

module.exports = EmailSend;
