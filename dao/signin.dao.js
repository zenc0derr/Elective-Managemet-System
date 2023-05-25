const mongodb = require("mongodb");
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
        
        let query
        query = {$and:[
            {"admin_id": {$eq: req.body.admin_id}},
            {"password": {$eq: req.body.password}}
        ]}

        const Admin = await admin.findOne(query)

        console.log(Admin)

        return Admin
    }
}

module.exports = signinDAO