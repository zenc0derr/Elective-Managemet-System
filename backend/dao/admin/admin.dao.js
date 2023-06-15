const mongodb = require("mongodb");
const schedule = require('node-schedule');


let allocation

let autoScheduleTime

class adminDAO{
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

            console.log(start_time, end_time)
            
            const schedule = {allocation_id: 1, start_time: start_time, end_time: end_time, elective_category: elecCateg}

            const res = await allocation.updateOne(
                {allocation_id: 1},
                {$set: schedule})
            
            autoScheduleTime = end_time
            return res
        }catch(e){
            console.error(`Unable to setSchedule: ${e}`)
            return { error: e }
        }
    }
}

const job = schedule.scheduleJob(autoScheduleTime, function(){
    console.log('The world is going to end today.');
});
  
module.exports = adminDAO