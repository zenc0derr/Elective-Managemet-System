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
        const x = await fetch("https://aems-api.onrender.com/api/courses/category", {method: 'GET'})
        const response = await x.json()
        const courses = response.category
        const EnrollmentList = []

        for(let course of courses){
            let cursor = await students.find({courses_enrolled: course})
            const student = await cursor.toArray()
            let temp = {}
            temp[course] = student.length
            EnrollmentList.push(temp)
        }
            
        
        return EnrollmentList
    }
}

module.exports = studentDAO
