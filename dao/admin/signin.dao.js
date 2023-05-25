const mongodb = require("mongodb");
const bcrypt = require('bcryptjs');
const ObjectId = mongodb.ObjectId

let admin

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
            query = {"admin_id": {$eq: req.body.admin_id}}

            const Admin = await admin.findOne(query)
            
            const isPasswordValid = await bcrypt.compare(req.body.password, Admin.password)
            
            return isPasswordValid
        }catch(e){
            console.log(`dao, ${e}`)
            return false
        }
        
    }
}

module.exports = signinDAO