const mongodb = require("mongodb");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv")
dotenv.config()

let courses
let students
let allocation

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_ADDRESS,
      pass: process.env.MAIL_PASSWORD
    }
  });

class studentDAO{
    static async injectDBAllocation(conn){
        if(allocation){
            return
        }

        try {
            allocation = await conn.db(process.env.DATABASE_NAME).collection("allocation")
        } catch (e) {
            console.error(
                `unable to connect with course_catalogue, ${e}`
            )
        }
    }

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

    static async getStudentById(student_id){
        try {
            let student = students.findOne({id: student_id})
            return student;
        } catch (e) {
            console.error(`Error: getSpecifiStudents, getting student, ${e}`)
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
            console.error(`getStudentByCourse Error, ${e}`)
            return {studentsList:[]}
        }
    }

    static async postEnrollment({student_id, wish1, wish2}){
        const enroll_courses = wish1.concat(wish2)
        let enrolledList = []
        
        for(let i=0;i<enroll_courses.length;i++){
            let course
            try{
                course =  await courses.findOne({id: enroll_courses[i]})
            }catch(e){
                console.error(`Error getting course Postenrollement, ${e}`)
                return e
            }

            let updatedCourse = {
                remaining_seats: course.remaining_seats - 1
            }

            
            try {
                let response = await courses.updateOne(
                    {id: enroll_courses[i]},
                    {$set: updatedCourse}
                )

            } catch (e) {
                console.error(`Error updating remaining seats Postenrollement, ${e}`)
                return e
            }


            
            try{
                let response = await students.updateOne(
                    {id: student_id},
                    {$push: {courses_enrolled: enroll_courses[i]}}
                )

                enrolledList.push(enroll_courses[i])

                
                response = await students.updateOne(
                    {id: student_id},
                    {$set: {status: "Enrolled"}}
                )

            }catch(e){
                console.error(`Error updating student Postenrollement, ${e}`)
                return e
            }


        }

        try{
            let details = await students.findOne({id: student_id})
            var mailOptions = {
                from: process.env.MAIL_ADDRESS,
                to: details.email,
                subject: 'AEMS Elective Enrollment',
                html: `<p>Hey ${details.name}, Your Elective Enrollment is done.</br> </br>These are the enrolled Electives:</br> ${enrolledList} </br>Visit AEMS for further details`
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(`error, ${error}`);
                } else {
                  console.log('Email sent: ' + info.response);
                }
            });
            
        }catch(e){
            console.error(`Error sending mail, ${e}`)
        }

        

        return true
        
    }
}

module.exports = studentDAO
