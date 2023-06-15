const mongodb = require("mongodb");
const Nschedule = require('node-schedule');


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

            console.log(elecCateg)

            console.log(start_time, end_time)
            
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
                    console.log(pending_students)
                    for(let student of pending_students){
                        console.log(student.name)
                        for(let proffessional of allocation_details[0].elective_category.proffessionalElectives){
                            for(let course of proffessional){
                                cursor = await courses.find({id: course.id})
                                let x = await cursor.toArray()
                                if(x[0].remaining_seats != 0){

                                    let  flag = true
                                    for(pre in x[0].pre_requisite){
                                        flag == flag && student.courses_enrolled.includes(pre)
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

                                    response = await students.updateOne(
                                        {id: student.id},
                                        {$set: {status: "Enrolled"}}
                                    )

                                    break
                                }
                            }
                        }
                    }
                
                    console.log("Job Done")
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
}


  

module.exports = adminDAO