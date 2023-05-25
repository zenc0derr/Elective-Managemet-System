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

    static async getCourses(req){
        let cursor
        try{
            cursor = courses.find()
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