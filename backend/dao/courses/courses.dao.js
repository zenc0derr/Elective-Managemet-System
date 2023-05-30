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

    static async getElective(req){
        let cursor
        try{
            cursor = await courses.find()
        }catch(e){
            console.error(`Error in Getting all courses, ${e}`)
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

    static async getProfessionalElective(req){
        let cursor
        try{
            let query = {"type":{$eq: "Professional"}}
            cursor = await courses.find(query)
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
            cursor = await courses.find(query)
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

    static async PostElective(courseDetails){
        try{
            console.log(courseDetails)
            return await courses.insertOne(courseDetails)
        }catch(e){
            console.error(`Unable to post review: ${e}`)
            return { error: e }
        }
        

    }

    static async updateElective(courseDetails){
        try{
            return await courses.updateOne(
                {course_id: courseDetails.course_id},
                {$set: courseDetails}
    
            )
            return true;
        }catch(e){
            console.error(`Unable to update review: ${e}`)
            return { error: e }
        }
        

    }
}

module.exports = coursesDAO