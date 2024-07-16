var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "esadimasadityaa@gmail.com",
    pass: "caqr opuq kihc tsrx",
  },
});

var mailOptions = {
  from: "esadimasadityaa@gmail.com",
  to: "dimsadiitya@gmail.com",
  subject: "Sending Email using Node.js",
  text: "hello world!",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
