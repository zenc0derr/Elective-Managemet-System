const mongodb = require("mongodb");

let courses

class coursesDAO{
    static async injectDB(conn){
        if(courses){
            return
        }

        try {
            courses = await conn.db(process.env.DATABASE_NAME).collection("course_catalogue")
        } catch (e) {
            console.error(
                `unable to connect with course_catalogue, ${e}`
            )
        }
    }

    static async getProfessionalElective(req){
        let cursor
        try{
            let query = {"type":{$eq: "Professional"}}
            cursor = courses.find(query)
        }catch{
            console.error(`error in finding courses, ${e}`)
            return {coursesList:[]}
        }

        try{
            const coursesList = await cursor.toArray()
            return {coursesList}
        }catch(e){
            console.error(
                `Unable to convert cursor to array, ${e}`
            )
            return {coursesList:[]}
        }

    }

    static async getFreeElective(req){
        let cursor
        try{
            let query = {"type":{$eq: "Free"}}
            cursor = courses.find(query)
        }catch{
            console.error(`error in finding courses, ${e}`)
            return {coursesList:[]}
        }

        try{
            const coursesList = await cursor.toArray()
            return {coursesList}
        }catch(e){
            console.error(
                `Unable to convert cursor to array, ${e}`
            )
            return {coursesList:[]}
        }

    }
}

module.exports = coursesDAO