const mongodb = require("mongodb");
const Nschedule = require('node-schedule');
const nodemailer = require("nodemailer");
const dotenv = require("dotenv")
dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_ADDRESS,
      pass: process.env.MAIL_PASSWORD
    }
  });

let allocation
let students
let courses


class adminDAO{

    static async injectDBCourses(conn){
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

    static async injectDBStudent(conn){
        if(students){
            return
        }

        try {
            students = await conn.db(process.env.DATABASE_NAME).collection("student_info")
        } catch (e) {
            console.error(
                `unable to connect with student_info, ${e}`
            )
        } 
    }

    static async injectDB(conn){
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

    static async setSchedule({start_time, end_time, elecCateg}){
        try{
            
            const schedule = {allocation_id: 1, start_time: start_time, end_time: end_time, elective_category: elecCateg}

            const res = await allocation.updateOne(
                {allocation_id: 1},
                {$set: schedule})
            
            const job = Nschedule.scheduleJob(end_time, async function(){
                let cursor
                let pending_students
                let allocation_details
                try{
                    cursor = await students.find({status: "Pending"})
                    pending_students = await cursor.toArray()
                    cursor = await allocation.find({allocation_id: 1})
                    allocation_details = await cursor.toArray()

                }catch(e){
                    console.error(`Auto Schedule Error, ${e}`)
                }

                try {
                    for(let student of pending_students){
                        let enrolledList = []
                        for(let proffessional of allocation_details[0].elective_category.proffessionalElectives){
                            for(let course of proffessional){
                                cursor = await courses.find({id: course.id})
                                let x = await cursor.toArray()
                                if(x[0].remaining_seats != 0){

                                    let  flag = true
                                    for(let pre of x[0].pre_requisite){
                                        flag = flag && student.courses_enrolled.includes(pre)
                                    }

                                    if(flag == false)
                                        continue
                                    
                                    let updatedCourse = {
                                        remaining_seats: x[0].remaining_seats - 1
                                    }

                                    let response = await courses.updateOne(
                                        {id: course.id},
                                        {$set: updatedCourse}
                                    )

                                    response = await students.updateOne(
                                        {id: student.id},
                                        {$push: {courses_enrolled: course.id}}
                                    )

                                    enrolledList.push(course.id)

                                    response = await students.updateOne(
                                        {id: student.id},
                                        {$set: {status: "Enrolled"}}
                                    )

                                    break
                                }
                            }
                        }

                        for(let free of allocation_details[0].elective_category.freeElectives){
                            for(let course of free){
                                cursor = await courses.find({id: course.id})
                                let x = await cursor.toArray()
                                if(x[0].remaining_seats != 0){

                                    let  flag = true
                                    for(let pre of x[0].pre_requisite){
                                        flag = flag && student.courses_enrolled.includes(pre)
                                    }

                                    if(flag == false)
                                        continue
                                    
                                    let updatedCourse = {
                                        remaining_seats: x[0].remaining_seats - 1
                                    }

                                    let response = await courses.updateOne(
                                        {id: course.id},
                                        {$set: updatedCourse}
                                    )

                                    response = await students.updateOne(
                                        {id: student.id},
                                        {$push: {courses_enrolled: course.id}}
                                    )

                                    enrolledList.push(course.id)

                                    response = await students.updateOne(
                                        {id: student.id},
                                        {$set: {status: "Enrolled"}}
                                    )

                                    break
                                }
                            }
                        }

                        var mailOptions = {
                            from: process.env.MAIL_ADDRESS,
                            to: student.email,
                            subject: 'AEMS Elective Enrollment',
                            html: `<p>Hey ${student.name}, Seems You haven't Regesistered yourself for the Electives. So have automatically alloted courses for you.</br></br>These are the enrolled Electives:</br>${enrolledList}</br>Visit AEMS for further details`
                        };

                        transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                              console.log(`error, ${error}`);
                            } else {
                              console.log('Email sent: ' + info.response);
                            }
                        });
                    }                
                } catch (e) {
                    console.error(`Auto Schedule Error 2, ${e}`)
                }

            });
            
            return res
        }catch(e){
            console.error(`Unable to setSchedule: ${e}`)
            return { error: e }
        }
    }

    static async getSchedule(){
        try {
            let result = await allocation.findOne({allocation_id: 1})
            return result
        } catch (e) {
            console.error(`Get Scheuler Error, ${e}`)
        }
    }
}


  

module.exports = adminDAO