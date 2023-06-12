const mongodb = require("mongodb");
const bcrypt = require('bcryptjs')

let faculty

class signinDAO{
    static async injectDB(conn){
        if(faculty){
            return
        }

        try {
            faculty = await conn.db(process.env.DATABASE_NAME).collection("faculty_info")
        } catch (e) {
            console.error(
                `unable to connect with faculty_info, ${e}`
            )
        }
    }

    static async SignIn(req){
        try{
            let query
            query = {"id": {$eq: req.body.id}}
            console.log(query)
            const Faculty = await faculty.findOne(query)

            //const newPassword = await bcrypt.hash(req.body.password, 10)
            console.log(req.body)
            const isPasswordValid = await bcrypt.compare(req.body.password, Faculty.password)

            return isPasswordValid
        }catch(e){
            console.error(`faculty sign in dao, ${e}`)
        }
        
    }
}

module.exports = signinDAO