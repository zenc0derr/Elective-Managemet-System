const mongodb = require("mongodb");
const dayjs = require("dayjs")

let allocation

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
            const sTime = start_time.format()
            const eTime = end_time.format()
            
            const schedule = {allocation_id: 1, start_time: sTime, end_time: eTime, elective_category: elecCateg}

            const res = await allocation.updateOne(
                {allocation_id: 1},
                {$set: schedule})

            return res
        }catch(e){
            console.error(`Unable to setSchedule: ${e}`)
            return { error: e }
        }
    }
}

module.exports = adminDAO