const mongodb = require("mongodb");

let courses
let allocation

class coursesDAO{
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

    static async studentGetElective(req){
        let cursor
        let allocation_details
        try{
            cursor = await allocation.find({allocation_id: 1})
            allocation_details = await cursor.toArray()
        }catch(e){
            console.error(`Error in Getting all courses, ${e}`)
        }

        try{
            const start_time = new Date(allocation_details[0].start_time)
            const end_time = new Date(allocation_details[0].end_time)
            const cur_time = new Date()
            

            if(cur_time<start_time || cur_time>end_time){
                return {}
            }


            return allocation_details[0].elective_category
        }catch(e){
            console.error(`Error in returning courses, ${e}`)
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
        let x
        let y
        try{
            x = await courses.find({id: courseDetails.id})
            y = await x.toArray()
        }catch(e){
            console.error(`Unable to find course: ${e}`)
        }
        if(y.length == 0){
            try{
                return await courses.insertOne(courseDetails)
            }catch(e){
                console.error(`Unable to post review: ${e}`)
                return { error: e }
            }
        }else{
            try{
                return await courses.updateOne(
                    {id: courseDetails.id},
                    {$set: courseDetails}
        
                )
            }catch(e){
                console.error(`Unable to update review: ${e}`)
                return { error: e }
            } 
        }
        
        

    }

    static async updateElective(courseDetails){
        try{
            return await courses.updateOne(
                {id: courseDetails.course_id},
                {$set: courseDetails}
    
            )
            return true;
        }catch(e){
            console.error(`Unable to update review: ${e}`)
            return { error: e }
        }
        

    }
    
    static async getCategory(){

        let cursor
        try{
            cursor = await courses.find()
        }catch(e){
            console.error(`Error in Getting all courses, ${e}`)
        }

        try{
            const coursesList = await cursor.toArray()
            const category = coursesList.map(function (course) {
                return course.id;
            });
            
              
            return {category}
        }catch(e){
            console.error(
                `Unable to convert cursor to array, ${e}`
            )
            return {category:[]}
        }
    }
}

module.exports = coursesDAO