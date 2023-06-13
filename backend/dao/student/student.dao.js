const mongodb = require("mongodb");

let courses
let students

class studentDAO{
    static async injectDB2(conn){
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
        
        let cursor
        let category

        try{
            cursor = await courses.find()
        }catch(e){
            console.error(`Error in Getting all courses, ${e}`)
        }

        try{
            const coursesList = await cursor.toArray()
            category = coursesList.map(function (course) {
                return course.course_id;
            });
        }catch(e){
            console.error(
                `Unable to convert cursor to array, ${e}`
            )
        }

        const EnrollmentList = []

        for(let course of category){
            let cursor1 = await students.find({courses_enrolled: course})
            const student = await cursor1.toArray()
            let temp = {}
            temp[course] = student.length
            EnrollmentList.push(temp)
        }
        
        return EnrollmentList
    }

    static async getStudentByCourse(course_id){
        try{
            let cursor1 = await students.find({courses_enrolled: course_id})
            const studentList = await cursor1.toArray()
            return studentList
        }catch(e){
            console.log(`getStudentByCourse Error, ${e}`)
            return {studentsList:[]}
        }
    }
}

module.exports = studentDAO
