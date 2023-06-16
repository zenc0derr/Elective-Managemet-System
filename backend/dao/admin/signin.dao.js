const mongodb = require("mongodb");
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
const dotenv = require("dotenv")
dotenv.config()

const ObjectId = mongodb.ObjectId

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_ADDRESS,
      pass: process.env.MAIL_PASSWORD
    }
  });
  
let admin
let otp
class signinDAO{
    static async injectDB(conn){
        if(admin){
            return
        }

        try {
            admin = await conn.db(process.env.DATABASE_NAME).collection("admin_info")
        } catch (e) {
            console.error(
                `unable to connect with admin_info, ${e}`
            )
        }
    }

    static async SignIn(req){
        try{
            let query
            query = {"admin_id": {$eq: req.body.id}}

            const Admin = await admin.findOne(query)
            
            const isPasswordValid = await bcrypt.compare(req.body.password, Admin.password)

            if(isPasswordValid){
                otp = Math.floor(1000+Math.random()*9000)
                var mailOptions = {
                    from: process.env.MAIL_ADDRESS,
                    to: Admin.email,
                    subject: 'AEMS Login OTP',
                    html: `<p>Hey ${Admin.name}, This is your OTP for AEMS Login:<b>${otp}</b>.</p>`
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(`error, ${error}`);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
                  
            }
            return isPasswordValid
        }catch(e){
            console.error(`dao, ${e}`)
            return false
        }
        
    }

    static async Otp(req){
      try{
        if(req.body.otp == otp){
          return true
        }else{
          return false
        }
      }catch(e){
        console.error(e)
      }
    }
}

module.exports = signinDAO