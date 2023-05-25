const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: 'zenira.yt@gmail.com',
        pass: '30XuaLo4y^9MQQzsH^0OI@7xl', 
    },
});    

var mailOptions = {
  from: 'zenira.yt@gmail.com',
  to: 'cb.en.u4cse20355@cb.students.amrita.edu',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(`safasdf, ${error}`);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
