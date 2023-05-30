const mongodb = require("mongodb");

let students

class studentDAO{
    static async injectDB(conn){
        if(students){
            return
        }

        try {
            students = await conn.db(process.env.DATABASE_NAME).collection("student_info")
        } catch (e) {
            console.error(
                `unable to connect with course_catalogue, ${e}`
            )
        }
    }

    static async getStudents(req){
        let cursor
        try{
            cursor = students.find()
        }catch(e){
            console.error(`Student Dao, ${e}`)
        }

        try{
            const studentsList = await cursor.toArray()
            return {studentsList}
        }catch(e){
            console.error(
                `Unable to convert cursor to array, ${e}`
            )
            return {studentsList:[]}
        }
    }

    static async getEnrollment(req){
        const x = await fetch("https://aems-api.onrender.com/api/student", {method: 'GET'})
        var y = await x.json()
        console.log(y)
        // const coursesList = courses.find({}, {course_id: 1/true})
        // console.log(coursesList)
        return true
    }
}

module.exports = studentDAO
