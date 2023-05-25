const mongodb = require("mongodb");
const bcrypt = require('bcryptjs')
const ObjectId = mongodb.ObjectId

let student

class signinDAO{
    static async injectDB(conn){
        if(student){
            return
        }

        try {
            student = await conn.db(process.env.DATABASE_NAME).collection("student_info")
        } catch (e) {
            console.error(
                `unable to connect with student_info, ${e}`
            )
        }
    }

    static async SignIn(req){
        let query
        query = {"student_id": {$eq: req.body.student_id}}

        const Student = await student.findOne(query)

        //const newPassword = await bcrypt.hash(req.body.password, 10)
        const isPasswordValid = await bcrypt.compare(req.body.password, Student.password)

        return isPasswordValid
    }
}

module.exports = signinDAO